import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.js";
import axiosApi from "../../axiosApi.js";
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";

export const useCreateSolution = () => {
  const [solutionLoading, setSolutionLoading] = useState(false);
  const dispatch = useAppDispatch();

  const createSolutions = async (solutionMutation) => {
    setSolutionLoading(true)
    try{
      await axiosApi.post('/actions_tree/create_solution', solutionMutation);

      dispatch(addSnackbar({ type: 'success', message: "Создано новое решение!" }));
    }catch(error){
      dispatch(addSnackbar({
        type: "error",
        message: error?.error || error?.message || "Не известная ошибка!",
      }))
    }finally{
      setSolutionLoading(false)
    }
  }

  return { solutionLoading, createSolutions };
}