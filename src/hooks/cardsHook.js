import {useState} from "react";
import axiosApi from "../axiosApi.js";

export const useCreateCards = () => {
  const [card, setCard] = useState([]);
  const [cardLoading, setCardLoading] = useState(false);

  const createCards = async (cardMutation) => {
    setCardLoading(true);
    try {
      const { data: card } = await axiosApi.post('/cards/create_card', cardMutation);
      setCard(card);
    } catch (error) {
      console.error(error);
    } finally {
      setCardLoading(false);
    }
  };

  return { card, cardLoading, createCards };
}