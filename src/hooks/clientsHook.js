import {useState} from "react";
import axiosApi from "../axiosApi.js";

export const useFetchClient = () => {
  const [client, setClient] = useState([{
    account_id: 'dadwadaw',
    call_from: 'dadawdaw',
    comment: 'dadawdaw',
    created_at: '2321312',
    full_name: 'Айдар',
    id: '23131',
    ip_address: 'dawdawdaw',
    ip_olt: 'dawdadaw',
    mac_address: 'dawdaw',
    mac_onu: 'dadawdaw',
    n_result_id: 'dadawdaw',
    address: 'dadawdawd',
    ls_abon: 'dawdawdawd',
    phone_number: ["dadwa", 'dadwada', 'adawdawd'],
    sip: '2132'
  }]);
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
