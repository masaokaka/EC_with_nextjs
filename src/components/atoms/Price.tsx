import { FC } from "react";

interface Props {
  price: number;
  tax: boolean;
  bigsize: boolean;
}

const Price: FC<Props> = ({ price, tax, bigsize }) => {
  return (
    <>
      {tax && bigsize && <h2> 合計：{price.toLocaleString()} 円(税込)</h2>}
      {!tax && bigsize && <h2> 合計：{price.toLocaleString()} 円(税抜)</h2>}
      {tax && !bigsize && <span>{price.toLocaleString()} 円(税込)</span>}
      {!tax && !bigsize && <span>{price.toLocaleString()} 円(税抜)</span>}
    </>
  );
};

export default Price;
