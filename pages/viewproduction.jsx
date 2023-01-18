import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css'
const Viewproduction = () => {
    // const [data, setData] = useState([]);

    useEffect(()=>{
        productData();
    },[]);

    const productData = async() =>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productsproduced`);
        if(response.status === 200){
            console.log(response.data.data);
            //setData(response.data.data);
        }
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
                                    <th style={{ textAlign: "center" }}> Item No. </th>
                                    <th style={{ textAlign: "center" }}> Description </th>
                                    <th style={{ textAlign: "center" }}> Quantity Produced </th>
                                    <th style={{ textAlign: "center" }}> Quantity Remaining </th>
                                    <th style={{ textAlign: "center" }}> Action(s) </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    (() => {
                                        return (
                                        <tr key="">
                                            <th scope=""> {} </th> 
                                            <td> {} </td>
                                            <td> {} </td>
                                            <td> {} </td> 
                                            <td> {} </td> 
                                            <td>
                                            <a href="" className="btn_edit"></a>&nbsp;
                                            <a className="btn_delete" onClick="">Delete</a>
                                            </td>
                                        </tr>
                                        );
                                    })} 
                                </tbody> 
                            </table>
                            <div> {<p style={{textAlign:"center"}}> Data not found! </p>} </div>
                        </div>
                    </div>
                </main>
                {/* <footer className={styles.footer}>Footer</footer> */}
            </div>
        </div>
    );
}
export default Viewproduction;