import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.js";
import axiosApi from "../../axiosApi.js";
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";

export const useCreateReasons = () => {
  const [reasonLoading, setReasonLoading] = useState(false);
  const dispatch = useAppDispatch();

  const createReasons = async (reasonMutation) => {
    setReasonLoading(true)
    try{
      await axiosApi.post('/actions_tree/create_reason', reasonMutation);

      dispatch(addSnackbar({ type: 'success', message: "Причина создана!" }));
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
