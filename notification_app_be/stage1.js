const axios = require("axios");
const Log = require("../logging_middleware/logger");

const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTopNotifications() {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications from test server"
    );

    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
            headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWlzcmVlLm5pa2hpdGhheTIwMjJAdml0c3R1ZGVudC5hYy5pbiIsImV4cCI6MTc3ODkzMTY2NywiaWF0IjoxNzc4OTMwNzY3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTY0NzhhZTQtYzNiNi00ZGY3LWE4MjctMDZmMGVhY2Q5NTQ0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoieSBzYWkgc3JlZSBuaWtoaXRoYSIsInN1YiI6IjgxNDAzNmI4LWQyOGItNGI0Mi04ZTE5LTBjOGY4MTgxMjI4NSJ9LCJlbWFpbCI6InNhaXNyZWUubmlraGl0aGF5MjAyMkB2aXRzdHVkZW50LmFjLmluIiwibmFtZSI6Inkgc2FpIHNyZWUgbmlraGl0aGEiLCJyb2xsTm8iOiIyMm1pYzAxMDMiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI4MTQwMzZiOC1kMjhiLTRiNDItOGUxOS0wYzhmODE4MTIyODUiLCJjbGllbnRTZWNyZXQiOiJHeUtmelJyQ050a2prSFZaIn0.MCSWzC57TAa_sEczgBfvHvzbCjthXgPoALOAsftrmmU`
         }
        }
    );

    const notifications = response.data.notifications;

    await Log(
      "frontend",
      "info",
      "api",
      `Fetched ${notifications.length} notifications`
    );

    notifications.sort((a, b) => {
      const weightA = PRIORITY[a.Type] || 0;
      const weightB = PRIORITY[b.Type] || 0;

      if (weightB !== weightA) {
        return weightB - weightA;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    await Log(
      "frontend",
      "debug",
      "utils",
      "Notifications sorted by priority and timestamp"
    );

    const top10 = notifications.slice(0, 10);

    await Log(
      "frontend",
      "info",
      "utils",
      "Selected top 10 notifications"
    );

    console.log("\n===== TOP 10 PRIORITY NOTIFICATIONS =====\n");

    top10.forEach((notification, index) => {
      console.log(`${index + 1}. ${notification.Type}`);
      console.log(`   Message   : ${notification.Message}`);
      console.log(`   Timestamp : ${notification.Timestamp}`);
      console.log(`   ID        : ${notification.ID}`);
      console.log();
    });

    await Log(
      "frontend",
      "info",
      "utils",
      "Displayed top 10 notifications"
    );
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    console.error("Error:", error.response?.data || error.message);
  }
}

getTopNotifications();