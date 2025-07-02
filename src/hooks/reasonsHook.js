import {useCallback, useState} from "react";
import axiosApi from "../axiosApi.js";
import {useAppDispatch} from "../app/hooks.js";
import {addSnackbar} from "../features/notifications/notificationsSlice.js";

export const useFetchReasons = () => {
  const [reasons, setReasons] = useState([]);
  const [reasonsLoading, setReasonsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchReasons = useCallback (async () => {
    setReasonsLoading(true);
    try {
      const { data: reasons } = await axiosApi.get('actions_tree/reasons');
      setReasons(reasons);
    } catch (error) {
      dispatch(addSnackbar({
        type: "error",
        message: error?.error || error?.message || "Не известная ошибка!",
      }))
      console.error(error);
    } finally {
      setReasonsLoading(false);
    }
  }, [dispatch]);

  return { reasons, reasonsLoading, fetchReasons };
}

export const useCreateReasons = () => {
  const [reasonLoading, setReasonLoading] = useState(false);
  const dispatch = useAppDispatch();

  const createReasons = async (reasonMutation) => {
    setReasonLoading(true)
    try{
      await axiosApi.post('/actions_tree/create_reason', reasonMutation);
    }catch(error){
      dispatch(addSnackbar({
        type: "error",
        message: error?.error || error?.message || "Не известная ошибка!",
      }))
    }finally{
      setReasonLoading(false)
    }
  }

  return { reasonLoading, createReasons };
}