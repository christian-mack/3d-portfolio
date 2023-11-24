import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, text: "", type: "danger" });

  const showAlert = ({ text, type = "danger" }) => {
    setAlert({ show: true, text, type });
    setTimeout(() => {
      setAlert({ show: false, text: "", type: "danger" });
    }, 3000);
  };

  const hideAlert = () => {
    setAlert({ show: false, text: "", type: "danger" });
  };

  return { alert, showAlert, hideAlert };
};
