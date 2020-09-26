import studentsReducer from './studentsReducer';
import staffsReducer from './staffsReducer';
import pageDetailsReducer from './pageDetailsReducer';
import articlesReducer from './articlesReducer';
import articleDetailsReducer from './articleDetailsReducer';
import sessionReducer from './sessionReducer';
import servicesReducer from './servicesReducer';
import headerReducer from './headerReducer';
import likedReducer from './likedReducer';
import cartReducer from './cartReducer';
import productDetailsReducer from './productDetailsReducer';
import toastReducer from './toastReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  studentsReducer,
  staffsReducer,
  pageDetailsReducer,
  articlesReducer,
  articleDetailsReducer,
  sessionReducer,
  servicesReducer,
  headerReducer,
  likedReducer,
  cartReducer,
  productDetailsReducer,
  toastReducer,
  authReducer,
});

export default rootReducer;
