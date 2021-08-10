import { Container, Box } from "@material-ui/core";
import { useState, FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { addItemAsync, ItemType } from "../../../features/item/itemsSlice";
import {
  Btn,
  ImgInputHookForm,
  TextBoxHookForm,
  TextFieldHookForm,
} from "../../atoms";
import {
  NAME_ERROR_MSG,
  PRICE_REGEX,
  PRICE_ERROR_MSG,
} from "../../../static/const";

interface Props {
  items: ItemType[];
}

const AdminItemsForm: FC<Props> = ({ items }) => {
  const [imgFile, setImgFile] = useState<File | undefined>();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm<ItemType>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      text: "",
      mprice: 0,
      lprice: 0,
      img: "",
    },
  });

  const doAddItem: SubmitHandler<ItemType> = async (data) => {
    data.mprice = Number(data.mprice);
    data.lprice = Number(data.lprice);
    dispatch(addItemAsync({ item: data, img: imgFile! }));
    reset({
      name: "",
      text: "",
      mprice: 0,
      lprice: 0,
      img: "",
    });
    setImgFile(undefined);
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h3>商品登録</h3>
        <form onSubmit={handleSubmit(doAddItem)}>
          <TextFieldHookForm
            formName="name"
            label="名前"
            type="text"
            control={control}
            error={errors.name!}
            errorMsg={NAME_ERROR_MSG}
          />
          <TextBoxHookForm control={control} error={errors.text!} />
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
          <ImgInputHookForm
            control={control}
            error={errors.img!}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            setImgFile={setImgFile}
          />
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClick={handleSubmit(doAddItem)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AdminItemsForm;
