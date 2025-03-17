import React, { useState } from "react";
import UserSidebar from "./UserSidebar";

const ProfilePage = () => {
  // Load stored profile data
  const [profile, setProfile] = useState(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    return (
      savedProfile || {
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        role: "",
        linkedin: "",
        github: "",
        profilePic: "",
      }
    );
  });

  const [imagePreview, setImagePreview] = useState(profile.profilePic);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfile({ ...profile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile updated successfully!");
    window.location.reload(); // 🔄 Reload page after saving
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Profile Section */}
      <div className="flex-1 flex justify-center items-center p-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h2>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <label
              htmlFor="profilePic"
              className="cursor-pointer relative w-36 h-36 rounded-full border-4 border-gray-300 flex items-center justify-center bg-gray-200"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-600 text-lg font-medium">No Image</span>
              )}
            </label>
            <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>

          {/* Profile Details */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="+91 9876543210"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="123, Street, City, State"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Software Developer, Student, etc."
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-lg font-medium text-gray-700">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="https://www.linkedin.com/in/yourprofile"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-lg font-medium text-gray-700">GitHub Profile</label>
              <input
                type="url"
                name="github"
                value={profile.github}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="https://github.com/yourusername"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-blue-500 text-white py-3 text-lg rounded-lg hover:bg-blue-600 transition"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
