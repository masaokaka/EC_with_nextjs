import Button from "@material-ui/core/Button";
import { FC } from "react";

interface Props {
  text: string;
  bgcolor?: string;
  color?: string;
  onClick: () => void;
}
const Btn: FC<Props> = ({ text, color, bgcolor, onClick }) => {
  return (
    <>
      {color !== undefined ? (
        <Button
          variant="contained"
          onClick={onClick}
          style={{ backgroundColor: bgcolor, color: color }}
        >
          {text}
        </Button>
      ) : (
        <Button variant="contained" onClick={onClick} color="secondary">
          {text}
        </Button>
      )}
    </>
  );
};

export default Btn;
