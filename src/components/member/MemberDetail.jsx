export default function MemberDetail() {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">DEVELOPER 인원 조회 상세</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300">No</th>
                    <th className="border border-gray-300">이름</th>
                    <th className="border border-gray-300">학과</th>
                    <th className="border border-gray-300">학번</th>
                    <th className="border border-gray-300">역할</th>
                    <th className="border border-gray-300">가입일</th>
                    <th className="border border-gray-300">상태</th>
                </tr>
                </thead>
                <tbody>
                {/* 예제 데이터 */}
                <tr>
                    <td className="border border-gray-300">1</td>
                    <td className="border border-gray-300">홍길동</td>
                    <td className="border border-gray-300">컴퓨터공학과</td>
                    <td className="border border-gray-300">2023</td>
                    <td className="border border-gray-300">회장</td>
                    <td className="border border-gray-300">2023-01-01</td>
                    <td className="border border-gray-300">활동중</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
