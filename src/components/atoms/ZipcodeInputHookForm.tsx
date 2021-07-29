import { FC } from "react";
import { Box, TextField } from "@material-ui/core";
import { searchAddress } from "../../helpers/functions";
import {
  Controller,
  Control,
  FieldError,
  UseFormSetError,
  UseFormSetValue,
  FieldValues,
  UseFormGetValues,
} from "react-hook-form";
import { IconBtn } from "./";

interface Props {
  control: Control;
  error: FieldError;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
}

const ZipcodeInputHookForm: FC<Props> = ({
  control,
  error,
  getValues,
  setValue,
  setError,
}) => {
  //住所検索処理
  const getAddress = () => {
    const zipcode = getValues("zipcode");
    searchAddress(zipcode!)
      .then((address) => {
        setValue("address", address);
      })
      .catch((e) => {
        setError("address", {
          type: "getAddress",
          message: e,
        });
      });
  };
  return (
    <Box mt={3}>
      <Controller
        name="zipcode"
        control={control}
        rules={{ required: true, pattern: /^\d{3}[-]\d{4}$/ }}
        render={({ field }) => <TextField label="郵便番号" {...field} />}
      />
      <IconBtn icon="Search" onClick={() => getAddress()} />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "郵便番号を入力してください"}
          {error.type === "pattern" && "XXX-XXXXの形式で入力して下さい"}
          {error.type === "getAddress" && error.message}
        </p>
      )}
    </Box>
  );
};

export default ZipcodeInputHookForm;
