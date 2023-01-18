import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../component/header";
import styles from '../styles/Pages.module.css'

const Login = ()=>{

    const router = useRouter();
    const initstate = { email:'', password:'' };
    const [state, setState] = useState(initstate);
    const [data, setData] = useState();

    const { email, password } = state;

    const logIn = async() =>{
       
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`,{ email:email, password:password})
        .then((response)=>{
            const id = response.data.data._id;
            sessionStorage.setItem("user" , JSON.stringify(
             response.data.data   
            ))
            router.push({
                pathname: '/dashboard',
                // query: {id}
            });
        })
        .catch((err)=>{
            //console.log(err.response.message);
            alert(err.message)
        });
        // if(response === 200){
            
        // }
    }
    // .then((response)=>{
    //     const result = response.data.data;
    //     //console.log(result);
    //     setData([...data, result]);
    //     router.push({
    //         pathname: '/dashboard',
    //         data: data
    //     });
    // }).catch((err)=>{
    //     console.log(err.response);
    // })
    const handleInput = (e) =>{
        let {name, value} = e.target;
        setState({...state, [name] : value});
    }

    const  saveData = (e)=>{
        e.preventDefault();
        if(!email || !password){
            console.log("Please provide value for each input field!");
        }else{
            logIn(state);
            
            //alert("Submitted successfully!");
        }
    }

return(
    <div>
        <Header />
        <div className={styles.account_container}>
            <div className={styles.account_form_container}>
                    <div className={styles.login_left}>
                        <h1>Enter Login Credentials</h1>
                        <form className={styles.form_container} onSubmit={saveData}>
                                
                                <input type="text" name="email" className={styles.account_input} placeholder=" Enter Email Address" onChange={handleInput} value={email} />
                                <input type="password" name="password" className={styles.account_input} placeholder=" Enter Password" onChange={handleInput} value={password} />
                                <div className="btn">
                                    <button type="submit" className={styles.btn_success} > Login </button>
                                </div>
                        </form>
                        {/* <form className={styles.form_container} onSubmit={logIn}>
                            <input type="email" name="email" className={styles.account_input} placeholder="Enter Email" onChange={handleInput} value={email} />
                            <input type="password" name="password" className={styles.account_input} placeholder="Enter Password" onChange={handleInput} value={password} />
                            <div className="btn">
                                    <button type="submit" className={styles.btn_success} > Login </button>
                            </div>
                            <button type="submit" className={styles.btn_success}>Login</button>
                        </form> */}
                    </div>
                    <div className={styles.login_right}>
                        {/* <h1>New Here?</h1>
                        <Link href={"/signup"}>
                            <button type="submit" className={styles.btn_white} >Sign Up</button>
                        </Link> */}
                    </div>
            </div>
        </div>
    </div>
);
}
export default Login;