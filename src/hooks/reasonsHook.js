import {useState} from "react";
import axiosApi from "../axiosApi.js";

export const useFetchReasons = () => {
  const [reasons, setReasons] = useState([]);
  const [reasonsLoading, setReasonsLoading] = useState(false);

  const fetchReasons = async () => {
    setReasonsLoading(true);
    try {
      const { data: reasons } = await axiosApi.get('actions_tree/reasons');
      setReasons(reasons);
    } catch (error) {
      console.error(error);
    } finally {
      setReasonsLoading(false);
    }
  };

  return { reasons, reasonsLoading, fetchReasons };
}