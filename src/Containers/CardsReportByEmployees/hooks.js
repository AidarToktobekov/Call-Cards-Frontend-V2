import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';
import dayjs from 'dayjs';

export const useFetchFilterData = () => {
  const dispatch = useAppDispatch();
  const [reasons, setReasons] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [users, setUsers] = useState([]);
  const [reasonsLoading, setReasonsLoading] = useState(false);
  const [solutionsLoading, setSolutionsLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  const fetchFilterData = useCallback(async () => {
    try {
      setReasonsLoading(true);
      setSolutionsLoading(true);
      setUsersLoading(true);

      const reasonsResponse = await axiosApi('/actions_tree/reasons');
      setReasonsLoading(false);
      setReasons(reasonsResponse.data);

      const solutionsResponse = await axiosApi('/actions_tree/solutions');
      setSolutionsLoading(false);
      setSolutions(solutionsResponse.data);

      const employeesResponse = await axiosApi('/users');
      setUsersLoading(false);
      setUsers(employeesResponse.data);
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
      setReasonsLoading(false);
      setSolutionsLoading(false);
      setUsersLoading(false);
    }
  }, [dispatch]);

  return {
    reasons,
    solutions,
    users,
    reasonsLoading,
    solutionsLoading,
    usersLoading,
    fetchFilterData
  };
};

export const useFetchCardsByEmployees = () => {
  const dispatch = useAppDispatch();
  const [cardsByEmployees, setCardsByEmployees] = useState(null);
  const [cardsByEmployeesLoading, setCardsByEmployeesLoading] = useState(false);
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
          end_date: filtersState?.end_date?.format('YYYY-MM-DD')
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

  return {
    cardsByEmployees,
    cardsByEmployeesLoading,
    filtersState,
    handleFilterChange,
    onSearchSubmit
  };
};
