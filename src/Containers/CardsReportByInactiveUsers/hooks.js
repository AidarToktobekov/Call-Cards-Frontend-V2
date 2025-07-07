import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';
import dayjs from 'dayjs';
import {exportToExcel} from "../../excelExporter.jsx";

export const useFetchCards = () => {
  const dispatch = useAppDispatch();
  const [inactivesCards, setInactivesCards] = useState(null);
  const [inactivesCardsLoading, setInactivesCardsLoading] = useState(false);
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
    if (inactivesCardsLoading) return;
    setCurrentPage(value);
    void fetchCards({ ...filtersState, searchWord, currentPage: value });
  };

  const onSearchSubmit = () => {
    if (inactivesCardsLoading) return;
    setCurrentPage(1);
    void fetchCards({ ...filtersState, searchWord });
  };

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

        setInactivesCardsLoading(true);
        const response = await axiosApi('/cards/inactives', { params });
        setInactivesCards(response.data);
      } catch (e) {
        dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
      } finally {
        setInactivesCardsLoading(false);
      }
    },
    [dispatch]
  );

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

      const {data: list} = await axiosApi('/cards/inactives', { params });
      const listCards = list.map((item) => ({
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

      exportToExcel(listCards, "Отчет_по_неактивным");

    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.response.data.error || e.response.data.message }));
    } finally {
      setExportLoading(false);
    }
  }


  return {
    inactivesCards,
    searchWord,
    inactivesCardsLoading,
    currentPage,
    filtersState,
    handleSearchWordChange,
    handleFilterChange,
    handlePageChange,
    onSearchSubmit,
    exportLoading,
    exportCards
  };
};

export const useFetchLastPay = () => {
  const [lastPay, setLastPay] = useState(null);
  const [lastPayLoading, setLastPayLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchLastPay = useCallback(async(ls_abon)=>{
    setLastPayLoading(true);
    try {
      const { data: res } = await axiosApi(`/cards/get_last_pay/${ls_abon}`);
      setLastPay(res.last_pay);
    } catch (e) {
      dispatch(addSnackbar({
        type: 'error',
        message: e.reasons.data.error || e.reasons.data.message || "Ошибка при получение последнего платежа!"
      }));
    } finally {
      setLastPayLoading(false);
    }
  }, [dispatch]);

  return { lastPay, lastPayLoading, fetchLastPay }
}
