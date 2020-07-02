import * as Types from '../types';

const initialState = {
  isLoading: false,
  error: null,
  product: null,
};

const productDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_PRODUCT_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case Types.LOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        product: payload,
      };

    default:
      return state;
  }
};

export default productDetailsReducer;
