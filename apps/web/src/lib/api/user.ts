import api from "../api";

export async function getMyProfile() {
  const res = await api.get("/users/me");
  return res.data;
}

export async function updateMyProfile(data: {
  username?: string;
  bio?: string;
  profile_pic_url?: string;
}) {
  const res = await api.post("/users", data);
  return res.data;
}
