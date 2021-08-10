import { NextPage } from "next";
import { Container } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { selectToppings } from "../../features/topping/toppingsSlice";
import {
  AdminToppingsForm,
  AdminToppingsTable,
  AdminHeaderBtns,
} from "../../components/organisms";

const Toppings: NextPage = () => {
  const toppings = useAppSelector(selectToppings);
  return (
    <Container>
      <AdminHeaderBtns />
      <h2>トッピング管理画面</h2>
      <AdminToppingsForm toppings={toppings} />
      {toppings.length !== 0 ? (
        <AdminToppingsTable toppings={toppings} />
      ) : (
        <div>トッピングがありません</div>
      )}
    </Container>
  );
};

export default Toppings;
