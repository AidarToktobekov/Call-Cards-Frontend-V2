import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';
import dayjs from 'dayjs';
import {exportToExcel} from "../../excelExporter.jsx";

export const useFetchCardsByEmployees = () => {
  const dispatch = useAppDispatch();
  const [cardsByEmployees, setCardsByEmployees] = useState(null);
  const [cardsByEmployeesLoading, setCardsByEmployeesLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [filtersState, setFiltersState] = useState({
    start_date: dayjs().startOf('month'),
    end_date: dayjs().endOf('month')
  });

  const handleFilterChange = (name, value) =>
    setFiltersState(prevState => ({ ...prevState, [name]: value }));

  const onSearchSubmit = () => {
    if (cardsByEmployeesLoading) return;
    void fetchCards(filtersState);
  };

  const fetchCards = useCallback(
    async filtersState => {
      try {
        const params = {
          start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
          end_date: filtersState?.end_date
            ? filtersState.end_date.add(1, 'day').format('YYYY-MM-DD')
            : filtersState?.end_date
        };

        setCardsByEmployeesLoading(true);
        const response = await axiosApi('/cards/report', { params });
        setCardsByEmployees(response.data);
      } catch (e) {
        dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
      } finally {
        setCardsByEmployeesLoading(false);
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
          : filtersState?.end_date
      };

      const {data: list} = await axiosApi('/cards/report', { params });
      const listCards = list.map((item) => ({
        Сотрудник: item.spec_full_name,
        СИП: item.sip,
        Кол_во: item.count,
      }));

      exportToExcel(listCards, "Отчет_по_сотрудникам");

    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.response.data.error || e.response.data.message }));
    } finally {
      setExportLoading(false);
    }
  }

  return {
    cardsByEmployees,
    cardsByEmployeesLoading,
    filtersState,
    handleFilterChange,
    onSearchSubmit,
    exportLoading,
    exportCards
  };
};
