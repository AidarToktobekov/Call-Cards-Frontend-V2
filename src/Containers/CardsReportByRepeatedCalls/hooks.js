import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';
import dayjs from 'dayjs';
import {exportToExcel} from "../../excelExporter.jsx";

export const useFetchCards = () => {
  const dispatch = useAppDispatch();
  const [repeatedCalls, setRepeatedCalls] = useState(null);
  const [repeatedCallsLoading, setRepeatedCallsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [filtersState, setFiltersState] = useState({
    start_date: dayjs().startOf('month'),
    end_date: dayjs().endOf('month')
  });
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (_, value = 1) => {
    if (repeatedCallsLoading) return;
    setCurrentPage(value);
    void fetchCards({ ...filtersState, searchWord, currentPage: value });
  };

  const handleFilterChange = (name, value) =>
    setFiltersState(prevState => ({ ...prevState, [name]: value }));

  const handleSearchWordChange = e => {
    setSearchWord(e.target.value);
  };

  const onSearchSubmit = () => {
    if (repeatedCallsLoading) return;
    setCurrentPage(1);
    void fetchCards({ ...filtersState, searchWord });
  };

  const fetchCards = useCallback(
    async filtersState => {
      try {
        setRepeatedCallsLoading(true);
        const params = {
          start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
          end_date: filtersState?.end_date
            ? filtersState.end_date.add(1, 'day').format('YYYY-MM-DD')
            : filtersState?.end_date,
          reason: (filtersState?.reasons || []).map(reason => reason?.id),
          solution: (filtersState?.solutions || []).map(
            solution => solution?.id
          ),
          ls_abon: filtersState?.searchWord || '',
          page: filtersState?.currentPage || 1,
          page_size: 100
        };
        const response = await axiosApi(`/cards/repeated_calls`, {params});
        setRepeatedCalls(response.data);
      } catch (e) {
        dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
      } finally {
        setRepeatedCallsLoading(false);
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
        ls_abon: filtersState?.searchWord || '',
        page_size: 100000000
      };
      const {data: res} = await axiosApi(`/cards/repeated_calls`, {params});
      const listCards = res.result.map((item) => ({
        Адресс: item.address,
        Личный_счет: item.ls_abon,
        Тел_Номер: item.phone_number.join(', '),
        Сипы: item.sip.join(', '),
        Причина: item.reason.title,
        Решение: item.solution?.title || '',
        Кол_во: item.count,
      }));

      exportToExcel(listCards, "Отчет_по_повторным_звонкам");

    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.response.data.error || e.response.data.message }));
    } finally {
      setExportLoading(false);
    }
  }

  return {
    repeatedCalls,
    searchWord,
    repeatedCallsLoading,
    filtersState,
    handlePageChange,
    currentPage,
    handleSearchWordChange,
    handleFilterChange,
    onSearchSubmit,
    exportLoading,
    exportCards
  };
};
