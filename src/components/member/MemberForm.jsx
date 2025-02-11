export default function MemberForm() {
    return (
        <form className="p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-semibold mb-4">멤버 추가</h2>
            <div className="mb-2">
                <label className="block mb-1 text-sm">이름</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
            </div>
            <div className="mb-2">
                <label className="block mb-1 text-sm">학과</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                추가
            </button>
        </form>
    );
}
