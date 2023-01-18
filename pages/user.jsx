import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css';
import { useEffect, useState } from 'react';
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
const User = () => {

    const options = ["-- Select Role --", "Admin", "Customer", "Production", "Sales"];
    const initState = { fname:'', lname:'', contact:'', email:'', password:'' };

    const [state, setState] = useState(initState);
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [role, setRole] = useState(options[0]);

    const { fname, lname, contact, email, password } = state;
    const router = useRouter();

    useEffect(()=>{
        userData();
    }, []);

    const userData = async()=>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        if(response.status === 200){
            setData(response.data);
        }
    }

    const saveUser = async() => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/register`,{
            fname:fname, lname:lname, contact:contact, role:role, email:email, password:password
        }).then((response)=>{
            const result = response.data.data;
            setData([...data, result]);
            setState(initState);
            setRole(options[0]);
        }).catch((err)=>{
            console.log(err.response);
        });
    }

    const saveData = (e) =>{
        e.preventDefault();
        if (!fname || !lname || !contact || !email || !password || role === '-- Select Role --') {
            setMessage('Please provide value for each input field!');
        }else{
            if(!id){
                saveUser(state);
            }else{
                updateUser(state);
            }
        }
    }

    const handleInput = (e) =>{
        let {name, value} = e.target;
        setState({...state, [name] : value});
    }

    const restFields = ()=>{
        setState(initState);
        setRole(options[0]);
        setId('');
    }

    const onLoadUser = async (_id) => {
        setId(_id);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${_id}`);
        if(response.status === 200){
            setState(response.data);
            setRole(response.data.role);
        }
    }

    const updateUser = async () => {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
            fname:fname, lname:lname, contact:contact, role:role, email:email, password:password
        }).then((response)=>{
            setState(initState);
            setRole(options[0]);
        }).catch((err)=>{
            setMessage(err.response.message);
        }).finally(()=>{
            userData();
            setId('');
        });
    }

    const onDeleteUser = async (_id) => {
        if(window.confirm("Are you sure you want delete this user?")){
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${_id}`);
            if(response.status === 200){
                userData();
                window.alert("User deleted successfully!");
            }
        }
    }
    return (
        <div>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div><Link className='bar_signin' href="/login">Logout</Link></div>
                </header>
                <nav className={styles.sidebar}>
                    <h2>Side Bar</h2>
                    <Navbar/>
                </nav>
                <main className={styles.main}>
                    <div className="panel-body">
                        <div className="form-left">
                            <form className={styles.form_container} onSubmit={saveData}>
                                <div>{message}</div>
                                <input type="text" name="fname" className={styles.input} placeholder=" Enter First Name" onChange={handleInput} value={fname} />
                                <input type="text" name="lname" className={styles.input} placeholder=" Enter Last Name" onChange={handleInput} value={lname} />
                                <input type="text" name="contact" className={styles.input} placeholder=" Enter Contact" onChange={handleInput} value={contact} />
                                <select name="role" className={styles.input} value={role} onChange={e => setRole(e.target.value)} >
                                    {options.map ((value)=>(
                                        <option value={value} key={value}>{value}</option>
                                    ))}
                                </select>
                                <input type="text" name="email" className={styles.input} placeholder=" Enter Email Address" onChange={handleInput} value={email} />
                                <input type="password" name="password" className={styles.input} placeholder=" Enter Password" onChange={handleInput} value={password} />
                                <div className="btn">
                                    <button type="submit" className={styles.btn_submit} > {id === ''?"Add":"Update"} </button>&nbsp;
                                    <button type="reset" className={styles.btn_reset} onClick={()=> restFields()} > Reset </button>
                                </div>
                            </form>
                        </div>
                        <div className="right-form">
                            <div className="wrapper">
                                <table className="styled_table">
                                    <thead>
                                        <tr>
                                        <th style={{ textAlign: "center" }}> No. </th>
                                        <th style={{ textAlign: "center" }}> First Name </th>
                                        <th style={{ textAlign: "center" }}> Last Name </th>
                                        <th style={{ textAlign: "center" }}> Contact </th>
                                        <th style={{ textAlign: "center" }}> Role </th>
                                        <th style={{ textAlign: "center" }}> Email Address </th>
                                        <th style={{ textAlign: "center" }}> Action(s) </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((item, index) => {
                                                return (
                                                <tr key={index}>
                                                    <th scope="row"> {index + 1} </th> 
                                                    <td> {item.fname} </td>
                                                    <td> {item.lname} </td>
                                                    <td> {item.contact} </td> 
                                                    <td> {item.role} </td> 
                                                    <td> {item.email} </td> 
                                                    <td>
                                                    <button className="btn_edit" onClick={()=> onLoadUser(item._id)} ><BiEdit /></button>&nbsp;
                                                    <button className="btn_delete" onClick={()=> onDeleteUser(item._id)}><AiTwotoneDelete /></button>
                                                    </td>
                                                </tr>
                                                );
                                            })} 
                                    </tbody> 
                                </table>
                                <div> {data.length === 0 && <p style={{textAlign:"center"}}> Data not found! </p>} </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <footer className={styles.footer}>Footer</footer> */}
            </div>
        </div>
    );
}
export default User;