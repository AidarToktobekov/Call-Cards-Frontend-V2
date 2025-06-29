import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';

export const useFetchFilterData = () => {
  const [reasons, setReasons] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [users, setUsers] = useState([]);
  const [reasonsLoading, setReasonsLoading] = useState(false);
  const [solutionsLoading, setSolutionsLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchFilterData = useCallback(async () => {
    try {
      setReasonsLoading(true);
      setSolutionsLoading(true);
      setEmployeesLoading(true);

      const reasonsResponse = await axiosApi('/actions_tree/reasons');
      setEmployeesLoading(false);
      setReasons(reasonsResponse.data);

      const solutionsResponse = await axiosApi('/actions_tree/solutions');
      setSolutionsLoading(false);
      setSolutions(solutionsResponse.data);

      const employeesResponse = await axiosApi('/users');
      setEmployeesLoading(false);
      setUsers(employeesResponse.data);
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
      setEmployeesLoading(false);
      setSolutionsLoading(false);
      setEmployeesLoading(false);
    }
  }, [dispatch]);

  return {
    reasons,
    solutions,
    users,
    reasonsLoading,
    solutionsLoading,
    employeesLoading,
    fetchFilterData
  };
};

export const useFetchCards = () => {
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchCards = useCallback(
    async filtersState => {
      try {
        const params = {
          start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
          end_date: filtersState?.end_date?.format('YYYY-MM-DD'),
          reason: (filtersState?.reasons || []).map(reason => reason?.id),
          solution: (filtersState?.solutions || []).map(
            solution => solution?.id
          ),
          sip: (filtersState?.users || []).map(user => user?.sip),
          ls_abon: filtersState?.searchWord || ''
        };

        console.log(params);

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

  return { cards, cardsLoading, fetchCards };
};
