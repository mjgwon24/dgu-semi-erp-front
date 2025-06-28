import { useQuery } from "@tanstack/react-query";
import {fetchAllClubs, fetchUserClubs, fetchClubMembers} from "../api/club";

/**
 * 유저 소속 전체 동아리 조회
 */
export function useAllClubs() {
    return useQuery({
        queryKey: ["allClubs"],
        queryFn: () => fetchAllClubs(),
    });
}

/**
 * 유저 소속 동아리 조회
 * @param page 페이지 번호 (기본값: 0)
 * @param size 페이지 크기 (기본값: 8)
 * @param currentPeopleMin 현재 인원 최소값
 * @param currentPeopleMax 현재 인원 최대값
 * @param totalPeopleMin 전체 인원 최소값
 * @param totalPeopleMax 전체 인원 최대값
 * @param clubName 동아리명
 * @param status 동아리 상태값
 */
export function useUserClubs(
    page = 0, 
    size = 8, 
    currentPeopleMin, 
    currentPeopleMax, 
    totalPeopleMin, 
    totalPeopleMax,
    clubName,
    status) {
    return useQuery({
        queryKey: ["userClubs", page, size, currentPeopleMin, currentPeopleMax, totalPeopleMin, totalPeopleMax, clubName, status],
        queryFn: () => fetchUserClubs(page, size, currentPeopleMin, currentPeopleMax, totalPeopleMin, totalPeopleMax, clubName, status),
    });
}

/**
 * 동아리 부원 조회
 * @param clubId 동아리 ID
 * @param page 페이지 번호 (기본값: 0)
 * @param size 페이지 크기 (기본값: 8)
 */
export function useClubMembers(clubId, page = 0, size = 8) {
    return useQuery({
        queryKey: ["clubMembers", clubId, page, size],
        queryFn: () => fetchClubMembers(clubId, page, size),
        enabled: !!clubId,
    });
}
