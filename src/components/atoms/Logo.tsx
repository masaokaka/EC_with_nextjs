import { FC } from "react";
// import MediaQuery from "react-responsive";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
const Logo: FC = () => {
  const router = useRouter();
  return (
    <>
      {/* <MediaQuery query="(min-width: 600px)"> */}
      <Link href="/">
        {/* nextLinkとimageを併用する際、何かでラップしないとエラーが出るので注意 */}
        <div>
          <Image src={"/img/logo.png"} alt="ロゴ" height={50} width={220} />
        </div>
      </Link>
      {/* </MediaQuery> */}
      {/* <MediaQuery query="(max-width: 599px)"> */}
      {/* <Link href="/">
          <img src="/img/logo.png" alt="ロゴ" height="30px" width="160px" />
        </Link> */}
      {/* </MediaQuery> */}
    </>
  );
};

export default Logo;
