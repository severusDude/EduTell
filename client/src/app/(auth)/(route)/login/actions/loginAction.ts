import axios from "axios";

export type loginActionType = {
  email: string;
  password: string;
};

export const loginAction = async ({ email, password }: loginActionType) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
