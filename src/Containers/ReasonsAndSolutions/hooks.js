import {useCallback, useState} from "react";
import {useAppDispatch} from "../../app/hooks.js";
import axiosApi from "../../axiosApi.js";
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";

export const useDeleteReasons = () => {
  const [ reasonsDeleteLoading, setReasonsDeleteLoading ] = useState(false);
  const dispatch = useAppDispatch();

  const deleteReason = useCallback(async (id) => {
    setReasonsDeleteLoading(true);
    try {
      await axiosApi.delete(
        `/actions_tree/reasons/${id}`
      );

      dispatch(addSnackbar({ type: 'success', message: "Причина удалена!" }));
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.response.data.error || e.response.data.message }));
    }finally {
      setReasonsDeleteLoading(false);
    }
  },[dispatch]);

  return { reasonsDeleteLoading, deleteReason };
}

export const useDeleteSolution = () => {
  const [solutionDeleteLoading, setSolutionsDeleteLoading] = useState(false);
  const dispatch = useAppDispatch();

  const deleteSolutions = useCallback(async (id) => {
    setSolutionsDeleteLoading(true);
    try {
      await axiosApi.delete(
        `/actions_tree/solutions/${id}`
      );

      dispatch(addSnackbar({ type: 'success', message: "Решение удалено!" }));
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    }finally {
      setSolutionsDeleteLoading(false);
    }
  },[dispatch]);


  return { solutionDeleteLoading, deleteSolutions };
}