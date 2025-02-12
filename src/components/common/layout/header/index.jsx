import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import Link from 'next/link';

export default function HeaderLayout(props) {
    // Redux 상태 가져오기
    const userName = useSelector((state) => state.user.userName);

    return (
        <div className="flex gap-[5px] items-center justify-end px-6 py-4 bg-[#F7F7F7] border-b-[1px] border-gray-300 w-full h-full">
            {/* 알림 아이콘 */}
            <IconButton>
                <NotificationsIcon fontSize="medium" className="text-[#4C545B]" />
            </IconButton>

            {/* 사용자 이름 */}
            <div>
                <div className="w-[45px] h-[45px] bg-[#212121] flex items-center justify-center rounded-full text-[white] font-[Pretendard] text-[14px] font-semibold leading-normal">
                    {userName}
                </div>
            </div>
        </div>
    );
}
