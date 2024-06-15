export const FETCH_REPOS_REQUEST = "FETCH_REPOS_REQUEST";
export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";
export const FETCH_CONTRIBUTORS_REQUEST = "FETCH_CONTRIBUTORS_REQUEST";
export const FETCH_CONTRIBUTORS_SUCCESS = "FETCH_CONTRIBUTORS_SUCCESS";
export const FETCH_CONTRIBUTORS_FAILURE = "FETCH_CONTRIBUTORS_FAILURE";
export const FETCH_TOTAL_CHANGES_REQUEST = "FETCH_TOTAL_CHANGES_REQUEST";
export const FETCH_TOTAL_CHANGES_SUCCESS = "FETCH_TOTAL_CHANGES_SUCCESS";
export const FETCH_TOTAL_CHANGES_FAILURE = "FETCH_TOTAL_CHANGES_FAILURE";
export const SET_SELECTED_VALUE = "SET_SELECTED_VALUE";

export const fetchReposRequest = (page) => ({
  type: FETCH_REPOS_REQUEST,
  payload: page,
});

export const fetchReposSuccess = (repos) => ({
  type: FETCH_REPOS_SUCCESS,
  payload: repos,
});

export const fetchReposFailure = (error) => ({
  type: FETCH_REPOS_FAILURE,
  payload: error,
});

export const fetchContributorsRequest = (owner, name) => ({
  type: FETCH_CONTRIBUTORS_REQUEST,
  payload: { owner, name },
});

export const fetchContributorsSuccess = (data) => ({
  type: FETCH_CONTRIBUTORS_SUCCESS,
  payload: data,
});

export const fetchContributorsFailure = (error) => ({
  type: FETCH_CONTRIBUTORS_FAILURE,
  payload: error,
});


export const fetchTotalChangesRequest = (owner, name, selectedValue) => ({
  type: FETCH_TOTAL_CHANGES_REQUEST,
  payload: { owner, name, selectedValue },
});

export const fetchTotalChangesSuccess = (data) => ({
  type: FETCH_TOTAL_CHANGES_SUCCESS,
  payload: data,
});

export const fetchTotalChangesFailure = (error) => ({
  type: FETCH_TOTAL_CHANGES_FAILURE,
  payload: error,
});

export const setSelectedValue = (value) => ({
  type: SET_SELECTED_VALUE,
  payload: value,
});
