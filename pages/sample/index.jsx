import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";

export default function SamplePage() {
    return (
        <div className="flex h-screen"> {/* 최상단 레이아웃 */}
            <div className="w-[12%]">
                <SideBarLayout/>
            </div>
            <div className="flex-grow flex-col border-l-[1px] border-solid border-black">
                <div className="flex h-[10%]"> {/* HeaderLayout의 비율을 조정 */}
                    <HeaderLayout/>
                </div>
                <div className="flex-grow border-t-[1px] border-solid border-black"> {/* HeaderLayout 나머지 비율을 조정 */}
                    <div>콘텐츠 영역1</div>
                    <div>콘텐츠 영역2</div>
                </div>
            </div>
        </div>
    )
}