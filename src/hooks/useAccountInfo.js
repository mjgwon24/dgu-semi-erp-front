import { useQuery } from "@tanstack/react-query";
import {fetchAccountClubs, fetchAccountInfo} from "../api/account";

/**
 * 통장 정보 상세 조회
 * @param clubId 동아리 ID
 * @param page 페이지 번호 (기본값: 0)
 * @param size 페이지 크기 (기본값: 8)
 */
export function useAccountInfo(clubId, page = 0, size = 8) {
    return useQuery({
        queryKey: ["accountInfo", clubId, page, size],
        queryFn: () => fetchAccountInfo(clubId, page, size),
        enabled: !!clubId,
    });
}

/**
 * 통장 보유 동아리 목록 조회
 */
export function useAccountClubs(page = 0, size = 8) {
    return useQuery({
        queryKey: ["accountClubs", page, size],
        queryFn: () => fetchAccountClubs(page, size),
    });
}