import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';

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
  const [employees, setEmployees] = useState(null);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  const fetchCards = useCallback(async () => {
    try {
      setEmployeesLoading(true);
      const response = await axiosApi('/users');
      setEmployees(response.data);
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    } finally {
      setEmployeesLoading(false);
    }
  }, [dispatch]);

  const onSearchSubmit = useCallback(() => {
    if (employeesLoading) return;
    void fetchCards();
  }, [employeesLoading, fetchCards]);

  return { employees, employeesLoading, onSearchSubmit };
};
