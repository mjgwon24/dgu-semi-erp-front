import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import Link from 'next/link';

export default function HeaderLayout(props) {
    // Redux 상태 가져오기
    const userName = useSelector((state) => state.user.userName);

    return (
        <div className="flex items-center justify-end px-6 py-4 bg-white border-b-[1px] border-gray-300 w-full h-full space-x-4">
            {/* 알림 아이콘 */}
            <div>
                <IconButton>
                    <NotificationsIcon className="text-[#2C2C2C]" />
                </IconButton>
            </div>

            {/* 사용자 이름 또는 로그인 버튼 */}
            <div>
                {userName ? (
                    <div className="w-14 h-14 bg-[#F4F4F4] flex items-center justify-center rounded-full text-[#303030] font-[Pretendard] text-[16px] font-semibold leading-normal">
                        {userName}
                    </div>
                ) : (
                    <Link href="/login">
                        <button className="text-white bg-gray-600 px-4 py-2 rounded-md hover:bg-[#F4F4F4]">
                            로그인
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
