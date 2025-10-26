import { useEffect, useState } from "react";
import axios from "axios";

export default function UserNotifications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);

  const API = "http://localhost:2000";

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`${API}/user/${user.email}/notifications`)
      .then((res) => setNotifications(res.data))
      .catch(console.log);
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>
      {notifications.map((n) => (
        <div key={n._id} className="border p-3 mb-2 rounded bg-gray-100">
          <h3 className="font-semibold">{n.title}</h3>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}
