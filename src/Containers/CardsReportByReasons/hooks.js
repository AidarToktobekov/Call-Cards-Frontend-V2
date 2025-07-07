import {useCallback, useState} from "react";
import axiosApi from "../../axiosApi.js";
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";
import {useAppDispatch} from "../../app/hooks.js";
import dayjs from "dayjs";
import {exportToExcel} from "../../excelExporter.jsx";

export const useFetchCardsReportByReasons = () => {

  const [cardsReportByReasons, setCardsReportByReasons] = useState([]);
  const [cardsReportByReasonsLoading, setCardsReportByReasonsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [exportLoading, setExportLoading] = useState(false);
  const [filtersState, setFiltersState] = useState({
    start_date: dayjs().startOf('month'),
    end_date: dayjs().endOf('month')
  });

  const handleFilterChange = (name, value) =>
    setFiltersState(prevState => ({ ...prevState, [name]: value }));

  const onSearchSubmit = () => {
    if (cardsReportByReasonsLoading) return;
    void fetchCardsReportByReasons({ ...filtersState });
  };

  const fetchCardsReportByReasons = useCallback(async (filtersState) => {
    setCardsReportByReasonsLoading(true);
    try {
      const date = {
        start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
        end_date: filtersState?.end_date
          ? filtersState.end_date.add(1, 'day').format('YYYY-MM-DD')
          : filtersState?.end_date,
      };
      const { data: cardsReportByReasons } = await axiosApi.get(
        `/cards/stats_by_reason${date?.start_date && date?.start_date ? `?start_date=${date.start_date}&end_date=${date.end_date}` : ''}`
      );

      const filteredCards = [];
      if (filtersState?.reasons && filtersState?.reasons.length > 0){
        cardsReportByReasons.map(card => {
          filtersState?.reasons.map(reason => {
            if (reason.title === card.reason){
              filteredCards.push(card);
            }
          })
        })
      }else {
        filteredCards.push(...cardsReportByReasons);
      }

      setCardsReportByReasons(filteredCards);
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    } finally {
      setCardsReportByReasonsLoading(false);
    }
  }, [dispatch]);

  const exportCards = async () => {
    setExportLoading(true);
    try {
      const date = {
        start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
        end_date: filtersState?.end_date
          ? filtersState.end_date.add(1, 'day').format('YYYY-MM-DD')
          : filtersState?.end_date,
      };
      const { data: cardsReportByReasons } = await axiosApi.get(
        `/cards/stats_by_reason${date?.start_date && date?.start_date ? `?start_date=${date.start_date}&end_date=${date.end_date}` : ''}`
      );
      const listCards = cardsReportByReasons.map((item) => ({
        Причина: item.reason,
        Кол_во: item.count,
      }));

      exportToExcel(listCards, "Отчет_по_причинам");

    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.response.data.error || e.response.data.message }));
    } finally {
      setExportLoading(false);
    }
  }


  return {
    cardsReportByReasons,
    cardsReportByReasonsLoading,
    filtersState,
    handleFilterChange,
    onSearchSubmit,
    exportLoading,
    exportCards
  }
};