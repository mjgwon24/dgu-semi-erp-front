import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import memberReducer from './slices/memberSlice';

const store = configureStore({
    reducer: {
        user: userReducer, // user 슬라이스 등록
        members: memberReducer,
    },
});

export default store;
