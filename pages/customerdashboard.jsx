import CustomerNavbar from '../component/customernavbar';
import styles from '../styles/Pages.module.css'
const Customerdashboard = () => {
    return (
        <div>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>Logout</div>
                </header>
                <nav className={styles.sidebar}>
                    <h2>Side Bar</h2>
                    <CustomerNavbar />
                </nav>
                <main className={styles.main}></main>
                {/* <footer className={styles.footer}>Footer</footer> */}
            </div>
        </div>
    );
}
export default Customerdashboard;