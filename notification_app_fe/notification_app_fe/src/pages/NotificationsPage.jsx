import { useEffect, useState } from "react";
import API from "../services/api";
import NotificationCard from "../components/NotificationCard";

function NotificationsPage() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {

      const response = await API.get("/notifications", {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWlzcmVlLm5pa2hpdGhheTIwMjJAdml0c3R1ZGVudC5hYy5pbiIsImV4cCI6MTc3ODkzMTY2NywiaWF0IjoxNzc4OTMwNzY3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTY0NzhhZTQtYzNiNi00ZGY3LWE4MjctMDZmMGVhY2Q5NTQ0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoieSBzYWkgc3JlZSBuaWtoaXRoYSIsInN1YiI6IjgxNDAzNmI4LWQyOGItNGI0Mi04ZTE5LTBjOGY4MTgxMjI4NSJ9LCJlbWFpbCI6InNhaXNyZWUubmlraGl0aGF5MjAyMkB2aXRzdHVkZW50LmFjLmluIiwibmFtZSI6Inkgc2FpIHNyZWUgbmlraGl0aGEiLCJyb2xsTm8iOiIyMm1pYzAxMDMiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI4MTQwMzZiOC1kMjhiLTRiNDItOGUxOS0wYzhmODE4MTIyODUiLCJjbGllbnRTZWNyZXQiOiJHeUtmelJyQ050a2prSFZaIn0.MCSWzC57TAa_sEczgBfvHvzbCjthXgPoALOAsftrmmU"
        }
      });

      setNotifications(response.data.notifications);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Notifications</h1>

      {
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
          />
        ))
      }
    </div>
  );
}

export default NotificationsPage;