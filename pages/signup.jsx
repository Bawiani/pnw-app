import Link from "next/link";
import styles from '../styles/Pages.module.css'
const Signup = ()=>{
    return(
        <div className={styles.account_container}>
            <div className={styles.account_form_container}>
                <div className={styles.left}>
                    <h1>Have An Account?</h1>
                    <Link href={"/login"}>
                        <button className={styles.btn_white} type="submit">Sign In</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <h1>Create Account</h1>
                    <form className={styles.form_container}>
                        <input type="text" name="fname" className={styles.account_input} placeholder="Enter First Name" />
                        <input type="text" name="lname" className={styles.account_input} placeholder="Enter Last Name" />
                        <input type="email" name="email" className={styles.account_input} placeholder="Enter Email Address" />
                        <input type="password" name="password" className={styles.account_input} placeholder="Enter Password" />
                        <button className={styles.btn_success} type="submit">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Signup;