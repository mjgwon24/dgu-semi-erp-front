import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 멤버 리스트 조회
export const fetchMembers = createAsyncThunk("members/fetchMembers", async (clubName) => {
    const response = await axios.get(`/api/members`, { params: { clubName } });
    return response.data;
});

// 멤버 추가
export const addMember = createAsyncThunk("members/addMember", async (memberData) => {
    const response = await axios.post(`/api/members`, memberData);
    return response.data;
});

const memberSlice = createSlice({
    name: "members",
    initialState: {
        members: [], // 멤버 리스트
        loading: false, // 로딩 상태
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.loading = true; // 데이터를 불러오는 중
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.members = action.payload; // API에서 가져온 멤버 리스트 저장
                state.loading = false; // 로딩 완료
            })
            .addCase(addMember.fulfilled, (state, action) => {
                state.members.push(action.payload); // 추가된 멤버를 리스트에 추가
            });
    },
});

export default memberSlice.reducer;
