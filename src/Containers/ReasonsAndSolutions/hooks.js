import {useCallback, useState} from "react";
import {useAppDispatch} from "../../app/hooks.js";
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";
import axiosApi from "../../axiosApi.js";

export const useFetchReasonAndSolution = ()=>{
  const [ reasons, setReasons ] = useState([]);
  const [ solutions, setSolutions ] = useState([]);
  const [ reasonsLoading, setReasonsLoading ] = useState(false);
  const [ solutionsLoading, setSolutionsLoading ] = useState(false);
  const [ reasonsCreateLoading, setReasonsCreateLoading ] = useState(false);
  const [ reasonsDeleteLoading, setReasonsDeleteLoading ] = useState(false);
  const [ solutionsDeleteLoading, setSolutionsDeleteLoading ] = useState(false);
  const [ solutionsCreateLoading, setSolutionsCreateLoading ] = useState(false);
  const dispatch = useAppDispatch();

  const fetchReasons = useCallback(async () => {
    setReasonsLoading(true);
    try{
      const { data: reasons } = await axiosApi.get('actions_tree/reasons');

      setReasons(reasons);
    }catch (e){
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    }
    finally{
      setReasonsLoading(false);
    }
  }, [dispatch]);

  const fetchSolutions = useCallback(async () => {
    setSolutionsLoading(true);
    try{
      const { data: solutions } = await axiosApi.get('actions_tree/solutions');

      setSolutions(solutions);
    }catch (e){
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    }
    finally{
      setSolutionsLoading(false);
    }
  }, [dispatch]);

  const createReason = useCallback(async (reasonMutation) => {
    setReasonsCreateLoading(true);
    try {
      await axiosApi.post(
        '/actions_tree/create_reason',
        reasonMutation
      );

      dispatch(addSnackbar({ type: 'success', message: "Создана новая причина!" }));
    }catch (e){
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    }finally {
      setReasonsCreateLoading(false);
    }
  }, [dispatch])

  const deleteReason = useCallback(async (id) => {
    setReasonsDeleteLoading(true);
    try {
      await axiosApi.delete(
        `/actions_tree/reasons/${id}`
      );

      dispatch(addSnackbar({ type: 'success', message: "Причина удалена!" }));
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    }finally {
      setReasonsDeleteLoading(false);
    }
  },[dispatch]);

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

  const createSolution = useCallback(async (solutionMutation) => {
    setSolutionsCreateLoading(true);
    try {
      await axiosApi.post(
        '/actions_tree/create_solution',
        solutionMutation
      );

      dispatch(addSnackbar({ type: 'success', message: "Создано новое решение!" }));
    }catch (e){
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
    }finally {
      setSolutionsCreateLoading(false);
    }
  }, [dispatch])

  return {
    reasons,
    solutions,
    reasonsLoading,
    solutionsLoading,
    reasonsCreateLoading,
    reasonsDeleteLoading,
    solutionsDeleteLoading,
    solutionsCreateLoading,
    fetchReasons,
    fetchSolutions,
    createReason,
    deleteReason,
    deleteSolutions,
    createSolution,
  };
}