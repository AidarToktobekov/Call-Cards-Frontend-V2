import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Button, ButtonGroup, Divider, Grid, Typography} from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import GroupIcon from '@mui/icons-material/Group';
import HelpIcon from '@mui/icons-material/Help';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RepeatIcon from '@mui/icons-material/Repeat';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAppDispatch, useAppSelector} from '../../app/hooks.js';
import './sidebar.css';
import Modal from "../Modal/Modal.jsx";
import MoodBadIcon from '@mui/icons-material/MoodBad';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import {logout} from "../../features/user/userSlice.js";
import {useSeniorManipulate} from "./hooks.js";


const Sidebar = ({visible, setVisible}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if(visible){
      setTimeout(() => setShouldRender(true), 200);
    } else {
      setTimeout(() => setShouldRender(false), 10);
    }
  }, [visible]);

  const {senior, seniorLoading, fetchSenior, checkInSenior, checkInSeniorLoading} = useSeniorManipulate();
  
  useEffect(() => {
    if (user.role === 'senior_spec') {
      void fetchSenior(user.id);
    }
  }, [fetchSenior, user.id, user.role])

  const dutyButtons = [
    <Button key='1' color='success' disabled={senior} loading={seniorLoading || checkInSeniorLoading} onClick={ () =>checkInSenior({id: user?.id, checkSenior: false})}>
      Начать смену
    </Button>,
    <Button key='2' color='error' disabled={!senior} loading={seniorLoading || checkInSeniorLoading} onClick={ () =>checkInSenior({id: user?.id, checkSenior: true})}>
      Завершить смену
    </Button>
  ];

  return (
    <div className={`sidebar open-${visible}`} onMouseEnter={()=>setVisible(true)} onMouseLeave={()=>setVisible(false)}>
     <Grid sx={{
       minHeight: '50px',
       padding: "10px 0"
     }}>
      <Typography className={`user-name opacity-${visible} display-${shouldRender}`}>
        {user?.name || ''} ({user?.sip || ''})
      </Typography>
     </Grid>
      <div className='sidebar-navigation'>
        <div className='sidebar-button-group'>
          <Grid sx={{
            height: "25px",
            pb: 1,
          }}>
            <Typography className={`sidebar-button-group-title opacity-${visible} display-${shouldRender}`}>Отчёты</Typography>
          </Grid>
          <div className='sidebar-button-group-list'>
            <Button
              className={`sidebar-nav-btn ${pathname === '/cards' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              onClick={()=>navigate('/cards')}
            >
              <ContactPhoneIcon />
              <span className={`opacity-${visible} display-${shouldRender}`}>
                Звонки
              </span>
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_employees' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              onClick={()=>navigate('/stats_by_employees')}
            >
              <GroupIcon />
              <span className={`opacity-${visible} display-${shouldRender}`}>
                Звонки по сотрудникам
              </span>
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_reasons' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              onClick={()=>navigate('/stats_by_reasons')}
            >
              <HelpIcon />
              <span className={`opacity-${visible} display-${shouldRender}`}>
                Звонки по причинам
              </span>
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_solutions' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              onClick={()=>navigate('/stats_by_solutions')}
            >
              <EmojiObjectsIcon />

              <span className={`opacity-${visible} display-${shouldRender}`}>
                Звонки по решениям
              </span>
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_repeated_calls' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              onClick={()=>navigate('/stats_by_repeated_calls')}
            >
              <RepeatIcon />
              <span className={`opacity-${visible} display-${shouldRender}`}>
                Повторные звонки
              </span>
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_inactives_users' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              onClick={() => navigate('/stats_by_inactives_users')}
            >
              <VoiceOverOffIcon />
              <span className={`opacity-${visible} display-${shouldRender}`}>
                Неактивные звонки
              </span>

            </Button>
          </div>
        </div>
        <Divider />
        {user.role === 'senior_spec' && (
          <div className={`display-${shouldRender}`}>
            <ButtonGroup
              className={`duty-button-group opacity-${visible}`}
              sx={{
                width: '100%',
              }}
              size='small'
              aria-label='Small button group'
            >
              {dutyButtons}
            </ButtonGroup>
          </div>
        )}
        {user.role === 'admin' && (
          <div className={`sidebar-button-group opacity-${visible} display-${shouldRender}`}>
            <Typography className='sidebar-button-group-title'>
              Управление
            </Typography>
            <div className='sidebar-button-group-list'>
              <Button
                className={`sidebar-nav-btn ${pathname === '/solution-and-reason' ? 'nav-button-active' : 'nav-button-inactive'}`}
                variant='text'
                size='large'
                onClick={()=>navigate('/actions_tree')}
              >
                Причины / Решения
              </Button>
              <Button
                className={`sidebar-nav-btn ${pathname === '/employees' ? 'nav-button-active' : 'nav-button-inactive'}`}
                variant='text'
                size='large'
                onClick={()=>navigate('/employees')}
              >
                Сотрудники
              </Button>
            </div>
          </div>
        )}
        <Button
          className='sidebar-nav-btn'
          variant='text'
          color='error'
          size='large'
          sx={{ mt: 'auto'}}
          onClick={()=>setOpenModal(true)}
        >
          <LogoutIcon />
          <span className={`opacity-${visible} display-${shouldRender}`}>
            Выйти из системы
          </span>
        </Button>
        <Modal open={openModal} handleClose={handleClose}>
          <Grid sx={{
            width: '350px'
          }}>
            <Typography variant={"h3"} sx={{
              fontSize: '30px',
              textAlign: 'center',
              mb: 3,
            }}>
              Уходишь?
            </Typography>
            <Grid sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
              "&>button>span>.css-1sh91j5-MuiButton-startIcon>*:nth-of-type(1)": {
                fontSize: "28px",
              }
            }}>
              <Button variant={'outlined'} color={"error"} startIcon={<MoodBadIcon/>} onClick={()=> {
                dispatch(logout())
              }} fullWidth sx={{
                fontSize: '18px'
              }}>
                Ухожу
              </Button>
              <Button color={'primary'} onClick={handleClose} variant={'outlined'} fullWidth startIcon={<InsertEmoticonIcon />} sx={{
                fontSize: '18px'
              }}>
                Остаюсь
              </Button>
            </Grid>
          </Grid>
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
