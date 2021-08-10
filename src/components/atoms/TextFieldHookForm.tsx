import { FC } from "react";
import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";
import { ErrorMsgType } from "../../static/const";

interface Props {
  formName: `${string}` | `${string}.${string}` | `${string}.${number}`;
  label: string;
  type: string;
  control: Control;
  error: FieldError;
  errorMsg: ErrorMsgType;
  pattern?: RegExp;
  maxLength?: number;
  minLength?: number;
}

const TextFieldHookForm: FC<Props> = ({
  formName,
  label,
  type,
  control,
  error,
  errorMsg,
  pattern,
  maxLength,
  minLength,
}) => {
  return (
    <Box mt={3}>
      <Controller
        name={formName}
        control={control}
        rules={{
          required: true,
          pattern: pattern!,
          maxLength: maxLength!,
          minLength: minLength!,
        }}
        render={({ field }) => (
          <TextField label={label} type={type} {...field} />
        )}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && errorMsg.required}
          {error.type === "pattern" && errorMsg.pattern}
          {error.type === "maxLength" && errorMsg.maxLength}
          {error.type === "minLength" && errorMsg.minLength}
        </p>
      )}
    </Box>
  );
};

export default TextFieldHookForm;
