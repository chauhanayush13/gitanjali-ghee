import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

const sendOrderEmail = async (email, subject, message) => {
  const functions = getFunctions(getApp());
  const sendEmailFunction = httpsCallable(functions, "sendOrderEmail");

  try {
    const response = await sendEmailFunction({ email, subject, message });
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default sendOrderEmail;
