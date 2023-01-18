import { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css';
import { BiEdit } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
const Production = () => {

    //const initState = { description:''};
    useEffect(()=>{
        productData();
        getDate();
        items();
    }, []);

    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const [itemid, setItemid] = useState(options[0]);
    
    const [tid, setTid] = useState(options[0]);
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();
    //const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    //const [date, setDate] = useState(Date);

    //const { description } = state;

    

    const getDate = () => {
        let tempDate = new Date();
        let date = tempDate.getDate() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getFullYear();
        setDate(date);
      }
      
    const productData = async() =>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if(response.status === 200){
            //console.log(response.data.data);
            setData(response.data.data);
        }
    }

    const saveProduct = async() => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product`,{
            date:date, item_id:tid, quantity:quantity
        }).then((response)=>{
            const result = response.data.data;
            setData([...data, result]);
            setTid(options[0]);
            setDescription('');
            setQuantity('');
        }).catch((err)=>{
            console.log(err.response);
        });
    }

    const saveData = (e)=>{
        e.preventDefault();
        if(!date || !tid || !quantity){
            console.log("Please provide value for each input field!");
        }else{
            if (!id) {
                saveProduct();
            }else{
                updateProduct();
            }
        }
    }

    const resetFileds = () => {
        setDescription('');
        setId('');
    }

    const onLoadProduct = async(_id) =>{
        setId(_id);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${_id}`);
        if(response.status === 200){
            //setState(response.data);
            setDate(response.data.data.date);
            setTid(response.data.data.item._id);
            setItemvalue(response.data.data.item.item_no);
            setDescription(response.data.data.item.description);
            setQuantity(response.data.data.quantity);
        }
    }

    const updateProduct = async() =>{
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,{
            date:date, item_id:tid, quantity:quantity
        }).then((response)=>{
            console.log(response.data);
            // setDate(currDate);
            // setTid("-- Select Item No. --")
            // setDescription('');
            // setQuantity("");
        }).catch((err)=>{
            console.log(err.response);
        }).finally(()=>{
            productData();
            setId('');
        });
    }

    const onDeleteProduct = async(_id) =>{
        if(window.confirm("Are you sure you want to delete this product?")){
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/${_id}`);
            if(response.status === 200){
                productData();
                window.alert("Product deleted successfully!");
            }
        }
    }

    const items = async() => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`);
        if(response.status === 200){
            const items = response.data;
            const item = [{_id: "-- Select Item No. --", item_no: "-- Select Item No. --"}];
            for (let i = 0; i < items.length; i++) {
                item.push(items[i]);
            }
            console.log(item);
            setOptions(item);
        }
      }
      const [itemvalue, setItemvalue] = useState(options[0]);
      
      const handleDate = (e) => {
        setDate(e.target.value);
    }
      const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }

      const handleItem = async(e) => {
        //let {name, value} = e.target;
        const ivalue = e.target.value;
        console.log(ivalue);
        if(ivalue !== '-- Select Item No. --'){
            setItemid(e.target.value);
            //console.log(itemid);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/item/${ivalue}`);
            if (response.status === 200) {
                //setOptions(response.data);
                setTid(response.data.data.item._id);
                //setItemvalue(response.data.item_no);
                setDescription(response.data.data.item.description);
                //console.log(response.data.data.description);
                items();
            }
        }else{
            setTid(e.target.value);
            //console.log(itemid);
            // setOptions(options[0]);
            setDescription('');
        } 
    }

    const handleInput = (e) => {
        setDescription(e.target.value);
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
                                <div></div>
                                <input type="text" name="date" className={styles.input} onChange={handleDate} value={date} readOnly />
                                <select name="itemid" className={styles.input}   onChange={handleItem} value={tid}>
                                    {/* <option value={tid}> {itemvalue} </option> */}
                                    {options.map ((value)=>{
                                        return (
                                            <option key={value} value={value._id}>{value.item_no}</option>
                                        )})}
                                </select>
                                <input type="text" name="description" className={styles.input} placeholder=" Enter Item Description" onChange={handleInput}  value={description} />
                                <input type="number" name="quantity" className={styles.input} placeholder=" Enter Quantity" onChange={handleQuantity} value={quantity} />
                                
                                <div className="btn">
                                    <button type="submit" className={styles.btn_submit}> {id === ''?"Add":"Update"}</button>&nbsp;
                                    <button type="reset" className={styles.btn_reset} > Reset </button>
                                </div>
                            </form>
                        </div>
                        <div className='form_right'>
                            <div className="wrapper">
                                <table className="styled_table">
                                    <thead>
                                        <tr>
                                        <th style={{ textAlign: "center" }}> No. </th>
                                        <th style={{ textAlign: "center" }}> Date </th>
                                        <th style={{ textAlign: "center" }}> Item No. </th>
                                        <th style={{ textAlign: "center" }}> Description </th>
                                        <th style={{ textAlign: "center" }}> Quantity </th>
                                        <th style={{ textAlign: "center" }}> Action(s) </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((product, index) => {
                                                return (
                                                <tr key={product._id}>
                                                    <th scope="row"> {index + 1} </th> 
                                                    <td> {product.date} </td>
                                                    <td> {product.item.item_no} </td>
                                                    <td> {product.item.description} </td> 
                                                    <td> {product.quantity} </td> 
                                                    <td>
                                                    <a className="btn_edit" onClick={()=> onLoadProduct(product._id)}><BiEdit /></a>&nbsp;
                                                    <a className="btn_delete" onClick={()=> onDeleteProduct(product._id)}><AiTwotoneDelete /></a>
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
export default Production;