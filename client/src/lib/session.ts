import { jwtPayload } from "@/hooks/useAuthLogin";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return null;
  }

  return token;
};

export const getSessionName = async () => {
  const token = await getSession();
  if (!token) {
    return;
  }
  const decode = jwtDecode<jwtPayload>(token);
  return decode.name;
};

export const getSlug = async () => {
  const token = await getSession();
  if (!token) {
    return null;
  }
  const decode = jwtDecode<jwtPayload>(token);
  return decode.slug;
};

export const getSessionRole = async () => {
  const token = await getSession()
  if(!token){
    return null
  }

  const decode = jwtDecode<jwtPayload>(token);
  return decode.role;
}
