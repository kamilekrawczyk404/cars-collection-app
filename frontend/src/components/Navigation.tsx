import React from "react";
import { Car, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { views } from "../App";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className={"w-full p-4 bg-neutral-900"}>
      <div
        className={
          "mx-auto max-w-7xl flex lg:gap-12 md:gap:8 gap-4 md:flex-row flex-col"
        }
      >
        <h3
          className={
            "text-2xl font-semibold text-neutral-200 inline-flex items-center gap-x-2 tracking-tight"
          }
        >
          <Car size={"1.75rem"} />
          <span>Cars collection</span>
        </h3>

        {isLoggedIn && (
          <div className={"flex justify-between flex-1 gap-4"}>
            <div className={"flex lg:gap-8 md:gap-6 gap-4 items-end"}>
              {Object.entries(views).map(
                ([name, view], index) =>
                  view.showInHeader && (
                    <Link
                      to={view.path}
                      key={index}
                      className={"text-neutral-200"}
                    >
                      {name}
                    </Link>
                  ),
              )}
            </div>
            <div className={"flex items-end lg:gap-8 md:gap-6 gap-4"}>
              <span className={"text-neutral-200"}>
                Welcome back {user?.displayName}
              </span>
              <button
                onClick={() => logout()}
                className={"text-neutral-200 inline-flex items-center gap-1"}
              >
                <LogOut size={"1rem"} />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div className={"flex items-center lg:gap-8 md:gap-6 gap-4 ml-auto"}>
            <Link to={views.Login.path} className={"text-neutral-200"}>
              Login
            </Link>
            <Link to={views.Register.path} className={"text-neutral-200"}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
