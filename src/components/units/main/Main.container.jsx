import MainUI from "@/src/components/units/main/Main.presenter";

export default function Main() {
    let announcements = [
        {title: '공지1', content: '공지내용 1 공지내용 1 공지내용 1 공지내용 1공지내용  1 공지내용 1공지내용 1 공지내용 1  ', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'}
    ]

    let clubs = [
        {title: '동아리1', content: 'IT 개발 동아리', date: '2024-01-12'},
        {title: '동아리2', content: '음악 동아리', date: '2024-01-12'},
        {title: '동아리3', content: '봉사 동아리', date: '2024-01-12'}
    ]

    return <MainUI announcements={announcements} clubs={clubs}/>
}