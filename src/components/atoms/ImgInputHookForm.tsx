import { Box, Input } from "@material-ui/core";
import React, { SetStateAction, FC } from "react";
import {
  Controller,
  Control,
  FieldError,
  UseFormSetError,
  UseFormSetValue,
  FieldValues,
  UseFormClearErrors,
} from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  setImgFile: React.Dispatch<SetStateAction<File | undefined>>;
}

const ImgInputHookForm: FC<Props> = ({
  control,
  error,
  setValue,
  setError,
  clearErrors,
  setImgFile,
}) => {
  const checkImgExt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files!.length === 0 || e.target.files!.length === null) {
      return;
    }
    let img = e.target.files![0];
    if (img.type.match("image.*")) {
      setValue("img", img.name);
      setImgFile(img);
      clearErrors("img");
    } else {
      setError("img", {
        type: "extError",
        message: "ファイル形式が間違っています",
      });
    }
  };
  return (
    <Box mt={3}>
      <Controller
        name="img"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input type="file" onChange={checkImgExt} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "画像を選択してください"}
          {error.type === "extError" && "ファイル形式が違います"}
        </p>
      )}
    </Box>
  );
};

export default ImgInputHookForm;
