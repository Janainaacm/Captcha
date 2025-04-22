import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchCaptcha = async () => {
  try {
    const res = await axios.get(`${API_URL}/captcha/generate`, {
      responseType: "arraybuffer",
      withCredentials: true,
    });
    return res;
  } catch (err) {
    console.log("Failed to load captcha", err);
    throw err; 
  }
};

export const verifyCaptcha = async (input: string) => {
  const res = await axios.post(
    `${API_URL}/captcha/verify`,
    { captcha: input },
    { withCredentials: true }
  );
  return res;
};