import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css'
const Viewsales = () => {
    const [data, setData] = useState('');

    useEffect(()=>{
        salesData();
    });

    const salesData = async()=>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pendingsales`);
        if(response.status === 200){
            //console.log(response.data.data);
            // const results = response.data.data;
            setData(response.data.data);
        }
    }

    const onReadySales = async(_id)=>{
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/readysales/${_id}`,{
            status:'Ready'
        }).then((response)=>{
            //setData(response.data.data);
            //console.log(response.data.data);
        }).catch((err)=>{
            console.log(err.response);
        });
    }

    const onDeliverySales = async(_id)=>{
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/deliverysales/${_id}`,{
            status:'Delivery'
        }).then((response)=>{
            //setData(response.data.data);
        }).catch((err)=>{
            console.log(err.response);
        });
    }
    return (
        <div>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>Logout</div>
                </header>
                <nav className={styles.sidebar}>
                    <h2>Side Bar</h2>
                    <Navbar/>
                </nav>
                <main className={styles.main}>
                <div className="panel-sales">
                        <div className="viewsaleswrapper">
                            <table className="styled_table">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center" }}> No. </th>
                                        <th style={{ textAlign: "center" }}> Date </th>
                                        <th style={{ textAlign: "center" }}> Order No. </th>
                                        <th style={{ textAlign: "center" }}> Customer </th>
                                        {/* <th style={{ textAlign: "center" }}> Item No. </th> */}
                                        <th style={{ textAlign: "center" }}> Description </th>
                                        <th style={{ textAlign: "center" }}> Qty </th>
                                        <th style={{ textAlign: "center" }}> Unit Price  </th>
                                        <th style={{ textAlign: "center" }}> Amount </th>
                                        <th style={{ textAlign: "center" }}> Status </th>
                                        <th style={{ textAlign: "center" }}> Action(s) </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map((sale, index) => {
                                        return (
                                        <tr key={sale._id}>
                                            <th scope='row'> { index + 1 } </th> 
                                            <td> {sale.date} </td>
                                            <td> {sale.order_id} </td>
                                            <td> {sale.customer_id.firstname} {sale.customer_id.lastname} </td>
                                            {/* <td> {sale.item.item_no} </td>  */}
                                            <td> {sale.item.description} </td>
                                            <td> {sale.quantity} </td>
                                            <td> {sale.item.unit_price} </td>
                                            <td> {sale.amount} </td>
                                            <td> {sale.status} </td>
                                            <td style={{textAlign: "center"}}>
                                                {sale.status === 'Pending' && <a className="btn_edit" onClick={()=> onReadySales(sale._id)} ><IoIosCheckmarkCircleOutline /></a>}
                                                
                                                {sale.status === 'Ready' && <a className="btn_delete" onClick={()=> onDeliverySales(sale._id)} ><AiOutlineDeliveredProcedure /></a>}
                                            </td>
                                        </tr>
                                        );
                                        
                                    })}  
                                </tbody> 
                                </table>
                                {/* <div className={styles.btn}> {data.length !== 0 && <button className={styles.btn_generateInvoice}   onClick={()=> {PrintElem('invoice')}} >Generate Invoice</button> } </div>*/}
                                <div> {data.length === 0 && <p style={{textAlign:"center"}}> Data not found! </p>} </div> 
                        </div>
                    </div>
                </main>
                {/* <footer className={styles.footer}>Footer</footer> */}
            </div>
        </div>
    );
}
export default Viewsales;