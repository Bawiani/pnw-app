import Link from "next/link"
import styles from '../styles/Pages.module.css'
import {useState, useEffect} from "react"
const Customernavbar = (onClick) => {

const [item, setItem]=useState(false);
const [user, setUser] = useState(false);

function dropItem(){
    setItem(!item);
    setUser(false);
}
function dropUser(){
    setItem(false);
    setUser(!user);
}

    return (
        
                <div className={styles.menu}>
                    <div className={styles.item}>
                        <a href="#">Dashboard</a>
                    </div>
                    <div className={styles.item}>
                        <a className={styles.subbtn} onClick={dropItem}>
                            Order
                            <i className={styles.dropdown}></i>
                        </a>
                       {
                           item &&
                           <div className={styles.submenu}>
                                <Link href="/orderline"><a onClick={dropItem} className={styles.subitem}>New</a></Link>
                                <Link href="#"><a onClick={dropItem} className={styles.subitem}>View</a></Link>
                           </div>
                       }
                    </div>
                    <div className={styles.item}>
                        <a className={styles.subbtn} onClick={dropUser}>
                            User Account
                            <i className={styles.dropdown}></i>
                        </a>

                        { 
                            user &&
                            <div className={styles.submenu}>
                                <Link href="/user"><a onClick={dropUser} className={styles.subitem}>New</a></Link>
                                <Link href="#"><a onClick={dropUser} className={styles.subitem}>Sub Item2</a></Link>
                            </div>
                        }
                    </div>
                </div>
              
    );
}
export default Customernavbar;