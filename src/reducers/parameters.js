/**
 * I'm creating this reducer because I don't want to mess with the others
 * and the login info one doesn't have a structure that make sense to handle session store
 */
import produce from 'immer';

const scope = '[Dollar Price]';

export const SET_PRICE = `${scope} SET PRICE`;
export const SET_PERCENTAGE = `${scope} SET PERCENTAGE`;

const defaultState = {
  dollarPrice: 0,
  usagePercentage: 0,
};

const parametersReducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRICE: {
        draft.dollarPrice = action.payload;
        break;
      }
      case SET_PERCENTAGE: {
        draft.usagePercentage = action.payload;
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
export const changeUsagePercentage = percentage => {
  return {
    type: SET_PERCENTAGE,
    payload: percentage,
  };
};

export default parametersReducer;
