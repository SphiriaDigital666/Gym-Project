import { useEffect } from "react";
import {
  useLocation,
  Outlet,
  useLoaderData,
  useSubmit,
} from "react-router-dom";

import { getTokenDuration } from "../../util/auth";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Root = () => {
  const path = useLocation().pathname;
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <Navbar />
      <main className="bg-secondary text-white">
        <Outlet />
      </main>
      {path !== "/login" && <Footer />}
    </>
  );
};

export default Root;
