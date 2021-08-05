import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Box } from "@material-ui/core";
import {
  loginAsync,
  selectUid,
  selectUserInfoErrorMsg,
  selectUserInfoStatus,
  unsetUserError,
} from "../features/userinfo/userinfoSlice";
import { Btn, ErrorMessage, TextFieldHookForm } from "../components/atoms";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  EMAIL_WITHOUT_WHITESPACE_REGEX,
  EMAIL_ERROR_MSG,
  PASSWORD_WITHOUT_WHITESPACE_REGEX,
  PASSWORD_ERROR_MSG,
} from "../static/const";

interface LoginInfoType {
  email?: string;
  password?: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const uid = useAppSelector(selectUid);
  const userinfoError = useAppSelector(selectUserInfoErrorMsg);
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfoType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (uid) {
      router.push("/");
    }
    return () => {
      if (localStorage.ItemInfo) {
        localStorage.removeItem("ItemInfo");
      }
      dispatch(unsetUserError());
    };
  }, [uid, router, dispatch]);

  const doLogin: SubmitHandler<LoginInfoType> = (data) => {
    dispatch(loginAsync({ email: data.email!, password: data.password! }));
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>ログイン</h2>
        {userinfoStatus === "failed" && userinfoError !== null && (
          <ErrorMessage msg={userinfoError} />
        )}
        <form onSubmit={handleSubmit(doLogin)}>
          <TextFieldHookForm
            formName="email"
            label="メールアドレス"
            type="text"
            control={control}
            error={errors.email!}
            pattern={EMAIL_WITHOUT_WHITESPACE_REGEX}
            errorMsg={EMAIL_ERROR_MSG}
          />
          <TextFieldHookForm
            formName="password"
            label="パスワード"
            type="password"
            control={control}
            error={errors.password!}
            pattern={PASSWORD_WITHOUT_WHITESPACE_REGEX}
            maxLength={12!}
            minLength={8!}
            errorMsg={PASSWORD_ERROR_MSG}
          />
          <Box mt={3}>
            <Btn text="ログイン" onClick={handleSubmit(doLogin)} />
          </Box>
        </form>
        <Box mt={3}>
          <Link href="/register">ユーザー登録はこちら</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
