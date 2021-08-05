import Head from "next/head";
import Image from "next/image";
import { FC, useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useAppSelector } from "../app/hooks";
import { Items, SearchForm } from "../components/molecules";
import { selectItems, ItemType } from "../features/item/itemsSlice";
import { fetch_all_items } from "../features/item/itemsAPI";
import Item from "../models/item";
// import { connectDB, disconnectDB } from "../helpers/db_utils";
import connectDB from "../config/mongoDB";
import { GetStaticProps,NextPage } from "next";
import { ONE_MINUTE } from "../static/const";

interface Props {
  items: string;
}
const Home: NextPage<Props> = (props) => {
  const items: ItemType[] = JSON.parse(props.items);
  const [searchItems, setSearchItems] = useState<ItemType[]>(items);
  const [noItem, setNoItem] = useState(false);
  const search = (word: string | undefined) => {
    if (word === "" || word === undefined) {
      setSearchItems(items);
      setNoItem(false);
    } else {
      let newItems = searchItems!.filter(
        (item: ItemType) => item.name!.indexOf(word) >= 0
      );
      if (newItems.length === 0) {
        setNoItem(true);
      } else {
        setSearchItems(newItems);
        setNoItem(false);
      }
    }
  };
  return (
    <div className="center">
      <Head>
        <title>
          ラクラクカリー | ラクラク社シェフのカレーをすぐにお届け！ | raku raku
          curry
        </title>
        <meta
          name="description"
          content="ラクラク社が販売するカレーをネットから簡単に注文できるWEBサイトです。
          トップページではラクラク社のシェフが手がけた美味しいカレーを選択して注文することができます。"
        />
      </Head>
      <Box m={3} textAlign="right">
        <SearchForm search={search} />
      </Box>
      <Box>
        <Items items={searchItems} noItem={noItem} />
      </Box>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  let items: any = [];
  try {
    console.log("toppage build");
    await connectDB();
    items = await Item.find({});
    // await disconnectDB();
  } catch (error) {
    console.log(error.message);
  }
  return {
    props: {
      items: JSON.stringify(items),
    },
    revalidate: ONE_MINUTE * 30, //seconds
  };
};

export default Home;
