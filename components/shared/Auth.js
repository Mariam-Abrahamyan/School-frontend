import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Axios } from "../../services/api";

export const Auth = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Axios.get("logout").then((r) => {
      setAccount(null);
      navigate("/");
    });
  };
  useEffect(() => {
    Axios.get("/auth").then((resp) => {
      let { user } = resp.data;
      if (!user) {
        navigate("/");
      } else {
        setAccount(user);
      }
    });
  }, []);

  return (
    account && (
      <>
        <Outlet context={{ account, handleLogout }} />
      </>
    )
  );
};
