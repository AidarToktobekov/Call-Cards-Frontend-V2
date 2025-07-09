import {useAppDispatch} from "./app/hooks.js";
import {useCallback, useState} from "react";
import axiosApi from "./axiosApi.js";
import {addSnackbar} from "./features/notifications/notificationsSlice.js";

export const useFetchFilterData = () => {
  const dispatch = useAppDispatch();
  const [reasons, setReasons] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [users, setUsers] = useState([]);
  const [reasonsLoading, setReasonsLoading] = useState(false);
  const [solutionsLoading, setSolutionsLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [filteredSolutionsLoading, setFilteredSolutionsLoading] = useState(false);

  const handleFilterSolution = useCallback((value) =>{
    setFilteredSolutionsLoading(true);
    const newFilteredSolutions = [];

    solutions.map(solution => {
      value.map(reason => {
        if (reason.id === solution.reason.id){
          newFilteredSolutions.push(solution);
        }
      })
    });
    setFilteredSolutions(newFilteredSolutions);
    setFilteredSolutionsLoading(true);
  }, [solutions]);

  const fetchFilterData = useCallback(async () => {
    try {
      setReasonsLoading(true);
      setSolutionsLoading(true);
      setUsersLoading(true);

      const reasonsResponse = await axiosApi('/actions_tree/reasons');
      setReasonsLoading(false);
      setReasons(reasonsResponse.data);

      const solutionsResponse = await axiosApi('/actions_tree/solutions');
      setSolutionsLoading(false);
      setSolutions(solutionsResponse.data);

      const employeesResponse = await axiosApi('/users');
      setUsersLoading(false);
      setUsers(employeesResponse.data);
    } catch (e) {
      dispatch(addSnackbar({ type: 'error', message: e.data?.response?.error || e.data?.response?.message || e?.error || e?.message }));
      setReasonsLoading(false);
      setSolutionsLoading(false);
      setUsersLoading(false);
    }
  }, [dispatch]);

  return {
    reasons,
    solutions,
    users,
    reasonsLoading,
    solutionsLoading,
    usersLoading,
    fetchFilterData,
    handleFilterSolution,
    filteredSolutions,
    filteredSolutionsLoading
  };
};
