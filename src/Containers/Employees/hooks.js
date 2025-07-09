import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';

export const useFetchCardsByEmployees = () => {
  const dispatch = useAppDispatch();
  const [employee, setEmployee] = useState(null);
  const [employeeForEditLoading, setEmployeeForEditLoading] = useState(false);

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

  return { fetchEmployeeForEdit, employee, employeeForEditLoading };
};


