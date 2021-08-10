import { FC, useEffect, useState } from "react";
import classes from "../../styles/atoms/Notification.module.css";
import IconBtn from "./IconBtn";

interface Props {
  message: string;
  status: "idle" | "loading" | "failed";
}
const Notification: FC<Props> = ({ message, status }) => {
  let title: string = "";
  let statusClasses: string = "";
  const [activeNotification, setActiveNotification] = useState(true);
  if (status === "idle") {
    title = "成功";
    statusClasses = classes.success;
  } else if (status === "failed") {
    title = "エラー";
    statusClasses = classes.failed;
  } else if (status === "loading") {
    title = "処理中";
    statusClasses = classes.loading;
  }
  const activeClasses = `${classes.notification} ${statusClasses}`;
  useEffect(() => {
    if (status === "idle" || status === "failed") {
      const timer = setTimeout(() => {
        setActiveNotification(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification, status]);
  return (
    <>
      {activeNotification && (
        <div className={activeClasses}>
          <IconBtn icon="Clear" onClick={() => setActiveNotification(false)}>消す</IconBtn>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
