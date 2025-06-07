import { useState, useEffect } from "react";

export default function Account() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved ? JSON.parse(saved) : { name: "", email: "", address: "" };
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d3e5f7] to-[#f1f5fc] flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-md border border-indigo-100 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-indigo-800 text-center mb-6">
          My Account
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-indigo-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-indigo-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Enter your shipping address"
              rows={3}
              className="w-full px-4 py-2 border border-indigo-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
          </div>

          {saved && (
            <div className="text-green-600 text-center font-medium transition-opacity duration-500">
              ✅ Profile details saved!
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-6 rounded-lg shadow hover:bg-indigo-600 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
