import axios from "utils/axios";

export const login = async (userId: string = "1") => {
  const response = await axios.post<{ token: string }>("/admin/token", { userId });
  return response.data.token;
};
