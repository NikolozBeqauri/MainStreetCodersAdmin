
import Style from "./UserManagement.module.scss";

type Props = {
    content: string;
    count: number | undefined;
    artistCounter?:number | undefined;
}

export const UserManagement = (props: Props) => {
    return(
        <div className={Style.container}>
            <h1>{props.content}</h1>
            {props.artistCounter ? <p>{`${props.artistCounter} artists`}</p>:<p>{`${props.count} users`}</p>}
        </div>
    )
}