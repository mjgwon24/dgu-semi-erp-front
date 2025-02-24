import React, { useState } from "react";
import dayjs from "dayjs";
import AnnouncementDetailUI from "@/src/components/units/announcement/announcementDetail/AnnouncementDetail.presenter";

export default function AnnouncementDetail({id}) {
    return (
        <AnnouncementDetailUI
            id={id}
        />
    )
}
