import * as Types from '../types';
import { showToast } from './toast';
import axios from 'axios';

import { apiConfig } from '../../services/api';
export const loadServicesInit = () => ({
  type: Types.LOAD_SERVICES_INIT,
});

export const loadServicesError = (error) => (dispatch, getState) => {
  dispatch(showToast({ title: 'Error', text: error }));
  dispatch({ type: Types.LOAD_SERVICES_ERROR, payload: error });
};

export const loadServicesSuccess = (data) => ({
  type: Types.LOAD_SERVICES_SUCCESS,
  payload: data,
});

const errorHandler = (successfn, errorAction, dispatch) => {
  return async (...args) => {
    try {
      await successfn(...args);
    } catch (error) {
      if (error.message) {
        dispatch(errorAction(args[1], error.message));
      }
    }
  };
};

export const loadServices = (params, isLoadMoreRequest, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadServicesInit());

  errorHandler(
    async (params, isLoadMoreRequest, callback) => {
      const baseUrl = `${apiConfig.base}${apiConfig.services.url}`;
      const response = await axios.get(baseUrl);
      dispatch(loadServicesSuccess(response.data));
      if (callback) callback();
    },
    loadServicesError,
    dispatch,
  )(params, isLoadMoreRequest, callback);
};
