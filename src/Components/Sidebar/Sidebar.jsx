import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import GroupIcon from '@mui/icons-material/Group';
import HelpIcon from '@mui/icons-material/Help';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RepeatIcon from '@mui/icons-material/Repeat';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import './sidebar.css';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
      <div className='sidebar-navigation'>
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
      </div>
    </div>
  );
};

export default Sidebar;
