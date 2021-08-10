import { FC, useCallback } from "react";

interface Props {
  msg: string;
}

const ErrorMessage: FC<Props> = ({ msg }) => {
  const TranslateErrorMsg = useCallback((msg: string): string => {
    if (0 <= msg.indexOf("password")) {
      return "パスワードが間違っています。";
    } else if (0 <= msg.indexOf("no user")) {
      return "そのメールアドレスの登録はありません。";
    } else if (0 <= msg.indexOf("Network")) {
      return "ネットワークエラー：管理者にお問い合わせください";
    } else if (0 <= msg.indexOf("The email address")) {
      return "そのメールアドレスは既に登録されています。";
    } else {
      return "エラーが発生しました。もう一度お試しください。";
    }
  }, []);
  return <p style={{ color: "red" }}>{TranslateErrorMsg(msg)}</p>;
};

export default ErrorMessage;
