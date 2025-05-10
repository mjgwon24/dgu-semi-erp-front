import { useEffect } from "react";

export default function useSSE(userId, onMessage) {
    useEffect(() => {
        if (!userId) return;

        const eventSource = new EventSource(`http://localhost:8081/notifications/subscribe?userId=${userId}`);

        eventSource.addEventListener("connect", (e) => {
            console.log("✅ SSE 연결됨:", e.data);
        });

        eventSource.addEventListener("notification", (e) => {
            const data = JSON.parse(e.data);
            console.log("📩 새 알림 도착:", data); // <= 추가
            onMessage(data);
        });

        eventSource.onerror = (e) => {
            console.error("❌ SSE 오류:", e);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [userId, onMessage]);
}