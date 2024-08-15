import Image from 'next/image';
import style from './UserProfileIcon.module.scss'
type Props = {
    src: string;
}

export const UserProfileIcon = (props:Props) => {
    return (
        <Image
            className={style.userImage}
            src={`/images/${props.src}`}
            alt="user image"
            width={56}
            height={56}
        />
    )
}