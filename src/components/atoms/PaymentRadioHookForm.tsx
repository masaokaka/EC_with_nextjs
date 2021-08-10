import { FC } from "react";
import { Box, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
  watchPayType: number;
}
const PaymentRadioHookForm: FC<Props> = ({ control, error, watchPayType }) => {
  return (
    <Box mt={3}>
      <Controller
        name="payType"
        control={control}
        defaultValue={watchPayType}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            aria-label="PaymentType"
            onChange={(e) => onChange(Number(e.target.value))}
            value={value}
          >
            <FormControlLabel value={1} control={<Radio />} label="代金引換" />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="クレジットカード支払"
            />
          </RadioGroup>
        )}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "支払い方法を選択して下さい"}
        </p>
      )}
    </Box>
  );
};

export default PaymentRadioHookForm;
