import { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css';
import { BiEdit } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
import axios from 'axios';
import { PrintElem } from '../utils/print_pdf';
import Link from 'next/link';

const Sales = () => {
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const [itemid, setItemid] = useState(options[0]);
    
    const [tid, setTid] = useState();
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();
    const [id, setId] = useState('');
    const [price, setPrice] = useState();
    const [amount, setAmount] = useState();
    const [vat, setVAT] = useState();
    const [nhil, setNHIL] = useState();
    const [totalvat, setTotalVAT] = useState();
    const [totalamount, setTotalAmount] = useState();
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [qtyremaining, setQtyRemaining] = useState('');
    const [orderid, setOrderid] = useState('');
    const [message, setMessage] = useState('');
    const initState = { _id:'', customer_id:'' };
    const [state, setState] = useState(initState);
    const { _id, customer_id } = state;
    let sum = 0;

    useEffect(()=>{
        //productData();
        //customerData();
        getDate();
        items();
    }, []);

    const getDate = () => {
        let tempDate = new Date();
        let date = tempDate.getDate() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getFullYear(); 
        const currDate = date;
        setDate(currDate);
      }
      
    const salesData = async() =>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sales`);
        if(response.status === 200){
            setData(response.data.data);
        }
    }

    const saveSales = async() => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sales`,{
            customerid:_id, orderid:orderid, date:date, item_id:tid, quantity:quantity, amount:amount
        }).then((response)=>{
            const result = response.data.data;
            setData([...data, result]);
            // setTid(options[0]);
            // setDescription('');
            // setQuantity('');
            // setPrice('');
            // setAmount('');
            // setVAT('');
            // setNHIL('');
            // setTotalVAT('');
            // setTotalAmount('');
            // setState(initState);
            // setSearch('');
        }).catch((err)=>{
            console.log(err.response);
        });
    }

    const saveData = (e)=>{
        e.preventDefault();
        if(!date || !tid || !quantity || !amount){
            console.log("Please provide value for each input field!");
        }else{
            if (!id) {
                saveSales();
            }else{
                updateSales();
            }
        }
    }

    const resetFileds = () => {
        setDescription('');
        setId('');
    }

    const onLoadSales = async(_id) =>{
        setId(_id);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sales/${_id}`);
        if(response.status === 200){
            //console.log(response.data);
            setState(response.data.data.customer_id);
            setDate(response.data.data.date);
            setTid(response.data.data.item._id);
            setItemvalue(response.data.data.item.item_no);
            setDescription(response.data.data.item.description);
            setQuantity(response.data.data.quantity);
            setPrice(response.data.data.item.unit_price);

            // 
            setAmount(quantity * price);
            setVAT(0.15 * quantity * price);
            setNHIL(0.025 * quantity * price);
            setTotalVAT((0.15 * quantity * price) + (0.025 * quantity * price));
            setTotalAmount((quantity * price) + (0.15 * quantity * price) + (0.025 * quantity * price) + (0.15 * quantity * price) + (0.025 * quantity * price));
        }
    }

    const updateSales = async() =>{
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/sales/${id}`,{
            customerid:_id, orderid:order_id, date:date, item_id:tid, quantity:quantity, amount:amount
        }).then((response)=>{
            //setData(response.data);
            //console.log(response.data);
            //console.log(response.data);
            // setDate(currDate);
            // setTid("-- Select Item No. --")
            // setDescription('');
            // setQuantity("");
        }).catch((err)=>{
            console.log(err.response);
        }).finally(()=>{
            salesData();
            setId('');
        });
    }

    const onDeleteSales = async(_id) =>{
        if(window.confirm("Are you sure you want to delete this sales?")){
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/sales/${_id}`);
            if(response.status === 200){
                //productData();
                window.alert("Sales deleted successfully!");
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
            setOptions(item);
        }
      }
      const [itemvalue, setItemvalue] = useState(options[0]);
      
      const handleDate = (e) => {
        setDate(e.target.value);
    }
      const handleItem = async(e) => {
        //let {name, value} = e.target;
        const ivalue = e.target.value;
        console.log(ivalue);
        if(ivalue !== '-- Select Item No. --'){
            // setItemid(e.target.value);
            //console.log(itemid);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/item/${ivalue}`);
            if (response.status === 200) {

                setQtyRemaining(response.data.data.sumOfQnty);
                //console.log(response.data.data._id);
                //setOptions(response.data);
                setTid(response.data.data.item._id);
                //console.log(response.data.item_no);
                setDescription(response.data.data.item.description);
                setPrice(response.data.data.item.unit_price)
                items();
            }
            
        }else{
            setTid(e.target.value);
            //console.log(itemid);
            // setOptions(options[0]);
            setDescription('');
            setPrice(0);
        } 
    }

    const handleInput = (e) => {
        setDescription(e.target.value);
    }
    const handleQuantity = (e) => {
        //console.log(qtyremaining);
        setQuantity(e.target.value);
        const qty = e.target.value;
        if(qtyremaining >= qty){
            setAmount(qty * price);
            setVAT(0.15 * qty * price);
            setNHIL(0.025 * qty * price);
            setTotalVAT((0.15 * qty * price) + (0.025 * qty * price));
            setTotalAmount((qty * price) + (0.15 * qty * price) + (0.025 * qty * price) + (0.15 * qty * price) + (0.025 * qty * price));
        }else{
            setMessage("Please, quantity remaining is less than quantity specified!");
        }  
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }
    const handleAmount = (e) => {
        setAmount(e.target.value);
    }
    const handleVAT = (e) => {
        setVAT(e.target.value);
    }
    const handleNHIL = (e) => {
        setNHIL(e.target.value);
    }
    const handleTotalVAT = (e) => {
        setTotalVAT(e.target.value);
    }
    const handleTotalAmount = (e) => {
        setTotalAmount(e.target.value);
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    const handleQtyRemaining = (e) => {
        setQtyRemaining(e.target.value);
    }
    const handleCustomer = (e)=>{
        let {name, value} = e.target;
        setState({...state, [name]:value});
    }
    const handleOrder = (e)=>{
        setOrderid(e.target.value);
    }

    const onSearch = async() => {
        //console.log(search);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers`);
        if(response.status === 200){
            setCustomers(response.data);
            for (let i = 0; i < customers.length; i++) {
                if(customers[i].customer_id === search){
                    setState(customers[i]);
                }
            }
        }
    }

    const searchData = (e)=>{
        e.preventDefault();
        onSearch();
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
                    <div className="panel-sales">
                        <div className="">
                            <div>{message}</div>
                            <div>
                                <form onSubmit={searchData} >
                                    <input type="text" name="search" className={styles.searchInput} placeholder=" Search By Customer ID" onChange={handleChange} value={search} />
                                    <button type='submit' className={styles.btn_submit} > Search </button>
                                    <input type="text" name="search" className={styles.qtyremaining} placeholder=" Quantity Remaining" onChange={handleQtyRemaining} value={qtyremaining} />
                                </form>
                                
                            </div>
                            <form  onSubmit={saveData} >
                                <div className={styles.sales_form_container}>
                                    <div className={styles.column_one}>
                                        <input type="hidden" name="_id" className={styles.input} placeholder=" Enter Customer ID" onChange={handleCustomer} value={_id} readOnly />
                                        <input type="text" name="customerid" className={styles.input} placeholder=" Enter Customer ID" onChange={handleCustomer} value={customer_id} readOnly />
                                        <input type="text" name="orderid" className={styles.input} placeholder=" Enter Order ID" onChange={handleOrder} value={orderid} />
                                        <input type="text" name="date" className={styles.input} placeholder="" onChange={handleDate} value={date} readOnly />
                                        <select name="itemid" className={styles.input} onChange={handleItem} value={tid}>
                                            {/* <option value={tid}> {itemvalue} </option> */}
                                            {options.map ((value)=>{
                                                return (
                                                    <option key={value} value={value._id}>{value.item_no}</option>
                                                )})}
                                        </select>
                                    </div>
                                    <div className={styles.column_one}>
                                        <input type="text" name="description" className={styles.input} placeholder=" Enter Item Description" onChange={handleInput}  value={description} readOnly />
                                        <input type="number" name="quantity" className={styles.input} placeholder=" Enter Qunatity" onChange={handleQuantity} value={quantity} />
                                        <input type="number" name="unit_price" className={styles.input} placeholder=" Unit Price" onChange={handlePrice}  value={price} readOnly />
                                        <input type="number" name="amount" className={styles.input} placeholder=" Amount" onChange={handleAmount}  value={amount} readOnly />
                                    </div>
                                    <div className={styles.column_one}>
                                        <input type="number" name="vat" className={styles.input} placeholder=" VAT(15%)" onChange={handleVAT}  value={vat} readOnly />
                                        <input type="number" name="nhil" className={styles.input} placeholder=" NHIL(2.5%)" onChange={handleNHIL}  value={nhil} readOnly />
                                        <input type="number" name="total_vat" className={styles.input} placeholder=" Total VAT + NHIL" onChange={handleTotalVAT}  value={totalvat} readOnly />
                                        <input type="number" name="total_amount" className={styles.input} placeholder=" Total Amount" onChange={handleTotalAmount}  value={totalamount} readOnly />
                                    </div>
                                </div>
                                <div className={styles.btn}>
                                    <button type="submit" className={styles.btn_submit} > {id === ''?"Add":"Update"}</button>&nbsp;
                                    <button type="reset" className={styles.btn_reset} > Reset </button>
                                </div>
                            </form>
                        
                            <table className="styled_table">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center" }}> No. </th>
                                        <th style={{ textAlign: "center" }}> Date </th>
                                        <th style={{ textAlign: "center" }}> Item No. </th>
                                        <th style={{ textAlign: "center" }}> Description </th>
                                        <th style={{ textAlign: "center" }}> Quantity </th>
                                        <th style={{ textAlign: "center" }}> Unit Price  </th>
                                        <th style={{ textAlign: "center" }}> Amount </th>
                                        <th style={{ textAlign: "center" }}> Action(s) </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map((sale, index) => {
                                        return (
                                        <tr key={sale._id}>
                                            <th scope="row"> {index + 1} </th> 
                                            <td> {sale.date} </td>
                                            <td> {sale.item.item_no} </td>
                                            <td> {sale.item.description} </td> 
                                            <td> {sale.quantity} </td>
                                            <td> {sale.item.unit_price} </td>
                                            <td> {sale.amount} </td>
                                            <td>
                                            <a className="btn_edit" onClick={()=> onLoadSales(sale._id)}><BiEdit /></a>&nbsp;
                                            <a className="btn_delete" onClick={()=> onDeleteSales(sale._id)}><AiTwotoneDelete /></a>
                                            </td>
                                        </tr>
                                        );
                                        
                                    })} 
                                </tbody> 
                                </table>
                                <div className={styles.btn}> {data.length !== 0 && <button className={styles.btn_generateInvoice}   onClick={()=> {PrintElem('invoice')}} >Generate Invoice</button> } </div>
                                <div> {data.length === 0 && <p style={{textAlign:"center"}}> Data not found! </p>} </div>
                        </div>
                        <div id='invoice' style={{display:"none"}} >
                            <table style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th colspan="2"><img src="../../../quarrydust.jpg" alt="" width="40%" height="100%" style={{float:"left", paddingLeft:"5px", borderRadius:"50%"}} /></th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    <tr>
                                        <th colspan="4">&nbsp;</th>
                                    </tr>
                                    <tr>
                                        <th colspan="4">&nbsp;</th>
                                    </tr>
                                    <tr>
                                        <th colspan="2">&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th style={{float:"right", paddingRight:"30px"}}>Date: ...............</th>
                                    </tr>
                                    <tr>
                                        <th colspan="4">&nbsp;</th>
                                    </tr>
                                    <tr>
                                        <th colspan="4" style={{float:"left", paddingLeft:"40px"}}>Mr/Mrs:...............................................................................</th>
                                        
                                    </tr>
                                    <tr>
                                        <th colspan="4" style={{float:"left", paddingLeft:"40px"}}>Address:...............................................................................</th>
                                        
                                    </tr>
                                    <tr>
                                        <th colspan="4" style={{float:"left", paddingLeft:"40px"}}>Contact:...............................................................................</th>
                                        
                                    </tr>
                                    <tr>
                                        <th colspan="4">&nbsp;</th>
                                        
                                    </tr>
                                    <tr>
                                        <th colspan="4">&nbsp;</th>
                                        
                                    </tr>
                                </thead>
                            </table>
                            <table style={{width:"100%"}}>
                                <thead>
                                    
                                    <tr>
                                        <th>Qty</th>
                                        <th>Description</th>
                                        <th>Unit Price</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map((sale, index)=> {
                                            
                                            sum = sum + sale.amount;
                                            //setTotalCost(sum);
                                            return(
                                                <tr key={sale.id}>
                                                    <td style={{ textAlign: "center" }}>{sale.quantity}</td>
                                                    <td style={{ textAlign: "center" }}>{sale.item.description}</td>
                                                    <td style={{ textAlign: "center" }}>{sale.item.unit_price}</td>
                                                    <td style={{ textAlign: "center" }}>{sale.amount}</td>
                                                        
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <th colspan="4">&nbsp;</th>
                                        </tr>
                                        <tr>
                                            <td colspan="2">&nbsp;</td>
                                            <th>Total Amount</th>
                                            <td style={{textAlign: "center"}}>{sum}</td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                {/* <footer className={styles.footer}>Footer</footer> */}
            </div>
        </div>
    );
}
export default Sales;