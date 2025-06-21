import axios from "axios";
import store from "@/redux/store";
import { setAccessToken, clearAccessToken } from "@/redux/slices/authSlice";

const api = axios.create({
    baseURL: "http://localhost:8081",
    withCredentials: true,
});

// 요청 시 accessToken을 Redux에서 꺼내서 Authorization 헤더에 자동 설정
api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.accessToken;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 오류 시 자동으로 refreshToken으로 accessToken 갱신 시도
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await api.post("/auth/refreshToken");
                const newAccessToken = res.data.accessToken;

                // Redux에 새 accessToken 저장
                store.dispatch(setAccessToken(newAccessToken));

                // Axios 기본 헤더 및 재요청 헤더에 토큰 설정
                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error("리프레시 토큰 갱신 실패:", refreshError);
                store.dispatch(clearAccessToken());
                window.location.href = "/signIn"; // 자동 로그아웃 처리
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
