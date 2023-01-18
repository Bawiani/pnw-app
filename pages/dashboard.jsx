import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css'
const Dashboard = () => {
    const [data, setdata] = useState("");
    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            const userData = JSON.parse(sessionStorage.getItem("user"))
            setdata(userData)
        }
    })
    return (
        <div>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div><Link className='bar_signin' href="/login">Logout</Link></div>
                </header>
                <nav className={styles.sidebar}>
                    <h4>{data.fname +' '+ data.lname}</h4>
                    <Navbar/>
                </nav>
                <main className={styles.main}></main>
                {/* <footer className={styles.footer}>Footer</footer> */}
            </div>
        </div>
    );
}
export default Dashboard;