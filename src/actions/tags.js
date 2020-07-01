import axios from 'axios';
import {
  ADD_TAG,
  ADD_TAGS,
  ADD_TAGS_REQUEST,
  SET_TAGS_LOADING,
  RESET_TAGS,
  TAGS_API,
} from '../constants/tags';
import { addErrors } from './notifications';

export const getTags = (query) => {
  return (dispatch) => {
    dispatch(loadingTags());
    return axios
      .get(TAGS_API, {
        params: query,
      })
      .then((response) => {
        dispatch(addTagsList(response.data.nodes));
        dispatch(
          addTagsRequest({
            data: response.data.nodes.map((item) => item.id),
            query: query,
            total: response.data.total,
          }),
        );
        dispatch(stopTagsLoading());
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(addErrors(error.message));
      });
  };
};

export const getTag = (id) => {
  return (dispatch) => {
    dispatch(loadingTags());
    return axios
      .get(TAGS_API + '/' + id)
      .then((response) => {
        dispatch(getTagByID(response.data));
        dispatch(stopTagsLoading());
      })
      .catch((error) => {
        dispatch(addErrors(error.message));
      });
  };
};

export const addTag = (data) => {
  return (dispatch) => {
    dispatch(loadingTags());
    return axios
      .post(TAGS_API, data)
      .then(() => {
        dispatch(resetTags());
      })
      .catch((error) => {
        dispatch(addErrors(error.message));
      });
  };
};

export const updateTag = (data) => {
  return (dispatch) => {
    dispatch(loadingTags());
    return axios
      .put(TAGS_API + '/' + data.id, data)
      .then((response) => {
        dispatch(getTagByID(response.data));
        dispatch(stopTagsLoading());
      })
      .catch((error) => {
        dispatch(addErrors(error.message));
      });
  };
};

export const deleteTag = (id) => {
  return (dispatch) => {
    dispatch(loadingTags());
    return axios
      .delete(TAGS_API + '/' + id)
      .then(() => {
        dispatch(resetTags());
      })
      .catch((error) => {
        dispatch(addErrors(error.message));
      });
  };
};

export const addTags = (tags) => {
  return (dispatch) => {
    return dispatch(addTagsList(tags));
  };
};

const loadingTags = () => ({
  type: SET_TAGS_LOADING,
  payload: true,
});

const stopTagsLoading = () => ({
  type: SET_TAGS_LOADING,
  payload: false,
});

const getTagByID = (data) => ({
  type: ADD_TAG,
  payload: {
    ...data,
  },
});

const addTagsList = (data) => ({
  type: ADD_TAGS,
  payload: { data },
});

const addTagsRequest = (data) => ({
  type: ADD_TAGS_REQUEST,
  payload: {
    ...data,
  },
});

const resetTags = () => ({
  type: RESET_TAGS,
});
