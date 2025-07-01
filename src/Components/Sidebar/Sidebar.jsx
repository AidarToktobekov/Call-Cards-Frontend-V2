import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Divider, Typography } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import GroupIcon from '@mui/icons-material/Group';
import HelpIcon from '@mui/icons-material/Help';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RepeatIcon from '@mui/icons-material/Repeat';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppSelector } from '../../app/hooks.js';
import './sidebar.css';

const dutyButtons = [
  <Button key='1' color='success' disabled={false}>
    Начать смену
  </Button>,
  <Button key='2' color='error' disabled={true}>
    Завершить смену
  </Button>
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.user);

  return (
    <div className='sidebar'>
      <Typography className='user-name'>
        {user?.name || ''} ({user?.sip || ''})
      </Typography>
      <div className='sidebar-navigation'>
        <ButtonGroup
          className='duty-button-group'
          size='small'
          aria-label='Small button group'
        >
          {dutyButtons}
        </ButtonGroup>
        <div className='sidebar-button-group'>
          <Typography className='sidebar-button-group-title'>Отчёты</Typography>
          <div className='sidebar-button-group-list'>
            <Button
              className={`sidebar-nav-btn ${pathname === '/cards' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              href='/cards'
            >
              <ContactPhoneIcon />
              Звонки
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_employees' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              href='/stats_by_employees'
            >
              <GroupIcon />
              Звонки по сотрудникам
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_reasons' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              href='/stats_by_reasons'
            >
              <HelpIcon />
              Звонки по причинам
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_solutions' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              href='/stats_by_solutions'
            >
              <EmojiObjectsIcon />
              Звонки по решениям
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_repeated_calls' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              href='/stats_by_repeated_calls'
            >
              <RepeatIcon />
              Повторные звонки
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/stats_by_inactives_users' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              onClick={() => navigate('/stats_by_inactives_users')}
            >
              <VoiceOverOffIcon />
              Неактивные звонки
            </Button>
          </div>
        </div>
        <Divider />
        <div className='sidebar-button-group'>
          <Typography className='sidebar-button-group-title'>
            Управление
          </Typography>
          <div className='sidebar-button-group-list'>
            <Button
              className={`sidebar-nav-btn ${pathname === '/solution-and-reason' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              href='/actions_tree'
            >
              Причины / Решения
            </Button>
            <Button
              className={`sidebar-nav-btn ${pathname === '/employees' ? 'nav-button-active' : 'nav-button-inactive'}`}
              variant='text'
              size='large'
              href='/employees'
            >
              Сотрудники
            </Button>
          </div>
        </div>
        <Button
          className='sidebar-nav-btn'
          variant='text'
          color='error'
          size='large'
          sx={{ mt: 'auto' }}
        >
          <LogoutIcon />
          Выйти из системы
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
