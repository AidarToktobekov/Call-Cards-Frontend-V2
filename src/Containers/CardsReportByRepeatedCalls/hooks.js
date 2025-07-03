import { useCallback, useState } from 'react';
import axiosApi from '../../axiosApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';
import dayjs from 'dayjs';

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
      dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
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

export const useFetchCards = () => {
  const dispatch = useAppDispatch();
  const [repeatedCalls, setRepeatedCalls] = useState(null);
  const [repeatedCallsLoading, setRepeatedCallsLoading] = useState(false);
  const [filtersState, setFiltersState] = useState({
    start_date: dayjs().startOf('month'),
    end_date: dayjs().endOf('month')
  });
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (_, value = 1) => {
    if (repeatedCallsLoading) return;
    setCurrentPage(value);
    void fetchCards({ ...filtersState, searchWord, currentPage: value });
  };

  const handleFilterChange = (name, value) =>
    setFiltersState(prevState => ({ ...prevState, [name]: value }));

  const handleSearchWordChange = e => {
    setSearchWord(e.target.value);
  };

  const onSearchSubmit = () => {
    if (repeatedCallsLoading) return;
    setCurrentPage(1);
    void fetchCards({ ...filtersState, searchWord });
  };

  const fetchCards = useCallback(
    async filtersState => {
      try {
        setRepeatedCallsLoading(true);
        const params = {
          start_date: filtersState?.start_date?.format('YYYY-MM-DD'),
          end_date: filtersState?.end_date
            ? filtersState.end_date.add(1, 'day').format('YYYY-MM-DD')
            : filtersState?.end_date,
          reason: (filtersState?.reasons || []).map(reason => reason?.id),
          solution: (filtersState?.solutions || []).map(
            solution => solution?.id
          ),
          ls_abon: filtersState?.searchWord || '',
          page: filtersState?.currentPage || 1,
          page_size: 100
        };
        const response = await axiosApi(`/cards/repeated_calls`, {params});
        setRepeatedCalls(response.data);
      } catch (e) {
        dispatch(addSnackbar({ type: 'error', message: e.error || e.message }));
      } finally {
        setRepeatedCallsLoading(false);
      }
    },
    [dispatch]
  );

  return {
    repeatedCalls,
    searchWord,
    repeatedCallsLoading,
    filtersState,
    handlePageChange,
    currentPage,
    handleSearchWordChange,
    handleFilterChange,
    onSearchSubmit
  };
};
