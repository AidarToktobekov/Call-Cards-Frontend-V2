import {addSnackbar} from "../../features/notifications/notificationsSlice.js";
import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.js";
import axiosApi from "../../axiosApi.js";

export const useCreateCards = () => {
  const [cardLoading, setCardLoading] = useState(false);
  const dispatch = useAppDispatch();

  const createCards = async (cardMutation) => {
    setCardLoading(true);
    try {
      const card = await axiosApi.post('/cards/create_card', cardMutation);
      if (card.status === 200) {
        dispatch(addSnackbar({
          type: "success",
          message: "Карточка успешно создана!",
        }))
        if(card.data?.setCreditRes?.error){
          dispatch(addSnackbar({
            type: "error",
            message: card.data?.setCreditRes?.error,
          }))
        }
      }
      return card;
    } catch (error) {
      dispatch(addSnackbar({
        type: "error",
        message: error?.response?.data?.error || "Произошла ошибка при создании карточки",
      }))
      console.error(error);
    } finally {
      setCardLoading(false);
    }
  };

  return { cardLoading, createCards };
}