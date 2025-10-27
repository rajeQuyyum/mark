import { useEffect, useState } from "react";
import axios from "axios";
import { section } from "framer-motion/client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotificationPopup from "./NotificationPopup";

export default function AccountDetails() {
  const [latestNotification, setLatestNotification] = useState(null);
    const [dismissedId, setDismissedId] = useState(null);
  const [user, setUser] = useState(null); // read-only info
  const [info, setInfo] = useState({ phone: "", address: "", gender: "" }); // saved info
  const [editField, setEditField] = useState(null); // which field is being edited
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API = import.meta.env.VITE_API || "http://localhost:2000";

      // ✅ Fetch latest notification
  useEffect(() => {
    if (!user?.email) return;

    const fetchLatest = async () => {
      try {
        const res = await axios.get(`${API}/user/${user.email}/notifications?limit=1`);
        const newest = res.data[0];
        if (newest && newest._id !== dismissedId) {
          setLatestNotification(newest);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 10000);
    return () => clearInterval(interval);
  }, [user, dismissedId]);

  // ✅ Close handler
  const handleClose = (id) => {
    setLatestNotification(null);
    setDismissedId(id);
    localStorage.setItem("dismissedNotificationId", id);
  };

  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUser(storedUser);

      // Fetch additional info
      axios
        .get(`${API}/user/${storedUser.id}/additional-info`)
        .then((res) => {
          const data = res.data || {};
          setInfo({
            phone: data.phone || "",
            address: data.address || "",
            gender: data.gender || "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleSaveField = async (field, value) => {
    if (!user || !user.id) return;

    setLoading(true);
    setMessage("");

    try {
      const payload = { ...info, [field]: value };
      await axios.post(`${API}/user/${user.id}/additional-info`, payload);

      setInfo((prev) => ({ ...prev, [field]: value }));
      setEditField(null);
      setMessage("Field updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error saving field.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading user...</div>;

  return (
    <section>
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 mt-28 flex flex-col md:flex-row gap-6">
  {/* Left: Read-only main info */}
  <div className="flex-1 bg-white p-6 shadow-md rounded-md break-words">
    <h2 className="text-2xl font-bold mb-4">Account Info</h2>
    <div className="mb-2"><strong>Account Number:</strong> {user.id}</div>
    <div className="mb-2"><strong>Name:</strong> {user.name}</div>
    <div className="mb-2"><strong>Email:</strong> {user.email}</div>
  </div>

  {/* Right: Editable additional info */}
  <div className="flex-1 bg-gray-100 p-6 shadow-md rounded-md">
    <h2 className="text-2xl font-bold mb-4">Saved Info</h2>

    {/* Phone */}
    <div className="mb-4 flex  sm:flex-row sm:items-center sm:gap-2">
      <div className="flex-1 min-w-[120px]">
        <strong>Phone:</strong>{" "}
        {editField === "phone" ? (
          <input
            type="text"
            className="border p-1 rounded w-full sm:w-[140px]"
            value={info.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
          />
        ) : (
          info.phone || "Not added"
        )}
      </div>
      <button
        className={`px-3 py-1 rounded text-sm ${
          editField === "phone" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
        }`}
        onClick={() =>
          editField === "phone"
            ? handleSaveField("phone", info.phone)
            : setEditField("phone")
        }
        disabled={loading}
      >
        {editField === "phone" ? "Save" : "Edit"}
      </button>
    </div>

    {/* Address */}
    <div className="mb-4 flex sm:flex-row sm:items-center sm:gap-2">
      <div className="flex-1 min-w-[120px]">
        <strong>Address:</strong>{" "}
        {editField === "address" ? (
          <input
            type="text"
            className="border p-1 rounded w-full sm:w-[140px]"
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
          />
        ) : (
          info.address || "Not added"
        )}
      </div>
      <button
        className={`px-3 py-1 rounded text-sm ${
          editField === "address" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
        }`}
        onClick={() =>
          editField === "address"
            ? handleSaveField("address", info.address)
            : setEditField("address")
        }
        disabled={loading}
      >
        {editField === "address" ? "Save" : "Edit"}
      </button>
    </div>

    {/* Gender */}
    <div className="mb-4 flex  sm:flex-row sm:items-center sm:gap-2">
      <div className="flex-1 min-w-[120px]">
        <strong>Gender:</strong>{" "}
        {editField === "gender" ? (
          <select
            className="border p-1 rounded w-full sm:w-[10px] text-sm"
            value={info.gender}
            onChange={(e) => setInfo({ ...info, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          info.gender || "Not selected"
        )}
      </div>
      <button
        className={`px-3 py-1 rounded text-sm ${
          editField === "gender" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
        }`}
        onClick={() =>
          editField === "gender"
            ? handleSaveField("gender", info.gender)
            : setEditField("gender")
        }
        disabled={loading}
      >
        {editField === "gender" ? "Save" : "Edit"}
      </button>
    </div>

    {message && <p className="text-green-600 mt-4">{message}</p>}
  </div>
</div>

  {/* ✅ Notification popup */}
        <NotificationPopup notification={latestNotification} onClose={handleClose} />
    <Footer />
    </section>
  );
}
