import Main from "@/src/components/units/main/Main.container";
import dayjs from "dayjs";

export default function MainUI({announcements, clubs}) {
    
    return (
        <div className="flex flex-row h-full gap-4 w-full flex-grow-0">
            {/*최근 공지사항*/}
            <div className="flex flex-col p-4 gap-4 flex-grow-0 rounded" style={{width: '50%'}}>
                <div className="flex justify-between items-center">
                    <label className="text-xl font-bold">최근 공지사항</label>
                    <a href="" style={{ color: "#737373" }}>{'더보기 >'}</a>
                </div>

                <div className="flex flex-col border border-[#DBDBDB] rounded-lg h-full ">
                    {announcements.length > 0 ? (
                        announcements.map((announcement, index) => (
                            <div key={index} className="flex flex-col gap-4 p-6" style={{ borderBottom: index !== announcements.length - 1 ? "1px solid #DBDBDB" : "none", height: "16.6667%"}}>
                                <div className="flex flex-row justify-between">
                                    <p className="text-lg font-semibold">{announcement.title}</p>
                                    <p style={{ color: "#4C545B" }}>{dayjs(announcement.date).format("YYYY.MM.DD")}</p>
                                </div>
                                <p className="truncate" style={{ color: "#4C545B" }}>{announcement.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="p-4 text-center text-gray-500">공지사항이 없습니다.</p>
                    )}
                </div>
            </div>

            {/*최근 개설된 동아리*/}
            <div className="flex flex-col p-4 gap-4 flex-grow-0" style={{width: '50%'}}>
                <div className="flex justify-between items-center">
                    <label className="text-xl font-bold">최근 개설된 동아리</label>
                    <a href="" style={{ color: "#737373" }}>{'더보기 >'}</a>
                </div>

                <div className="flex flex-col border border-[#DBDBDB] rounded-lg h-full">
                    {clubs.length > 0 ? (
                        clubs.map((club, index) => (
                            <div key={index} className="flex flex-col gap-4 p-6" style={{ borderBottom: "1px solid #DBDBDB", height: "16.6667%"}}>
                                <div className="flex flex-row justify-between">
                                    <p className="text-lg font-semibold">{club.title}</p>
                                    <p style={{ color: "#4C545B" }}>{dayjs(club.date).format("YYYY.MM.DD")}</p>
                                </div>
                                <p className="truncate" style={{ color: "#4C545B" }}>{club.content}</p>
                            
                            </div>
                            
                        ))
                    ) : (
                        <p className="p-4 text-center text-gray-500">공지사항이 없습니다.</p>
                    )}
                </div>
            </div>
         </div>
        
    )
}