import { 
  FETCH_BADGES_SUCCESS, 
  FETCH_BADGES_FAIL, 
  FETCH_USER_BADGES_SUCCESS, 
  FETCH_USER_BADGES_FAIL, 
  AWARD_BADGE_SUCCESS, 
  AWARD_BADGE_FAIL 
} from '../types';

const initialState = {
  badges: [],
  userBadges: [],
  loading: true,
  error: {},
};

// Reducer to handle gamification state
export default function gamificationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_BADGES_SUCCESS:
      // When badges are successfully fetched, update the state
      return {
        ...state,
        badges: payload,
        loading: false,
      };

    case FETCH_BADGES_FAIL:
      // If fetching badges fails, update the error in the state
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case FETCH_USER_BADGES_SUCCESS:
      // When user badges are successfully fetched, update the state
      return {
        ...state,
        userBadges: payload,
        loading: false,
      };

    case FETCH_USER_BADGES_FAIL:
      // If fetching user badges fails, update the error in the state
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case AWARD_BADGE_SUCCESS:
      // When a badge is successfully awarded, update the user badges in the state
      return {
        ...state,
        userBadges: [...state.userBadges, payload],
        loading: false,
      };

    case AWARD_BADGE_FAIL:
      // If awarding a badge fails, update the error in the state
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
