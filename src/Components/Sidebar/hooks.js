import {useCallback, useState} from "react";
import {useAppDispatch} from "../../app/hooks.js";
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";
import axiosApi from "../../axiosApi.js";

export const useSeniorManipulate = (id)=>{
  const dispatch = useAppDispatch();
  const [senior, setSenior] = useState(false);
  const [seniorLoading, setSeniorLoading] = useState(false);
  const [checkInSeniorLoading, setCheckInSeniorLoading] = useState(false);

  const fetchSenior = useCallback(async () => {
    setSeniorLoading(false);
    try {
      const {data: user } = await axiosApi.get(`/users/${id}`);

      setSenior(user?.checked_in || false);
    }catch (e){
      dispatch(addSnackbar({error: e.response.data.error || e.message}))
    }
  }, [dispatch, id]);

  const checkInSenior = useCallback(async ({id, checkSenior }) => {
    setCheckInSeniorLoading(true);
    try {
      await axiosApi.post(
        `/users/${id}/${checkSenior ? 'check_out' : 'check_in'}`
      );

      dispatch(addSnackbar({ type: 'success', message: checkSenior ? "Смена завершена!" : "Вы открыли смену!" }));
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: (e.response.data.error || e.response.data.message) }));
    }finally {
      setCheckInSeniorLoading(false);
    }
  }, [dispatch]);

  return {senior, seniorLoading, fetchSenior, checkInSenior, checkInSeniorLoading};
}