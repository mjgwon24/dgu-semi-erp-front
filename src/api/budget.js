import axios from './axiosInstance';
// 유저 액세스 토큰 (수정 필요)
const token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYWNrZW5kIiwiYXVkIjpbImZyb250ZW5kIl0sInN1YiI6InJsYWRsZ3VzMTIzNCIsImlhdCI6MTc0MTg1OTIwMCwiZXhwIjoxNzYxOTYyODAwLCJqdGkiOiIxNWU3M2IzOS02M2I3LTQ0MTYtODUxMS0wODM5MDczMGJhOTMifQ.5KO7gU3tPiOrIzfr4_kB-UHbrWRG2Lz3j4hzn1Qob9w";

/**
 * 예산 계획 조회
 */
export async function fetchBudgetPlanInfo(
    page = 0,
    size = 8,
    executeType,
    clubName,
    content,
    drafter,
    expectedPaymentDate,
    paymentAmount,
    createdAt,
    status
) {
    const response = await axios.get(`/budget/plan`, {
        params: {
            page,
            size,
            ...(executeType ? { executeType } : {}),
            ...(clubName&&clubName!="전체" ? { clubName } : {}),
            ...(content ? { content } : {}),
            ...(drafter ? { drafter } : {}),
            ...(expectedPaymentDate?.to ? { expectedPaymentDateStart: expectedPaymentDate.to+"T00:00:00" } : {}),
            ...(expectedPaymentDate?.from ? { expectedPaymentDateEnd: expectedPaymentDate.from+"T00:00:00" } : {}),
            ...(paymentAmount?.from ? { paymentAmountMin: paymentAmount.from } : {}),
            ...(paymentAmount?.to ? { paymentAmountMax: paymentAmount.to } : {}),
            ...(createdAt?.to ? { createdAtStart: createdAt.to+"T00:00:00" } : {}),
            ...(createdAt?.from ? { createdAtEnd: createdAt.from+"T00:00:00" } : {}),
            ...(status ? { status: status=="대기"?"HOLD":status=="반려"?"REJECTED":status=="승인"?"ACCEPTED":"REVIEWED" } : {}),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
}

// 추후 개발 필요
export async function fetchBudgetUsageInfo(page = 0, size = 8) {
    const response = await axios.get(`/budget/usage`, {
        params: { page, size }
    });
    return response.data;
}


// 추후 개발 필요
export async function fetchBudgetReportInfo(page = 0, size = 8) {
    const response = await axios.get(`/budget/report`, {
        params: { page, size }
    });
    return response.data;
}