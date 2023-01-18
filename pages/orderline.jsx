import CustomerNavbar from '../component/customernavbar';
import styles from '../styles/Pages.module.css'
const Orderline = () => {
    return (
        <div>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>Logout</div>
                </header>
                <nav className={styles.sidebar}>
                    <h2>Side Bar</h2>
                    <CustomerNavbar />
                </nav>
                <main className={styles.main}>
                    <div className="panel">
                        <div className="panel-body">
                            <form className={styles.form_container} >
                                <div></div>
                                <input type="date" name="date" className={styles.input} placeholder="" />
                                <input type="text" name="order_id" className={styles.input} placeholder=" Enter Order ID" />
                                <select name="item_name" id="" className={styles.input}>
                                    <option value="">-- Select Item --</option>
                                </select>
                                <input type="number" name="quantiy" className={styles.input} placeholder=" Enter Quantity" />
                                <input type="number" name="unit_price" className={styles.input} placeholder=" Enter Unit Price" />
                                <input type="number" name="amount" className={styles.input} placeholder=" Enter Amount" readOnly />
                                <div className="btn">
                                    <button type="submit" className={styles.btn_submit} > Add </button>&nbsp;
                                    <button type="reset" className={styles.btn_reset} > Reset </button>
                                </div>
                            </form>
                            <table className="styled_table">
                                <thead>
                                    <tr>
                                    <th style={{ textAlign: "center" }}> No. </th>
                                    <th style={{ textAlign: "center" }}> Date </th>
                                    <th style={{ textAlign: "center" }}> Order ID </th>
                                    <th style={{ textAlign: "center" }}> Item Name </th>
                                    <th style={{ textAlign: "center" }}> Quantity </th>
                                    <th style={{ textAlign: "center" }}> Unit Price </th>
                                    <th style={{ textAlign: "center" }}> Amount </th>
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
export default Orderline;