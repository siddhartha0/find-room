import { Facebook, Instagram, X } from "react-feather";
import { companyLogo } from "../../../assets/";
import { Icon, InfoText } from "../../../units";

export const Footer = () => {
  return (
    <main
      id="contact"
      className="flex bg-bg-brand mt-8 p-8 justify-between place-items-center"
    >
      <img src={companyLogo} alt="logo" width={150} />
      <InfoText title="City Hostel &copy; 2024. All Rights Reserved" />
      <div className="flex place-items-center gap-4">
        <InfoText title="Follow us on" />
        <Icon name={X} />
        <Icon name={Facebook} />
        <Icon name={Instagram} />
      </div>
    </main>
  );
};
