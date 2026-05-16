const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWlzcmVlLm5pa2hpdGhheTIwMjJAdml0c3R1ZGVudC5hYy5pbiIsImV4cCI6MTc3ODkzMTY2NywiaWF0IjoxNzc4OTMwNzY3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTY0NzhhZTQtYzNiNi00ZGY3LWE4MjctMDZmMGVhY2Q5NTQ0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoieSBzYWkgc3JlZSBuaWtoaXRoYSIsInN1YiI6IjgxNDAzNmI4LWQyOGItNGI0Mi04ZTE5LTBjOGY4MTgxMjI4NSJ9LCJlbWFpbCI6InNhaXNyZWUubmlraGl0aGF5MjAyMkB2aXRzdHVkZW50LmFjLmluIiwibmFtZSI6Inkgc2FpIHNyZWUgbmlraGl0aGEiLCJyb2xsTm8iOiIyMm1pYzAxMDMiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI4MTQwMzZiOC1kMjhiLTRiNDItOGUxOS0wYzhmODE4MTIyODUiLCJjbGllbnRTZWNyZXQiOiJHeUtmelJyQ050a2prSFZaIn0.MCSWzC57TAa_sEczgBfvHvzbCjthXgPoALOAsftrmmU";

async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          stack: stack,
          level: level,
          package: packageName,
          message: message
        })
      }
    );

    const data = await response.json();
    console.log("Log API Response:", data);

    return data;
  } catch (error) {
    console.error("Logging failed:", error);
  }
}

module.exports = Log;