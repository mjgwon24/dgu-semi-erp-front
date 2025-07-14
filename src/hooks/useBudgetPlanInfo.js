import { useQuery } from "@tanstack/react-query";
import {fetchBudgetPlanInfo, fetchBudgetUsageInfo, fetchBudgetReportInfo} from "../api/budget";

/**
 * 예산 계획 상세 조회
 * @param page 페이지 번호 (기본값: 0)
 * @param size 페이지 크기 (기본값: 8)
 * @param executeType 집행 유형
 * @param clubName 동아리명
 * @param paymentDate 결제 예정일
 * @param status 상태
 * @param content 내용
 * @param draftDate 기안일
 * @param drafter 기안자
 * @param amount 금액
 */
export function useBudgetPlanInfo(page = 0, size = 8, executeType, clubName, paymentDate, status, content, draftDate, drafter, amount) {
    return useQuery({
        queryKey: ["budgetPlanInfo", page, size, executeType, clubName, paymentDate, status, content, draftDate, drafter, amount],
        queryFn: () => fetchBudgetPlanInfo(page, size, executeType, clubName, content, drafter, paymentDate, amount, draftDate, status)
    });
}

/**
 * 예산 사용 내역 상세 조회(추후 개발 예정)
 */
export function useBudgetUsageInfo(page = 0, size = 8) {
    return useQuery({
        queryKey: ["budgetUsageInfo", page, size],
        queryFn: () => fetchBudgetUsageInfo(page, size),
    });
}

/**
 * 예산 보고서 상세 조회(추후 개발 예정)
 */
 export function useBudgetReportInfo(page = 0, size = 8) {
    return useQuery({
        queryKey: ["budgetReportInfo", page, size],
        queryFn: () => fetchBudgetReportInfo(page, size),
    });
}