'use client'
import Image from 'next/image';
import styles from './SideBar.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { ReusableIcon } from '../ReusableIcon/ReusableIcon';
import { links } from './SideBarLinks/SideBarLinks'
export const SideBar = () => {
    const [active, setActive] = useState<string | null>(null);

        

    return (
        <aside className={styles.sideBarWrapper}>
            <Link href='#'>
                <Image
                    src={`/images/mainLogo.png`}
                    alt="main logo"
                    width={98}
                    height={83}
                    tabIndex={0}
                />
            </Link>
            <nav className={styles.sideBarNav}>
                <div className={styles.generalLinks}>
                    {links.map(link => (
                        <Link
                            href={link.href}
                            key={link.label}
                            onClick={() => setActive(link.label)}
                            onFocus={() => setActive(link.label)}
                            onBlur={() => setActive(null)}
                            id={active === link.label ? styles.active : ""}
                        >
                            <ReusableIcon
                                imgName={link.imageName}
                                active={active === link.label}
                                onFocus={() => setActive(link.label)}
                            />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </aside>
    );
};
