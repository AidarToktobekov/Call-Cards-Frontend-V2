import {useCallback, useState} from "react";
import axiosApi from "../../axiosApi.js";
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";
import {useAppDispatch} from "../../app/hooks.js";
import dayjs from "dayjs";
import {exportToExcel} from "../../excelExporter.jsx";

export const useFetchCardsReportBySolutions = () => {

  const [cardsReportBySolutions, setCardsReportBySolutions] = useState([]);
  const [cardsReportBySolutionsLoading, setCardsReportBySolutionsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [exportLoading, setExportLoading] = useState(false);
  const [filtersState, setFiltersState] = useState({
    start_date: dayjs().startOf('month'),
    end_date: dayjs().endOf('month')
  });

  const handleFilterChange = (name, value) =>
    setFiltersState(prevState => ({ ...prevState, [name]: value }));

  const onSearchSubmit = () => {
    if (cardsReportBySolutionsLoading) return;
    void fetchCardsReportBySolutions({ ...filtersState });
  };

  const fetchCardsReportBySolutions = useCallback(async (filtersState) => {
    setCardsReportBySolutionsLoading(true);
    try {
      const date = {
        start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
        end_date: filtersState?.end_date
          ? filtersState.end_date.add(1, 'day').format('YYYY-MM-DD')
          : filtersState?.end_date,
      };
      const { data: cardsReportBySolutions } = await axiosApi.get(
        `/cards/stats_by_solution${date?.start_date && date?.start_date ? `?start_date=${date.start_date}&end_date=${date.end_date}` : ''}`
      );

      let filteredCards = [];
      if (filtersState?.solutions && filtersState?.solutions.length > 0){
        cardsReportBySolutions.map(card => {
          filtersState?.reasons.map(reason => {
            if (reason.id === card.reason.id){
              filtersState?.solutions.map(solution => {
                if (solution.id === card.solution.id){
                  filteredCards.push(card);
                }
              })
            }
          });
        })
      }else if (filtersState?.reasons && filtersState?.reasons.length > 0){
        cardsReportBySolutions.map(card => {
          filtersState?.reasons.map(reason => {
            if (reason.id === card.reason.id){
              filteredCards.push(card);
            }
          });
        })
      }else {
        filteredCards.push(...cardsReportBySolutions);
      }

      setCardsReportBySolutions(filteredCards);
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    } finally {
      setCardsReportBySolutionsLoading(false);
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
      const { data: cardsReportBySolutions } = await axiosApi.get(
        `/cards/stats_by_solution${date?.start_date && date?.start_date ? `?start_date=${date.start_date}&end_date=${date.end_date}` : ''}`
      );

      let filteredCards = [];
      if (filtersState?.solutions && filtersState?.solutions.length > 0){
        cardsReportBySolutions.map(card => {
          filtersState?.reasons.map(reason => {
            if (reason.id === card.reason.id){
              filtersState?.solutions.map(solution => {
                if (solution.id === card.solution.id){
                  filteredCards.push(card);
                }
              })
            }
          });
        })
      }else if (filtersState?.reasons && filtersState?.reasons.length > 0){
        cardsReportBySolutions.map(card => {
          filtersState?.reasons.map(reason => {
            if (reason.id === card.reason.id){
              filteredCards.push(card);
            }
          });
        })
      }else {
        filteredCards.push(...cardsReportBySolutions);
      }
      const listCards = filteredCards.map((item) => ({
        Причина: item.reason.title,
        Решение: item.solution.title,
        Кол_во: item.count,
      }));

      exportToExcel(listCards, "Отчет_по_решениям");

    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.response.data.error || e.response.data.message }));
    } finally {
      setExportLoading(false);
    }
  }

  return {
    cardsReportBySolutions,
    cardsReportBySolutionsLoading,
    filtersState,
    handleFilterChange,
    onSearchSubmit,
    exportLoading,
    exportCards
  }
};