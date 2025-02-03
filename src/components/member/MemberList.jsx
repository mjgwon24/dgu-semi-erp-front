import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMembers } from "@/redux/slices/memberSlice";

export default function MemberList() {
    const dispatch = useDispatch();
    const { members, loading } = useSelector((state) => state.members);

    useEffect(() => {
        dispatch(fetchMembers());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;

    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
            <tr>
                <th className="border border-gray-300">No</th>
                <th className="border border-gray-300">동아리</th>
                <th className="border border-gray-300">활동 인원</th>
                <th className="border border-gray-300">누적 인원</th>
                <th className="border border-gray-300">상태</th>
            </tr>
            </thead>
            <tbody>
            {members.map((member, index) => (
                <tr key={member.id}>
                    <td className="border border-gray-300">{index + 1}</td>
                    <td className="border border-gray-300">{member.clubName}</td>
                    <td className="border border-gray-300">{member.activeMembers}</td>
                    <td className="border border-gray-300">{member.totalMembers}</td>
                    <td className="border border-gray-300">{member.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
