import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css';
import { BiEdit } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
import Link from 'next/link';
const Item = () => {

    const initState = { item_no:'', description:'', unit_price:'' };

    const [state, setState] = useState(initState);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');

    const { item_no, description, unit_price } = state;

    useEffect(()=>{
        itemData();
    }, []);

    const itemData = async() =>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`);
        if(response.status === 200){
            setData(response.data);
        }
    }

    const saveItem = async() => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/item`,{
            item_no:item_no, description:description, unit_price:unit_price
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
        if(!item_no || !description || !unit_price){
            setMessage("Please provide value for each input field!");
        }else{
            if (!id) {
                saveItem(state);
            }else{
                updateItem(state);
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

    const onLoadItem = async(_id) =>{
        setId(_id);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/item/${_id}`);
        if(response.status === 200){
            setState(response.data);
        }
    }

    const updateItem = async() =>{
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/item/${id}`,{
            item_no:item_no, description:description, unit_price:unit_price
        }).then((response)=>{
            setState(initState);
        }).catch((err)=>{
            console.log(err.response);
        }).finally(()=>{
            itemData();
            setId('');
        });
    }

    const onDeleteItem = async(_id) =>{
        if(window.confirm("Are you sure you want to delete this item?")){
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/item/${_id}`);
            if(response.status === 200){
                itemData();
                window.alert("Item deleted successfully!");
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
                                <input type="text" name="item_no" className={styles.input} placeholder=" Enter Item Number" onChange={handleInput} value={item_no} />
                                <input type="text" name="description" className={styles.input} placeholder=" Enter Item Description" onChange={handleInput} value={description} />
                                <input type="number" name="unit_price" className={styles.input} placeholder=" Enter Unit Price" onChange={handleInput} value={unit_price} />
                                <div className="btn">
                                    <button type="submit" className={styles.btn_submit} > {id ==='' ? "Add":"Update"} </button>&nbsp;
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
                                        <th style={{ textAlign: "center" }}> Item No. </th>
                                        <th style={{ textAlign: "center" }}> Description </th>
                                        <th style={{ textAlign: "center" }}> Unit Price </th>
                                        <th style={{ textAlign: "center" }}> Action(s) </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((item, index) => {
                                                return (
                                                <tr key={index}>
                                                    <th scope="row"> {index + 1} </th> 
                                                    <td> {item.item_no} </td>
                                                    <td> {item.description} </td>
                                                    <td> {item.unit_price} </td> 
                                                    <td> 
                                                    
                                                    <button className="btn_edit" onClick={()=> onLoadItem(item._id)}><BiEdit /></button>&nbsp;
                                                    <button className="btn_delete" onClick={()=> onDeleteItem(item._id)}><AiTwotoneDelete /></button>
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
export default Item;