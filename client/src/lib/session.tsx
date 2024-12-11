import { cookies } from "next/headers";

export const getSession = async () => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return null;
  }

  return token;
};
