/**
 * I'm creating this reducer because I don't want to mess with the others
 * and the login info one doesn't have a structure that make sense to handle session store
 */
import produce from 'immer';

const scope = '[Partner]';

export const SET_PARTNER = `${scope} SET PARTNER`;
export const SET_PARTNER_SEGMENT = `${scope} SET PARTNER SEGMENT`;
export const RESET_PARTNER = `${scope} RESET PARTNER`;

const defaultState = {
  selectedPartner: {},
  selectedSegment: null,
};

const partnerReducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PARTNER: {
        draft.selectedPartner = action.payload;
        break;
      }
      case SET_PARTNER_SEGMENT: {
        draft.selectedSegment = action.payload;
        break;
      }
      case RESET_PARTNER: {
        return defaultState;
      }
      default:
        return draft;
    }
  });

export const changePartner = partner => {
  return {
    type: SET_PARTNER,
    payload: partner,
  };
};
export const changePartnerSegment = segmentId => {
  return {
    type: SET_PARTNER_SEGMENT,
    payload: segmentId,
  };
};

export const resetPartner = () => {
  return {
    type: RESET_PARTNER,
  };
};
export default partnerReducer;
