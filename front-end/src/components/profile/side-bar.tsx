import { Icon } from "@iconify/react/dist/iconify.js";
import { ProfileSideBar, StudenSideBar } from "../../constant";
import { Link, useLocation } from "react-router-dom";
import { user } from "../../state-management/local/auth";
import { useSelector } from "react-redux";

export const SideBar = () => {
  const location = useLocation();
  const userinfo = useSelector(user);

  return (
    <div className="flex flex-col gap-8 border-r border-fav border-opacity-[0.3] p-4">
      {userinfo && userinfo.role === "owner"
        ? ProfileSideBar.map((bar) => (
            <Link
              className={`flex place-items-center gap-6 ${
                location.pathname.endsWith(bar.path) ? "text-fav" : ""
              }`}
              key={bar.id}
              to={bar.path}
            >
              <Icon icon={bar.icon} />
              <p className="text-lg">{bar.title}</p>
            </Link>
          ))
        : StudenSideBar.map((bar) => (
            <Link
              className={`flex place-items-center gap-6 ${
                location.pathname.endsWith(bar.path) ? "text-fav" : ""
              }`}
              key={bar.id}
              to={bar.path}
            >
              <Icon icon={bar.icon} />
              <p className="text-lg">{bar.title}</p>
            </Link>
          ))}
    </div>
  );
};
