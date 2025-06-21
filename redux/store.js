import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import memberReducer from './slices/memberSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        user: userReducer, // user 슬라이스 등록
        members: memberReducer,
        auth: authReducer, // auth 슬라이스 등록
    },
});

export default store;
