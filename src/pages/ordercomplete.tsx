import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Btn } from "../components/atoms";
import { ORDER_COMP_TOKEN } from "../static/const";

const OrderComp: FC = () => {
  const router = useRouter();
  useEffect(() => {
    let token: string | null = localStorage.getItem("token-order-complete");
    if (token) {
      if (token === ORDER_COMP_TOKEN) {
        return;
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
    return () => {
      localStorage.removeItem("token-order-complete");
    };
  }, [router]);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>注文が完了しました！</h2>
      <h4>この度はご注文ありがとうございます。</h4>
      <h4>
        ご注文内容については、「注文確認メール」もしくは「注文履歴」からご確認ください。
      </h4>
      <Btn
        text="トップ画面に戻る"
        onClick={() => {
          router.push("/");
        }}
      />
    </div>
  );
};

export default OrderComp;
