import { useState } from "react";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import Link from "next/link";

export default function HeaderLayout(props) {
    const [userName, setUserName] = useState("석진"); // user name (백엔드에서 전달 예정)

    return (
        <div className="flex items-center justify-end px-6 py-4 bg-white border-b-[1px] border-gray-300 w-full h-full space-x-4">
            <div>
                <IconButton>
                    <NotificationsIcon className="text-gray-700" />
                </IconButton>
            </div>

            <div>
                {userName ? (
                    <div className="w-10 h-10 bg-gray-300 text-gray-800 font-medium flex items-center justify-center rounded-full">
                        {userName}
                    </div>
                ) : (
                    <Link href="/login">
                        <button className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                            로그인
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
