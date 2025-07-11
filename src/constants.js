import { matchPath } from 'react-router-dom';

export const API_URL = 'http://10.1.4.9:8010';

export const PAGE_NAMES = {
  '/': 'Новая карточка',
  '/sign-up': 'Новый пользователь',
  '/actions_tree': 'Причины / решения',
  '/cards': 'Звонки',
  '/stats_by_employees': 'Отчёт по сотрудникам',
  '/stats_by_reasons': 'Звонки по причинам',
  '/stats_by_solutions': 'Звонки по решениям',
  '/stats_by_repeated_calls': 'Повторные звонки',
  '/stats_by_inactives_users': 'Неактивные абоненты',
  '/employees': 'Сотрудники',
  '/edit-employees/:id': 'Редактирование сотрудника'
};

export function getPageTitle(pathname) {
  for (const pattern in PAGE_NAMES) {
    if (matchPath({ path: pattern, end: true }, pathname)) {
      return PAGE_NAMES[pattern];
    }
  }
  return '';
}
