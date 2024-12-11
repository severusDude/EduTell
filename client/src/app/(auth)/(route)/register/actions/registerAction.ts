import axios from "axios";

export type registerActionType = {
  username: string;
  email: string;
  slug: string;
  password: string;
  c_password: string;
};

export const registerAction = async ({
  c_password,
  email,
  password,
  slug,
  username,
}: registerActionType) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/auth/register",
    {
      name: username,
      email,
      password,
      c_password,
      slug,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
