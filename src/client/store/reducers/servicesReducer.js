import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  isLoading: false,
  error: null,
  services: [],
  hasMoreItems: true,
};

const servicesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_SERVICES_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_SERVICES_ERROR:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: false,
        error: payload,
      };
    case Types.LOAD_SERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: payload.length > config.pageSize,
        error: null,
        services: payload,
      };

    default:
      return state;
  }
};

export default servicesReducer;
