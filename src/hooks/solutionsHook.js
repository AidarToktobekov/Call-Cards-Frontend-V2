import {useCallback, useState} from "react";
import axiosApi from "../axiosApi.js";
import {addSnackbar} from "../features/notifications/notificationsSlice.js";
import {useAppDispatch} from "../app/hooks.js";

export const useFetchSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [solutionsLoading, setSolutionsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchSolutions = useCallback(async () => {
    setSolutionsLoading(true);
    try {
      const { data: solutions } = await axiosApi.get('actions_tree/solutions');
      setSolutions(solutions);
    } catch (error) {
      dispatch(addSnackbar({
        type: "error",
        message: error?.error,
      }))
      console.error(error);
      console.error(error);
    } finally {
      setSolutionsLoading(false);
    }
  }, [dispatch]);

  return { solutions, solutionsLoading, fetchSolutions };
}