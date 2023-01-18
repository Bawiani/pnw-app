import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css';
import { BiEdit } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
import Link from 'next/link';
const Customer = () => {

    const initState = { customer_id:'', firstname:'', lastname:'', contact:'', address:'', email:'', password:'' };

    const [state, setState] = useState(initState);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');

    const { customer_id, firstname, lastname, contact, address, email, password } = state;

    useEffect(()=>{
        customerData();
    }, []);

    const customerData = async() =>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers`);
        if(response.status === 200){
            setData(response.data);
        }
    }

    const saveCustomer = async() => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/customer`,{
            customer_id:customer_id, firstname:firstname, lastname:lastname, contact:contact, address:address
        }).then((response)=>{
            const result = response.data.data;
            setData([...data, result]);
            setState(initState);
        }).catch((err)=>{
            console.log(err.response);
        });
    }

    const saveData = (e)=>{
        e.preventDefault();
        if(!customer_id || !firstname || !lastname || !contact || !address){
            setMessage("Please provide value for each input field!");
        }else{
            if (!id) {
                saveCustomer(state);
            }else{
                updateCustomer(state);
            }
        }
    }

    const handleInput = (e)=>{
        let {name, value} = e.target;
        setState({...state, [name]:value});
    }

    const resetFileds = ()=>{
        setState(initState);
        setId('');
    }

    const onLoadCustomer = async(_id) =>{
        setId(_id);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer/${_id}`);
        if(response.status === 200){
            //console.log(response.data.data);
            setState(response.data.data);
        }
    }

    const updateCustomer = async() =>{
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`,{
            customer_id:customer_id, firstname:firstname, lastname:lastname, contact:contact, address:address
        }).then((response)=>{
            setState(initState);
        }).catch((err)=>{
            console.log(err.response);
        }).finally(()=>{
            customerData();
            setId('');
        });
    }

    const onDeleteCustomer = async(_id) =>{
        if(window.confirm("Are you sure you want to delete this customer?")){
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/customer/${_id}`);
            if(response.status === 200){
                customerData();
                window.alert("Customer deleted successfully!");
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
                            <form className={styles.form_container} onSubmit={saveData} >
                                <div>{message}</div>
                                <input type="text" name="customer_id" className={styles.input} placeholder=" Enter Customer ID" onChange={handleInput} value={customer_id} />
                                <input type="text" name="firstname" className={styles.input} placeholder=" Enter Customer First Name" onChange={handleInput} value={firstname} />
                                <input type="text" name="lastname" className={styles.input} placeholder=" Enter Customer Last Name" onChange={handleInput} value={lastname} />
                                <input type="text" name="contact" className={styles.input} placeholder=" Enter Customer Contact" onChange={handleInput} value={contact} />
                                <input type="text" name="address" className={styles.input} placeholder=" Enter Customer Address" onChange={handleInput} value={address} />
                                {/* <input type="email" name="email" className={styles.input} placeholder=" Enter Customer Email Address" onChange={handleInput} value={email} />
                                <input type="password" name="password" className={styles.input} placeholder=" Enter Customer Password" onChange={handleInput} value={password} /> */}
                                <div className="btn">
                                    <button type="submit" className={styles.btn_submit} >{id ==='' ? "Add":"Update"} </button>&nbsp;
                                    <button type="reset" className={styles.btn_reset} onClick={()=> resetFileds()} > Reset </button>
                                </div>
                            </form>
                        </div>
                        <div className="form_right">
                            <div className="wrapper">
                                <table className="styled_table">
                                    <thead>
                                        <tr>
                                        <th style={{ textAlign: "center" }}> No. </th>
                                        <th style={{ textAlign: "center" }}> Customer ID </th>
                                        <th style={{ textAlign: "center" }}> Name </th>
                                        <th style={{ textAlign: "center" }}> Contact </th>
                                        <th style={{ textAlign: "center" }}> Address </th>
                                        <th style={{ textAlign: "center" }}> Action(s) </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((customer, index) => {
                                                return (
                                                <tr key={customer._id}>
                                                    <th scope="row"> {index + 1} </th> 
                                                    <td> {customer.customer_id} </td>
                                                    <td> {customer.firstname} {customer.lastname} </td>
                                                    <td> {customer.contact} </td>
                                                    <td> {customer.address} </td>
                                                    <td> 
                                                        <button className="btn_edit" onClick={()=> onLoadCustomer(customer._id)}><BiEdit /></button>&nbsp;
                                                        <button className="btn_delete" onClick={()=> onDeleteCustomer(customer._id)}><AiTwotoneDelete /></button>
                                                    </td>
                                                </tr>
                                                );
                                            })
                                        } 
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
export default Customer;
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import Navbar from '../component/navbar';
// import styles from '../styles/Pages.module.css';
// import AiTwotoneDelete from 'react-icons/ai';
// import BiEdit from 'react-icons/bi';
// const Customer = () => {
//     const initValue = { customer_id:'', customer_fname:'', customer_lname:'', customer_contact:'', customer_address:'', email:'', password:'' };
//     const [state, setState] = useState(initValue);
//     const [data, setData] = useState([]);

//     const { customer_id, customer_fname, customer_lname, customer_contact, customer_address, email, password } = state;
    
//     useEffect(()=>{
//         customerData();
//     }, []);

//     const customerData = async() =>{
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers`);
//         if(response.status === 200){
//             setData(response.data);
//         }
//     }

//     // const custData = async() =>{
//     //     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer`);
//     //     if(response.status === 200){
//     //        // console.log(response.data);
//     //         setData(response.data.data);
//     //     }
//     // }

//     const saveCustomer = async() =>{
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/customer`,{
//             customer_id:customer_id, customer_fname:customer_fname, customer_lname:customer_lname, customer_contact:customer_contact, customer_address:customer_address, email:email, password:password
//         }).then((response)=>{
//             const results = response.data.data;
//             setData([...data, results]);
//             //console.log(results);
//         }).catch((err)=>{
//             console.log(err.response);
//         })
//     }

//     const saveData = (e) =>{
//         e.preventDefault();
//         if(!customer_id || !customer_fname || !customer_lname || !customer_contact || !customer_address || !email || !password){
//             console.log("Please provide value for each input field!");
//         }else{
//             saveCustomer(state);
//         }
//     }
//     const handleInput = (e) =>{
//         const {name, value} = e.target;
//         setState({...state, [name]:value});
//     }
//     return (

//         <div>
//             <div className={styles.container}>
//                 <header className={styles.header}>
//                     <div>Logout</div>
//                 </header>
//                 <nav className={styles.sidebar}>
//                     <h2>Side Bar</h2>
//                     <Navbar/>
//                 </nav>
//                 <main className={styles.main}>
//                         <div className="panel-body">
//                             <div className="form-left">
//                                 <form className={styles.form_container} onSubmit={saveData} >
//                                     <div></div>
//                                     <input type="text" name="customer_id" className={styles.input} placeholder=" Enter Customer ID" onChange={handleInput} value={customer_id} />
//                                     <input type="text" name="customer_fname" className={styles.input} placeholder=" Enter Customer First Name" onChange={handleInput} value={customer_fname} />
//                                     <input type="text" name="customer_lname" className={styles.input} placeholder=" Enter Customer Last Name" onChange={handleInput} value={customer_lname} />
//                                     <input type="text" name="customer_contact" className={styles.input} placeholder=" Enter Customer Contact" onChange={handleInput} value={customer_contact} />
//                                     <input type="text" name="customer_address" className={styles.input} placeholder=" Enter Customer Address" onChange={handleInput} value={customer_address} />
//                                     <input type="email" name="email" className={styles.input} placeholder=" Enter Customer Email Address" onChange={handleInput} value={email} />
//                                     <input type="password" name="password" className={styles.input} placeholder=" Enter Customer Password" onChange={handleInput} value={password} />
//                                     <div className="btn">
//                                         <button type="submit" className={styles.btn_submit} > Add </button>&nbsp;
//                                         <button type="reset" className={styles.btn_reset} > Reset </button>
//                                     </div>
//                                 </form>
//                             </div>
//                             <div className="form_right">
//                                 {/* <div className="panel-table"> */}
//                                     <table className="styled_table">
//                                         <thead>
//                                             <tr>
//                                             <th style={{ textAlign: "center" }}> No. </th>
//                                             <th style={{ textAlign: "center" }}> Customer ID </th>
//                                             <th style={{ textAlign: "center" }}> Customer Name </th>
//                                             <th style={{ textAlign: "center" }}> Customer Contact </th>
//                                             <th style={{ textAlign: "center" }}> Customer Address </th>
//                                             <th style={{ textAlign: "center" }}> Action(s) </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                         {data &&
//                                             data.map((item, index) => {
//                                                 return (
//                                                 <tr key={index}>
//                                                     <th scope="row"> {index + 1} </th> 
//                                                     <td> {item.customer_id} </td>
//                                                     <td> {item.firstname} </td>
//                                                     <td> {item.contact} </td> 
//                                                     <td> {item.address} </td> 
//                                                     <td> 
                                                    
//                                                     <button className="btn_edit" onClick={()=> onLoadItem(item._id)}><BiEdit /></button>&nbsp;
//                                                     <button className="btn_delete" onClick={()=> onDeleteItem(item._id)}><AiTwotoneDelete /></button>
//                                                     </td>
//                                                 </tr>
//                                                 );
//                                             })
//                                         } 
//                                     </tbody>
//                                     </table>
                                    
//                                     {/* <div> {data.length === 0 && <p style={{textAlign:"center"}}> Data not found! </p>} </div> */}
//                             </div>
//                         </div>
//                 </main>
//                 {/* <footer className={styles.footer}>Footer</footer> */}
//             </div>
//         </div>
//     );
// }
// export default Customer;