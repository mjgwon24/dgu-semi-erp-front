import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '관리자', // 초기값 설정
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload; // 사용자 이름 업데이트
        },
    },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
