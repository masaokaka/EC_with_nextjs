import { NextPage } from "next";
import { Btn } from "../components/atoms";
import { useRouter } from "next/router";

const NotFoundPage: NextPage = () => {
  const router = useRouter();
  return (
    <div className="center">
      <h2>ページが見つかりませんでした。</h2>
      <Btn text={"トップに戻る"} onClick={() => router.push("/")} />
    </div>
  );
};

export default NotFoundPage;
