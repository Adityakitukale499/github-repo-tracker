// sagas.js
import { call, put, takeLatest, all, select } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_REPOS_REQUEST,
  fetchReposSuccess,
  fetchReposFailure,
  fetchContributorsSuccess,
  fetchContributorsFailure,
  FETCH_CONTRIBUTORS_REQUEST,
  FETCH_TOTAL_CHANGES_REQUEST,
  fetchTotalChangesSuccess,
  fetchTotalChangesFailure,
} from "./actions";
import { formatDate } from "../utils/helper";

function* fetchReposSaga(action) {
  try {
    const page = action.payload;
    const minDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const formatedMinDate = formatDate(minDate);
    const response = yield call(
      axios.get,
      `https://api.github.com/search/repositories?q=created:%3E${formatedMinDate}&sort=stars&order=desc&page=${page}`,
    );
    yield put(fetchReposSuccess(response.data.items));
  } catch (error) {
    yield put(
      fetchReposFailure(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
}

function* fetchContributorsSaga(action) {
  const { owner, name } = action.payload;
  try {
    const response = yield call(
      axios.get,
      `https://api.github.com/repos/${owner}/${name}/stats/contributors`,
    );
    yield put(
      fetchContributorsSuccess(response.data?.[0] ? response.data : []),
    );
  } catch (error) {
    yield put(fetchContributorsFailure(error.response?.data?.message));
  }
}
const getSelectedValue = (state) => state.totalChanges.selectedValue;

function* fetchTotalChangesSaga(action) {
  const { owner, name } = action.payload;
  const selectedValue = yield select(getSelectedValue);
  const endpoint =
    selectedValue === "commit" ? "commit_activity" : "code_frequency";
  try {
    const response = yield call(
      axios.get,
      `https://api.github.com/repos/${owner}/${name}/stats/${endpoint}`,
    );
    yield put(
      fetchTotalChangesSuccess(response.data?.[0] ? response.data : []),
    );
  } catch (error) {
    yield put(fetchTotalChangesFailure(error?.response?.data?.message));
  }
}

function* watchFetchRepos() {
  yield takeLatest(FETCH_REPOS_REQUEST, fetchReposSaga);
}

function* watchFetchContributors() {
  yield takeLatest(FETCH_CONTRIBUTORS_REQUEST, fetchContributorsSaga);
}

function* watchFetchTotalChanges() {
  yield takeLatest(FETCH_TOTAL_CHANGES_REQUEST, fetchTotalChangesSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchRepos(),
    watchFetchContributors(),
    watchFetchTotalChanges(),
  ]);
}
