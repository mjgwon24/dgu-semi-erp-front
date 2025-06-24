import axios from './axiosInstance';

/**
 * 통장 정보 상세 조회
 */
export async function fetchAccountInfo(clubId, page = 0, size = 8) {
    const response = await axios.get(`/account/${clubId}`, {
        params: { page, size }
    });
    return response.data;
}

/**
 * 통장 개설
 */
export async function createAccount(data) {
    const response = await axios.post('/account/protected', data);
    return response.data;
}

/**
 * 통장을 보유한 동아리 목록 조회
 */
export async function fetchAccountClubs(page = 0, size = 8) {
    const response = await axios.get('/account/clubs', {
        params: { page, size }
    });
    return response.data;
}

/**
 * 통장 정보 변경
 */
export async function updateAccount(accountId, data) {
    const response = await axios.put(`/account/${accountId}`, data);
    return response.data;
}

/**
 * 통장 삭제 (소프트 삭제)
 */
export async function deleteAccount(accountId) {
    const response = await axios.delete(`/account/${accountId}`);
    return response.data;
}
