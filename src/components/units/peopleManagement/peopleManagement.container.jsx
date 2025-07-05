import PeopleManagementUI from "./peopleManagement.presenter";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useUserClubs, useClubMembers, useAllClubs } from "@/src/hooks/useClubInfo";

dayjs.locale("zh-cn");

/** 동아리 목록 데이터 가공 */
function mapClubsToDataSource(clubs, currentPage, pageSize = 8) {
  if (!Array.isArray(clubs)) return [];
  return clubs.map((club, index) => ({
    No: (currentPage - 1) * pageSize + index + 1,
    crew: club.name || "",
    currentPeople: club.clubMembers?.filter((m) => m.status === "ACTIVE").length || 0,
    totalPeople: club.clubMembers?.length || 0,
    status: club.status === "ACTIVE" ? "활동중" : "활동중지",
    origin: club,
  }));
}

/** 동아리 멤버 데이터 가공 */
function mapMembersToDataSource(members, currentPage2, pageSize = 8) {
  if (!Array.isArray(members)) return [];
  return members.map((m, index) => ({
    No: (currentPage2 - 1) * pageSize + index + 1,
    person: m.name || "",
    crew: m.major || "",
    grade: String(m.studentNumber || ""),
    how:
      m.role === "LEADER"
        ? "회장"
        : m.role === "MEMBER"
        ? "부원"
        : m.role === "VICE_LEADER"
        ? "부회장"
        : "총무",
    date: m.joinedAt ? m.joinedAt.split("T")[0] : "",
    status: m.status === "ACTIVE" ? "활동중" : "수료",
    origin: m,
  }));
}

export default function PeopleManagementPage() {
  const permission1 = "notadmin";
  const permission2 = "notadmin";

  /** 선택 & 페이징 상태 */
  const [selected, setSelected] = useState(-1);
  const [selected2, setSelected2] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  /** 검색 조건 상태 */
  const [conditions, setConditions] = useState({
    clubName: "전체",
    status: "전체",
    currentPeoples: { from: 0, to: 5000000 },
    totalPeoples: { from: 0, to: 5000000 },
  });

  const { data: allClubsData, isLoading: isAllClubsLoading } = useAllClubs();
  const allClubs = allClubsData?.content || [];

  /** 동아리 목록 가져오기 */
  const { data: clubsData, isLoading: isClubsLoading } = useUserClubs(
    currentPage - 1,
    8, 
    conditions.currentPeoples.from, 
    conditions.currentPeoples.to,
    conditions.totalPeoples.from,
    conditions.totalPeoples.to,
    conditions.clubName,
    conditions.status);
  const clubs = clubsData?.content || [];
  const clubsPaginationInfo = clubsData?.paginationInfo || { totalElements: 0, totalPages: 1 };
  const dataSource = mapClubsToDataSource(clubs, currentPage);

  /** 선택된 동아리 ID */
  const selectedClub = dataSource[selected]?.origin;
  const clubId = selectedClub?.id;

  /** 선택된 동아리의 멤버 가져오기 */
  const { data: membersData, isLoading: isMembersLoading } = useClubMembers(clubId, currentPage2 - 1, 8);
  const members = membersData?.content || [];
  const membersPaginationInfo = membersData?.paginationInfo || { totalElements: 0, totalPages: 1 };
  const dataSource2 = mapMembersToDataSource(members, currentPage2);

  /** 동아리 컬럼 정의 */
  const defaultColumns = [
    { title: "No", dataIndex: "No", width: "14%", editable: false, type: "id" },
    { title: "동아리", dataIndex: "crew", width: "25%", editable: true, type: "text" },
    { title: "활동 인원", dataIndex: "currentPeople", width: "20%", editable: false, type: "number" },
    { title: "누적 인원", dataIndex: "totalPeople", width: "20%", editable: false, type: "number" },
    {
      title: "상태",
      dataIndex: "status",
      width: "16%",
      editable: true,
      type: "select",
      selects: ["활동중", "수료"],
    },
  ];

  /** 멤버 컬럼 정의 */
  const defaultColumns2 = [
    { title: "No", dataIndex: "No", width: "8%", editable: false, type: "id" },
    { title: "이름", dataIndex: "person", width: "10%", editable: true, type: "text" },
    { title: "학과", dataIndex: "crew", width: "20%", editable: true, type: "text" },
    { title: "학번", dataIndex: "grade", width: "15%", editable: true, type: "text" },
    { title: "역할", dataIndex: "how", width: "15%", editable: true, type: "select", selects: ["회장", "부회장", "부원", "총무"] },
    { title: "가입일", dataIndex: "date", width: "15%", editable: true, type: "date" },
    { title: "상태", dataIndex: "status", width: "10%", editable: true, type: "select", selects: ["활동중", "수료"] },
  ];

  /** 검색 조건, 라벨, 옵션, 타입 */
  const orderKeys = ["status", "clubName", "currentPeoples", "totalPeoples"];
  const labels = {
    status: "상태",
    clubName: "동아리",
    currentPeoples: "활동 인원",
    totalPeoples: "누적 인원",
  };
  const types = {
    clubName: "selectWithSearch",
    status: "select",
    currentPeoples: "rangeNumber",
    totalPeoples: "rangeNumber",
  };
  const options = {
    status: ["전체", "대기", "활동중", "활동중지"],
    clubName: ["전체", ...allClubs.map((c) => c.name)],
  };

  

  const handleAdd = () => {
    console.log("추가 버튼 클릭됨");
  };
  const handleAdd2 = () => {
    console.log("멤버 추가 버튼 클릭됨");
  };

  return (
    <PeopleManagementUI
      conditions={conditions}
      setConditions={setConditions}
      labels={labels}
      orderKeys={orderKeys}
      types={types}
      options={options}
      dataSource={dataSource}
      setDataSource={() => {}}
      permission1={permission1}
      handleAdd={handleAdd}
      defaultColumns={defaultColumns}
      loading={isClubsLoading}
      setLoading={() => {}}
      selected={selected}
      setSelected={setSelected}
      totalPages={clubsPaginationInfo.totalPages}
      count={clubsPaginationInfo.totalElements}
      dataSource2={dataSource2}
      setDataSource2={() => {}}
      permission2={permission2}
      handleAdd2={handleAdd2}
      defaultColumns2={defaultColumns2}
      loading2={isMembersLoading}
      setLoading2={() => {}}
      selected2={selected2}
      setSelected2={setSelected2}
      totalPages2={membersPaginationInfo.totalPages}
      count2={membersPaginationInfo.totalElements}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      currentPage2={currentPage2}
      setCurrentPage2={setCurrentPage2}
    />
  );
}
