/**
 * I'm creating this reducer because I don't want to mess with the others
 * and the login info one doesn't have a structure that make sense to handle session store
 */
import produce from 'immer';

const scope = '[Segments]';

export const SET_SEGMENTS = `${scope} SET_SEGMENTS`;

const defaultState = [];

const segmentsReducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SEGMENTS: {
        return action.payload;
      }
      default:
        return draft;
    }
  });

export const changeSegments = segments => {
  return {
    type: SET_SEGMENTS,
    payload: segments,
  };
};

export default segmentsReducer;
