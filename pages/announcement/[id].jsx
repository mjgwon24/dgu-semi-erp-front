import AnnouncementDetail from "@/src/components/units/announcement/announcementDetail/AnnouncementDetail.container";
import { useRouter } from "next/router";

export default function MainPage() {
    const router = useRouter();
    const { id } = router.query;
    console.log("현재 ID:", id);
    
    return <AnnouncementDetail id={id}/>
}