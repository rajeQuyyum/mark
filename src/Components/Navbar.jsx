import React, { useEffect, useState, useRef } from "react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { IoLanguage } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [balance, setBalance] = useState(user ? user.balance : 0);
  const [showBalance, setShowBalance] = useState(
    localStorage.getItem("showBalance") === "false" ? false : true
  );
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem("selectedLang") || "en");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const API = import.meta.env.VITE_API || "http://localhost:3001";

  const fetchBalance = () => {
    if (user) {
      axios
        .get(`${API}/user/${user.id}/balance`)
        .then((res) => setBalance(res.data.balance))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 2000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Toggle + persist balance visibility
  const toggleBalance = () => {
    const newValue = !showBalance;
    setShowBalance(newValue);
    localStorage.setItem("showBalance", newValue);
  };

  // ✅ Load Google Translate script once
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        } catch (e) {
          console.warn("Google translate init error", e);
        }
      };
    }

    const savedLang = localStorage.getItem("selectedLang");
    if (savedLang && savedLang !== "en") {
      document.cookie = `googtrans=/en/${savedLang};path=/`;
      setSelectedLang(savedLang);
    }
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTranslate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🌍 Language list
  const languages = [
    { code: "en", label: "English (Original)" },
    { code: "es", label: "Español (Spanish)" },
    { code: "fr", label: "Français (French)" },
    { code: "de", label: "Deutsch (German)" },
    { code: "it", label: "Italiano (Italian)" },
    { code: "pt", label: "Português (Portuguese)" },
    { code: "ru", label: "Русский (Russian)" },
    { code: "zh-CN", label: "中文 (Simplified Chinese)" },
    { code: "zh-TW", label: "中文 (Traditional Chinese)" },
    { code: "ja", label: "日本語 (Japanese)" },
    { code: "ko", label: "한국어 (Korean)" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "ar", label: "العربية (Arabic)" },
    { code: "tr", label: "Türkçe (Turkish)" },
    { code: "th", label: "ไทย (Thai)" },
    { code: "vi", label: "Tiếng Việt (Vietnamese)" },
    { code: "pl", label: "Polski (Polish)" },
    { code: "uk", label: "Українська (Ukrainian)" },
    { code: "ro", label: "Română (Romanian)" },
    { code: "fa", label: "فارسی (Persian)" },
    { code: "id", label: "Bahasa Indonesia" },
    { code: "ms", label: "Bahasa Melayu" },
    { code: "sv", label: "Svenska (Swedish)" },
    { code: "nl", label: "Nederlands (Dutch)" },
    { code: "el", label: "Ελληνικά (Greek)" },
  ];

  // ✅ Filtered languages based on search
  const filteredLanguages = languages.filter((l) =>
    l.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Apply translation & remember language
  const applyLanguage = (langCode) => {
    if (!langCode || langCode === "en") {
      document.cookie = "googtrans=;path=/;max-age=0";
      document.cookie = "googtrans=;path=/";
      localStorage.setItem("selectedLang", "en");
      setSelectedLang("en");
      window.location.reload();
      return;
    }
    document.cookie = `googtrans=/en/${langCode};path=/`;
    localStorage.setItem("selectedLang", langCode);
    setSelectedLang(langCode);
    window.location.reload();
  };

  return (
    <nav className="bg-[#252424bb] fixed top-0 left-0 w-full shadow-md z-[99999]">
      <div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between px-4 py-3 gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div>
            <h1 className="text-xs md:text-sm font-sans text-gray-400">Welcome back!</h1>
            {user && (
              <>
                <h1 className="text-white font-bold text-sm md:text-base">{user.name}</h1>
                <div className="flex items-center gap-2">
                  <h1 className="text-green-500 font-bold text-sm md:text-base">
                    Balance: {showBalance ? `$${balance}` : "****"}
                  </h1>
                  <button onClick={toggleBalance}>
                    {showBalance ? (
                      <AiOutlineEyeInvisible className="text-white" />
                    ) : (
                      <AiOutlineEye className="text-white" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <NavLink className="text-white" to="/noti">not</NavLink>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* 🌍 Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowTranslate((s) => !s)}
              className="text-black text-2xl hover:text-green-400 transition relative"
              aria-label="Choose language"
            >
              <IoLanguage />
              <span className="absolute -top-1 -right-2 bg-green-500 text-xs text-black px-1.5 py-[1px] rounded-full">
                {selectedLang.toUpperCase()}
              </span>
            </button>

            <div
              className={`absolute right-0 top-10 bg-white text-black rounded shadow-lg p-2 w-52 md:w-60 border border-gray-200 transform transition-all duration-300 ease-out origin-top ${
                showTranslate
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ maxHeight: "60vh", overflowY: "auto", zIndex: 999999 }}
            >
              {/* 🔍 Search input */}
              <input
                type="text"
                placeholder="Search language..."
                className="w-full px-2 py-1 mb-2 text-sm border rounded outline-none focus:ring-1 focus:ring-green-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Language list */}
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => applyLanguage(l.code)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded ${
                      selectedLang === l.code
                        ? "bg-green-100 text-green-600 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {l.label}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-center text-sm py-2">No results found</p>
              )}
            </div>
          </div>

          {/* Logout */}
          <div>
            {user ? (
              <button onClick={handleLogout}>
                <HiOutlineArrowLeftOnRectangle className="text-white text-3xl md:text-4xl" />
              </button>
            ) : (
              <NavLink to="/login">
                <HiOutlineArrowLeftOnRectangle className="text-white text-3xl md:text-4xl" />
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Hidden translate element */}
      <div id="google_translate_element" style={{ display: "none" }} />
    </nav>
  );
}
