import { Icon } from "@iconify/react/dist/iconify.js";
import { ProfileSideBar } from "../../constant";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="flex flex-col gap-4">
      {ProfileSideBar.map((bar) => (
        <Link
          className="flex place-items-center gap-4"
          key={bar.id}
          to={bar.path}
        >
          <Icon icon={bar.icon} />
          <p>{bar.title}</p>
        </Link>
      ))}
    </div>
  );
};
