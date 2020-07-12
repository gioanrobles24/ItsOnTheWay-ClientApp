/**
 * I'm creating this reducer because I don't want to mess with the others
 * and the login info one doesn't have a structure that make sense to handle session store
 */
import produce from 'immer';

const scope = '[Address]';

export const SET_ADDRESS = `${scope} SET ADDRESS`;
export const UNSET_ADDRESS = `${scope} UNSET ADDRESS`;

const defaultState = {
  addresses: [],
};

const addressReducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ADDRESS: {
        draft.addresses = action.payload;
        break;
      }
      case UNSET_ADDRESS: {
        draft.addresses = [];
      }
      default:
        return draft;
    }
  });

export const setAddresses = addresses => {
  return {
    type: SET_ADDRESS,
    payload: addresses,
  };
};

export const unsetAddresses = () => {
  return {
    type: UNSET_ADDRESS,
  };
};

export default addressReducer;
