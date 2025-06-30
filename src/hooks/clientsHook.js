import {useState} from "react";
import axiosApi from "../axiosApi.js";

export const useFetchClient = () => {
  const [client, setClient] = useState([]);
  const [clientLoading, setClientLoading] = useState(false);

  const fetchClient = async (number) => {
    setClientLoading(true);
    try {
      const { data: client } = await axiosApi.get(`/hydra_seeker/${number}`);
      setClient(client);
    } catch (error) {
      console.error(error);
    } finally {
      setClientLoading(false);
    }
  };

  const resetClient = async () => {
    setClient([]);
  };

  return { client, clientLoading, fetchClient, resetClient };
}
