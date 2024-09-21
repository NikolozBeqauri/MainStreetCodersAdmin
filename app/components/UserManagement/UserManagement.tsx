
import Style from "./UserManagement.module.scss";

type Props = {
    content: string;
    count: number;
}

export const UserManagement = (props: Props) => {
    return(
        <div className={Style.container}>
            <h1>{props.content}</h1>
            <p>{`${props.count} users`}</p>
        </div>
    )
}