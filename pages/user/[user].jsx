import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../component/navbar';
import styles from '../../styles/Pages.module.css'
import { BiEdit } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
const Edituser = ()=>{

    const initState = { fname:'', lname:'', contact:'', email:'', password:'' };
    const options = ["-- Select Role --", "Admin", "Customer", "Production", "Sales"];

    const [state, setState] = useState(initState);
    const [role, setRole] = useState(options[0]);
    const [data, setData] = useState('');
    const [message, setMessage] = useState('');
    const { fname, lname, contact, email, password } = state;
    
    const router = useRouter();

    //const {id} = router.query.user;
    //const { user } = router.query;
    //console.log(router.query.user);
    //console.log({ id });
    const { id } = router.query;
    useEffect(()=>{
        
        userData(id); 
        usersData();
    }, [router.query]);

    const userData = async()=>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${router.query.user}`);
        if(response.status === 200){
            setState(response.data);
            setRole(response.data.role);
            // setData(response.data.data);
        }
    }

    const usersData = async()=>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        if(response.status === 200){
            setData(response.data);
        }
    }

    const loadUser = async (_id) => {
        // e.preventDefault();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${_id}`);
        if(response.status === 200){
            setState(response.data);
            setRole(response.data.role);
            // setData(response.data.data);
        }
    }

    const handleInput = (e) => {
        let {name, value} = e.target;
        setState({...state, [name] : value});
    }
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <div>Logout</div>
            </header>
            <nav className={styles.sidebar}>
                <h2>Sidebar</h2>
                <Navbar />
            </nav>
            <main className={styles.main}>
                <div className="panel-body">
                    <div className="form-left">
                        <form className={styles.form_container}>
                            <div>{message}</div>
                            <input type="text" name="fname" className={styles.input} placeholder=" Enter First Name" onChange={handleInput} value={fname} />
                            <input type="text" name="lname" className={styles.input} placeholder=" Enter Last Name" onChange={handleInput} value={lname} />
                            <input type="text" name="contact" className={styles.input} placeholder=" Enter Contact" onChange={handleInput} value={contact} />
                            <select name="role" className={styles.input} value={role} onChange={e => setRole(e.target.value)}>
                                {options.map((value)=>(
                                    <option value={value} key={value}>{value}</option>
                                ))}
                            </select>
                            <input type="text" name="email" className={styles.input} placeholder=" Enter Email Address" onChange={handleInput} value={email} />
                            <input type="password" name="password" className={styles.input} placeholder=" Enter Password" onChange={handleInput} value={password} />
                            <div className="btn">
                                <button type="submit" className={styles.btn_submit} > Add </button>&nbsp;
                                <button type="reset" className={styles.btn_reset} > Reset </button>
                            </div>
                        </form>
                    </div>
                    <div className="form-right">
                        <table className='styled_table'>
                            <thead>
                                <th style={{textAlign : "center"}}> No. </th>
                                <th style={{textAlign : "center"}}> First Name </th>
                                <th style={{textAlign : "center"}}> Last Name </th>
                                <th style={{textAlign : "center"}}> Contact </th>
                                <th style={{textAlign : "center"}}> Role </th>
                                <th style={{textAlign : "center"}}> Eamil </th>
                                <th style={{textAlign : "center"}}> Action(s) </th>
                            </thead>
                            <tbody>
                                {data &&
                                    data.map((item, index)=>{
                                        return(
                                            <tr key={index}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{item.fname}</td>
                                                <td>{item.lname}</td>
                                                <td>{item.contact}</td>
                                                <td>{item.role}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <button onClick={()=> loadUser(item._id)} ><BiEdit /></button>&nbsp;
                                                    <a href="" onClick={()=> onDeleteUser(item._id)} ><AiTwotoneDelete /></a>
                                                </td>
                                            </tr>
                                            
                                        )
                                    })
                                    }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Edituser;