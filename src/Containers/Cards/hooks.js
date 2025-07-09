import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';
import dayjs from 'dayjs';
import {exportToExcel} from "../../excelExporter.jsx";

export const useFetchCards = () => {
  const dispatch = useAppDispatch();
  const [cards, setCards] = useState(null);
  const [cardsLoading, setCardsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [filtersState, setFiltersState] = useState({
    start_date: dayjs().startOf('month'),
    end_date: dayjs().endOf('month')
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState('');

  const handleFilterChange = (name, value) =>
    setFiltersState(prevState => ({ ...prevState, [name]: value }));

  const handleSearchWordChange = e => {
    setSearchWord(e.target.value);
  };

  const handlePageChange = (_, value = 1) => {
    if (cardsLoading) return;
    setCurrentPage(value);
    void fetchCards({ ...filtersState, searchWord, currentPage: value });
  };

  const onSearchSubmit = () => {
    if (cardsLoading) return;
    setCurrentPage(1);
    void fetchCards({ ...filtersState, searchWord });
  };

  const exportCards = async () => {
    setExportLoading(true);

    try {
      const params = {
        start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
        end_date: filtersState?.end_date
          ? filtersState.end_date.add(1, 'day').format('YYYY-MM-DD')
          : filtersState?.end_date,
        reason: (filtersState?.reasons || []).map(reason => reason?.id),
        solution: (filtersState?.solutions || []).map(
          solution => solution?.id
        ),
        sip: (filtersState?.users || []).map(user => user?.sip),
        ls_abon: filtersState?.searchWord || '',
        page_size: 100000000,
      };

      const {data: list} = await axiosApi('/cards', { params });
      const listCards = list.result.map((item) => ({
        Айди_Аккаунта: item.account_id,
        Вызов_От: item.call_from,
        Комментарий: item.comment,
        Дата_Создания: item.created_at,
        ФИО: item.full_name,
        ID: item.id,
        ip_address: item.ip_address || '',
        ip_olt: item.ip_olt || '',
        mac_address: item.mac_address || '',
        mac_onu: item.mac_onu || '',
        n_result_id: item.n_result_id || '',
        Адресс: item.address,
        Личный_счет: item.ls_abon,
        Тел_Номер: item.phone_number.join(', '),
        Причина: item.reason.title,
        Решение: item.solution?.title || '',
        Сип: item.sip,
      }));

      exportToExcel(listCards, "Карточки_звонка");

    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.response.data.error || e.response.data.message }));
    } finally {
      setExportLoading(false);
    }
  }

  const fetchCards = useCallback(
    async filtersState => {
      try {
        const params = {
          start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
          end_date: filtersState?.end_date
            ? filtersState.end_date.add(1, 'day').format('YYYY-MM-DD')
            : filtersState?.end_date,
          reason: (filtersState?.reasons || []).map(reason => reason?.id),
          solution: (filtersState?.solutions || []).map(
            solution => solution?.id
          ),
          sip: (filtersState?.users || []).map(user => user?.sip),
          ls_abon: filtersState?.searchWord || '',
          page: filtersState?.currentPage || 1,
          page_size: 100
        };

        setCardsLoading(true);
        const response = await axiosApi('/cards', { params });
        setCards(response.data);
      } catch (e) {
        dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
      } finally {
        setCardsLoading(false);
      }
    },
    [dispatch]
  );

  return {
    cards,
    searchWord,
    cardsLoading,
    currentPage,
    filtersState,
    handleSearchWordChange,
    handleFilterChange,
    handlePageChange,
    onSearchSubmit,
    exportCards,
    exportLoading
  };
};
