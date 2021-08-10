import { Container } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { selectItems } from "../../features/item/itemsSlice";
import {
  AdminItemsForm,
  AdminItemsTable,
  AdminHeaderBtns,
} from "../../components/organisms";
import { NextPage } from "next";

const Items: NextPage = () => {
  const items = useAppSelector(selectItems);
  return (
    <Container>
      <AdminHeaderBtns />
      <h2>商品管理画面</h2>
      <AdminItemsForm items={items} />
      {items.length !== 0 ? (
        <AdminItemsTable items={items} />
      ) : (
        <div>商品がありません</div>
      )}
    </Container>
  );
};

export default Items;
