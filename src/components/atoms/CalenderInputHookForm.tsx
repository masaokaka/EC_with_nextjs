import { FC } from "react";
import { Box, TextField } from "@material-ui/core";
import {
  Controller,
  Control,
  FieldError,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import { validateOrderDate } from "../../helpers/functions";

interface Props {
  control: Control;
  error: FieldError;
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  setError: UseFormSetError<FieldValues>;
}
const CalenderInputHookForm: FC<Props> = ({
  control,
  error,
  setValue,
  clearErrors,
  setError,
}) => {
  //配達日時のバリデーション
  const checkdate = (selected: string) => {
    let check = validateOrderDate(selected);
    if (check) {
      setValue("orderDatetime", selected);
      clearErrors("orderDatetime");
    } else {
      setValue("orderDatetime", "");
      setError("orderDatetime", {
        type: "wrongDateError",
        message: "今から3時間後の日時をご入力ください",
      });
    }
  };
  return (
    <Box mt={3}>
      <Controller
        name="orderDatetime"
        control={control}
        defaultValue={""}
        rules={{ required: true }}
        render={({ field: { value } }) => (
          <TextField
            type="datetime-local"
            onChange={(e) => {
              checkdate(e.target.value);
            }}
            value={value}
          />
        )}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "日付を入力してください"}
          {error.type === "wrongDateError" && error.message}
        </p>
      )}
    </Box>
  );
};

export default CalenderInputHookForm;
