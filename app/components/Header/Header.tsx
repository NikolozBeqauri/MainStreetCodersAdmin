import Image from "next/image";
import { Search } from "../Search/Search";
import { UserProfileIcon } from "../UserProfileIcon/UserPrifileIcon";
import styles from "./Header.module.scss";

type Props = {
  imgName?: string;
};
export const Header = (props: Props) => {
  return (
    <div className={styles.headerWrapper}>
      {props.imgName ? (
        <Image
          src={`/icons/${props.imgName}.svg`}
          alt="icon"
          width={24}
          height={24}
        />
      ) : (
        <Search />
      )}
      <UserProfileIcon src="userImage.png" />
    </div>
  );
};
