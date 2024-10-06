import styles from './PersonalInfoPopUp.module.scss';

type Props = {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
};

export const PersonalInfoPopUp = ({ isActive, setIsActive }: Props) => {
    const handleLogOut = () => {        
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
        window.location.reload(); 
    };

    const email = localStorage.getItem("email");

    if (!isActive) return null;

    return (
        <div className={styles.background} onClick={() => setIsActive(false)}>
            <div className={styles.wrapper}>
                <h3 onClick={(e) => {e.stopPropagation();}}>Email: {email}</h3>
                <h3 onClick={handleLogOut}>Log Out</h3>
            </div>
        </div>
    );
};
