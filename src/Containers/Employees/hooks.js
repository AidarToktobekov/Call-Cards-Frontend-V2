import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';

export const useFetchCardsByEmployees = () => {
  const dispatch = useAppDispatch();
  const [employees, setEmployees] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [employeeForEditLoading, setEmployeeForEditLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
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

  const fetchEmployeeForEdit = useCallback(async (id) => {
    setEmployeeForEditLoading(true);
    try {
      const req = await axiosApi(`/users/${id}`);
      const res = await req.data;
      setEmployee({
        ...(res?.[0] || {}),
        password: '',
      });
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    } finally {
      setEmployeeForEditLoading(false);
    }
  }, [dispatch]);


  const onSearchSubmit = useCallback(() => {
    if (employeesLoading) return;
    void fetchUsers();
  }, [employeesLoading, fetchUsers]);

  return { employees, employeesLoading, onSearchSubmit, fetchEmployeeForEdit, employee, employeeForEditLoading };
};


