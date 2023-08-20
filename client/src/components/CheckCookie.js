import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const CheckCookie = ({requiredCookieName}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const cookieExists = document.cookie.indexOf(`${requiredCookieName}=`) !== -1;
    cookieExists ? navigate("/home") : navigate("/login");
  }, [requiredCookieName]);

  return <></>;
};

export default CheckCookie;
