import {
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
  FETCH_CONTRIBUTORS_REQUEST,
  FETCH_CONTRIBUTORS_SUCCESS,
  FETCH_CONTRIBUTORS_FAILURE,
  FETCH_TOTAL_CHANGES_REQUEST,
  FETCH_TOTAL_CHANGES_SUCCESS,
  FETCH_TOTAL_CHANGES_FAILURE,
  SET_SELECTED_VALUE,
} from "./actions";

const initialState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    case FETCH_REPOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialContributorState = {
  data: [],
  loading: false,
  error: null,
};

export const contributorReducer = (state = initialContributorState, action) => {
  switch (action.type) {
    case FETCH_CONTRIBUTORS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CONTRIBUTORS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_CONTRIBUTORS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialTotalChangesState = {
  data: [],
  loading: false,
  error: null,
  selectedValue: "commit",
};

export const totalChangesReducer = (
  state = initialTotalChangesState,
  action,
) => {
  switch (action.type) {
    case FETCH_TOTAL_CHANGES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TOTAL_CHANGES_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_TOTAL_CHANGES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_SELECTED_VALUE:
      return { ...state, selectedValue: action.payload };
    default:
      return state;
  }
};
