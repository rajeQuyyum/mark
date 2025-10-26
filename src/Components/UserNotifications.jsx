import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UserNotifications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);

  // ✅ API base URL
  const API = import.meta.env.VITE_API || "http://localhost:2000";

  // ✅ Fetch all notifications for this user
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`${API}/user/${user.email}/notifications`)
      .then((res) => setNotifications(res.data))
      .catch(console.log);

    // ✅ Mark notifications as read (remove red dot)
    localStorage.setItem("hasNewNotification", "false");
  }, [user]);

  return (
    <section>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-28 px-4 pb-10 bg-amber-100">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          🔔 Notifications
        </h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No notifications yet.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className="border border-gray-300 bg-gray-100 hover:bg-gray-50 p-4 mb-3 rounded-lg shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-800">{n.title}</h3>
              <p className="text-gray-600">{n.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
      <Footer />
    </section>
  );
}
