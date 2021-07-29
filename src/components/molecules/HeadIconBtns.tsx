import { FC } from "react";
import { IconBtn } from "../atoms";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import { logout_from_firebase } from "../../store/features/userinfo/userinfoAPI";
import { ADMIN_ID } from "../../static/admin";
interface Props {
  uid: string | undefined;
}

const HeadIconBtns: FC<Props> = ({ uid }: Props) => {
  const router = useRouter();
  return (
    <Box style={{ paddingLeft: "20px" }}>
      {uid === ADMIN_ID && (
        <IconBtn icon={"Admin"} onClick={() => router.push("/admin/users")} />
      )}
      <IconBtn icon={"Cart"} onClick={() => router.push("/cart")} />
      {uid && (
        <IconBtn
          icon={"History"}
          onClick={() => router.push("/orderhistory")}
        />
      )}
      {uid ? (
        <IconBtn icon={"Logout"} onClick={() => logout_from_firebase()} />
      ) : (
        <IconBtn icon={"Login"} onClick={() => router.push("/login")} />
      )}
    </Box>
  );
};

export default HeadIconBtns;
