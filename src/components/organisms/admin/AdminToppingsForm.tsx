import { Container, Box } from "@material-ui/core";
import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ToppingType,
  addToppingAsync,
} from "../../../features/topping/toppingsSlice";
import { Btn, TextFieldHookForm } from "../../atoms";
import {
  SIZE_L_PRICE,
  SIZE_M_PRICE,
  NAME_ERROR_MSG,
  PRICE_REGEX,
  PRICE_ERROR_MSG,
} from "../../../static/const";

interface Props {
  toppings: ToppingType[];
}

const AdminToppingsForm: FC<Props> = ({ toppings }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ToppingType>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      mprice: SIZE_M_PRICE,
      lprice: SIZE_L_PRICE,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        mprice: SIZE_M_PRICE,
        lprice: SIZE_L_PRICE,
      });
    }
  }, [isSubmitSuccessful, reset]);

  const doAddTopping: SubmitHandler<ToppingType> = (data) => {
    dispatch(addToppingAsync({ topping: data }));
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h3>トッピング登録</h3>
        <form onSubmit={handleSubmit(doAddTopping)}>
          <TextFieldHookForm
            formName="name"
            label="名前"
            type="text"
            control={control}
            error={errors.name!}
            errorMsg={NAME_ERROR_MSG}
          />
          <TextFieldHookForm
            formName="mprice"
            label="Mサイズ値段"
            type="number"
            control={control}
            error={errors.mprice!}
            pattern={PRICE_REGEX}
            errorMsg={PRICE_ERROR_MSG}
          />
          <TextFieldHookForm
            formName="lprice"
            label="Lサイズ値段"
            type="number"
            control={control}
            error={errors.lprice!}
            pattern={PRICE_REGEX}
            errorMsg={PRICE_ERROR_MSG}
          />
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClick={handleSubmit(doAddTopping)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AdminToppingsForm;
