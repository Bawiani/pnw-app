import Navbar from '../component/navbar';
import styles from '../styles/Pages.module.css'
const Vieworder = () => {
    return (
        <div>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>Logout</div>
                </header>
                <nav className={styles.sidebar}>
                    <h2>Side Bar</h2>
                    <Navbar />
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
export default Vieworder;