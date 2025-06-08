"use client";

import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth();

  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    profile_pic_url: "",
    walletAddress: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMyProfile();
        setProfile({
          username: data.username || "",
          bio: data.bio || "",
          profile_pic_url: data.profile_pic_url || "",
          walletAddress: data.wallet_address || "",
        });
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await updateMyProfile({
        username: profile.username,
        bio: profile.bio,
        profile_pic_url: profile.profile_pic_url,
      });
      setProfile((prev) => ({ ...prev, ...updated }));
    } catch {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <strong>Wallet Address:</strong>
      <p className="mb-2 text-xs">{profile.walletAddress}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            maxLength={30}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            rows={3}
            maxLength={160}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Profile Picture URL</label>
          <input
            name="profile_pic_url"
            value={profile.profile_pic_url}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
      <div className="py-2 flex flex-row justify-between">
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
