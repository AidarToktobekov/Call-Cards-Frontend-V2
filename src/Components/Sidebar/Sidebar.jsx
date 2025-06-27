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
import './sidebar.css';
import { useAppSelector } from '../../app/hooks.js';

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
        <Button
          className={`${pathname === '/cards' ? 'nav-button-active' : 'nav-button-inactive'}`}
          variant='text'
          size='large'
          onClick={() => navigate('/cards')}
        >
          <ContactPhoneIcon />
          Звонки
        </Button>
        <Button
          className={`${pathname === '/stats_by_employees' ? 'nav-button-active' : 'nav-button-inactive'}`}
          variant='text'
          size='large'
          onClick={() => navigate('/stats_by_employees')}
        >
          <GroupIcon />
          Звонки по сотрудникам
        </Button>
        <Button
          className={`${pathname === '/stats_by_reasons' ? 'nav-button-active' : 'nav-button-inactive'}`}
          variant='text'
          size='large'
          onClick={() => navigate('/stats_by_reasons')}
        >
          <HelpIcon />
          Звонки по причинам
        </Button>
        <Button
          className={`${pathname === '/stats_by_solutions' ? 'nav-button-active' : 'nav-button-inactive'}`}
          variant='text'
          size='large'
          onClick={() => navigate('/stats_by_solutions')}
        >
          <EmojiObjectsIcon />
          Звонки по решениям
        </Button>
        <Button
          className={`${pathname === '/stats_by_repeated_calls' ? 'nav-button-active' : 'nav-button-inactive'}`}
          variant='text'
          size='large'
          onClick={() => navigate('/stats_by_repeated_calls')}
        >
          <RepeatIcon />
          Повторные звонки
        </Button>
        <Button
          className={`${pathname === '/stats_by_inactives_users' ? 'nav-button-active' : 'nav-button-inactive'}`}
          variant='text'
          size='large'
          onClick={() => navigate('/stats_by_inactives_users')}
        >
          <VoiceOverOffIcon />
          Неактивные звонки
        </Button>
        <Divider />
        <Button
          className={`${pathname === '/solution-and-reason' ? 'nav-button-active' : 'nav-button-inactive'}`}
          variant='text'
          size='large'
          onClick={() => navigate('/solution-and-reason')}
        >
          Причины / Решения
        </Button>
        <Button
          className={`${pathname === '/employees' ? 'nav-button-active' : 'nav-button-inactive'}`}
          variant='text'
          size='large'
          onClick={() => navigate('/employees')}
        >
          Сотрудники
        </Button>
        <Button variant='text' color='error' size='large' sx={{ mt: 'auto' }}>
          <LogoutIcon />
          Выйти из системы
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
