import { TYPES } from "../../lib/types/action.types";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case TYPES.newMessage:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case TYPES.resetMessages:
      return {
        ...state,
        messages: [],
      };

    default:
      state;
  }
};
