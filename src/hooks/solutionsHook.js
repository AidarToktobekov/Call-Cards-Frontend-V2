import {useState} from "react";
import axiosApi from "../axiosApi.js";

export const useFetchSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [solutionsLoading, setSolutionsLoading] = useState(false);

  const fetchSolutions = async () => {
    setSolutionsLoading(true);
    try {
      const { data: solutions } = await axiosApi.get('actions_tree/solutions');
      setSolutions(solutions);
    } catch (error) {
      console.error(error);
    } finally {
      setSolutionsLoading(false);
    }
  };

  return { solutions, solutionsLoading, fetchSolutions };
}