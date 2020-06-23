/**
 * I'm creating this reducer because I don't want to mess with the others
 * and the login info one doesn't have a structure that make sense to handle session store
 */
import produce from 'immer';

const scope = '[Dollar Price]';

export const SET_PRICE = `${scope} SET PRICE`;

const defaultState = {
  price: 0,
};

const dollarPriceReducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRICE: {
        draft.price = action.payload;
        break;
      }
      default:
        return draft;
    }
  });

export const changeDollarPrice = price => {
  return {
    type: SET_PRICE,
    payload: price,
  };
};

export default dollarPriceReducer;
