import axios from './axiosInstance';

// 유저 액세스 토큰 (수정 필요)
const token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYWNrZW5kIiwiYXVkIjpbImZyb250ZW5kIl0sInN1YiI6InJsYWRsZ3VzMTIzNCIsImlhdCI6MTc0MTg1OTIwMCwiZXhwIjoxNzYxOTYyODAwLCJqdGkiOiIxNWU3M2IzOS02M2I3LTQ0MTYtODUxMS0wODM5MDczMGJhOTMifQ.5KO7gU3tPiOrIzfr4_kB-UHbrWRG2Lz3j4hzn1Qob9w";

/**
 * 유저 소속 전체 동아리 조회
 */
export async function fetchAllClubs() {
    const response = await axios.get(`/user/me/club/all`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
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
 export async function fetchUserClubs(
    page = 0,
    size = 8,
    currentPeopleMin = 0,
    currentPeopleMax= 5000000,
    totalPeopleMin = 0,
    totalPeopleMax = 5000000,
    clubName,
    status
) {
    let url = '/user/me/club?page=' + page + '&size=' + size;
    url += `&currentPeopleMin=${currentPeopleMin}`;
    url += `&currentPeopleMax=${currentPeopleMax}`;
    url += `&totalPeopleMin=${totalPeopleMin}`;
    url += `&totalPeopleMax=${totalPeopleMax}`;
    if(clubName !== "전체" && clubName !== undefined)
        url += `&clubName=${clubName}`;
    if(status === "대기")
        url += `&status=SUSPENDED`;
    else if(status === "활동중지")
        url += `&status=INACTIVE`;
    else if(status === "활동중")
        url += `&status=ACTIVE`;
    const response = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
}

/**
 * 동아리 부원 조회
 * @param clubId 동아리 ID
 * @param page 페이지 번호 (기본값: 0)
 * @param size 페이지 크기 (기본값: 8)
 */
 export async function fetchClubMembers(clubId, page = 0, size = 8) {
    const response = await axios.get('/club/member', {
        params: { clubId, page, size },
        headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
    });
    return response.data;
}
