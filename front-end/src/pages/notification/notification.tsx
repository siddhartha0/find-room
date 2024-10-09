import { useEffect, useState } from "react";
import { HeaderInfoText, InfoText } from "../../units";
import { UseSocketContext } from "../../hooks/context/SocketContext";

export const Notification = () => {
  const [notification, setNotification] = useState([""]);

  const socket = UseSocketContext();

  useEffect(() => {
    socket?.on("push-notification", (data: string) => {
      console.log(data);
      setNotification([...notification, data]);
    });
  }, []);

  return (
    <div className="flex flex-col gap-5 p-8">
      <HeaderInfoText title="Notification" />
      {notification.length > 0 &&
        notification.map((message, index) => (
          <InfoText title={message} key={message + index} />
        ))}
    </div>
  );
};
