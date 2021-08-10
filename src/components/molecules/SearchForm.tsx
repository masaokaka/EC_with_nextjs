import { FC, useState } from "react";
import { Box, TextField } from "@material-ui/core";
import { IconBtn } from "../atoms";

interface Props {
  search: (word: string | undefined) => void;
}

const SearchForm: FC<Props> = ({ search }) => {
  const [word, setWord] = useState<string>();
  return (
    <Box>
      <TextField
        type="text"
        variant="outlined"
        size="small"
        label="検索"
        color="primary"
        onChange={(e) => setWord(e.target.value)}
      />
      <IconBtn icon="Search" onClick={() => search(word)} />
    </Box>
  );
};

export default SearchForm;
