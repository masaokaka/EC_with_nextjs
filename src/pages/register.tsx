import { useEffect, FC } from "react";
import { useAppSelector } from "../store/app/hooks";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  selectUid,
  registerAsync,
  UserInfoType,
  selectUserInfoErrorMsg,
  selectUserInfoStatus,
  unsetUserError,
} from "../store/features/userinfo/userinfoSlice";
import { Container, Box } from "@material-ui/core";
import {
  Btn,
  ErrorMessage,
  ZipcodeInputHookForm,
  TextFieldHookForm,
} from "../components/atoms";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {
  NAME_ERROR_MSG,
  EMAIL_WITHOUT_WHITESPACE_REGEX,
  EMAIL_ERROR_MSG,
  TEL_REGEX,
  TEL_ERROR_MSG,
  ADDRESS_ERROR_MSG,
  PASSWORD_WITHOUT_WHITESPACE_REGEX,
  PASSWORD_ERROR_MSG,
  USERNAME_ERROR_MSG,
} from "../static/const";

interface RegisterInfoType extends UserInfoType {
  password?: string;
}

const Register: FC = () => {
  const uid = useAppSelector(selectUid);
  const userinfoError = useAppSelector(selectUserInfoErrorMsg);
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      zipcode: "",
      address: "",
      tel: "",
      username: "",
      password: "",
    },
  });
  const doRegister: SubmitHandler<RegisterInfoType> = (data) => {
    let new_userinfo: UserInfoType = {
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      address: data.address,
      tel: data.tel,
      username: data.username,
    };
    dispatch(
      registerAsync({ password: data.password!, userinfo: new_userinfo })
    );
    router.push("/");
  };

  useEffect(() => {
    if (uid) {
      router.push("/");
    }
    return () => {
      dispatch(unsetUserError());
    };
  }, [uid, dispatch, router]);

  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>新規登録</h2>
        {userinfoStatus === "failed" && userinfoError !== null && (
          <ErrorMessage msg={userinfoError} />
        )}
        <form onSubmit={handleSubmit(doRegister)}>
          <TextFieldHookForm
            formName="name"
            label="名前"
            type="text"
            control={control}
            error={errors.name!}
            errorMsg={NAME_ERROR_MSG}
          />
          <TextFieldHookForm
            formName="tel"
            label="電話番号"
            type="text"
            control={control}
            error={errors.tel!}
            pattern={TEL_REGEX}
            errorMsg={TEL_ERROR_MSG}
          />
          <ZipcodeInputHookForm
            control={control}
            error={errors.zipcode!}
            getValues={getValues}
            setValue={setValue}
            setError={setError}
          />
          <TextFieldHookForm
            formName="address"
            label="住所"
            type="text"
            control={control}
            error={errors.address!}
            errorMsg={ADDRESS_ERROR_MSG}
          />
          <TextFieldHookForm
            formName="username"
            label="ユーザー名"
            type="text"
            control={control}
            error={errors.username!}
            maxLength={10!}
            errorMsg={USERNAME_ERROR_MSG}
          />
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
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClick={handleSubmit(doRegister)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
