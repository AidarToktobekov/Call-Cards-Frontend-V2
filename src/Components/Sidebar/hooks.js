import {useCallback, useState} from "react";
import {useAppDispatch} from "../../app/hooks.js";
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";
import axiosApi from "../../axiosApi.js";

export const useSeniorManipulate = (id)=>{
  const dispatch = useAppDispatch();
  const [senior, setSenior] = useState(false);
  const [seniorLoading, setSeniorLoading] = useState(false);

  const fetchSenior = useCallback(async () => {
    setSeniorLoading(false);
    try {
      const {data: user } = await axiosApi.get(`/users/${id}`);

      setSenior(user?.checked_in || false);
    }catch (e){
      dispatch(addSnackbar({error: e.response.data.error || e.message}))
    }
  }, [dispatch, id]);

  return {senior, seniorLoading, fetchSenior};
}