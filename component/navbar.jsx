import Link from "next/link"
import styles from '../styles/Pages.module.css'
import {useState, useEffect} from "react"
import { useRouter } from "next/router";
import axios from "axios";
const Navbar = () => {

const [item, setItem]=useState(false);
const [customer, setCustomer]=useState(false);
const [production, setProduction] = useState(false);
const [sales, setSales] = useState(false);
const [user, setUser] = useState(false);
const [role, setrole] = useState("");
const [data, setdata] = useState("");

// const router = useRouter();
// const id = router.query.id;

// useEffect(()=>{
//     //userData();
// },[]);

// console.log(id);
// const userData = async(id) => {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${_id}`);
//         if(response.status === 200){
//             console.log(response.data);
//             //setRole(response.data.role);
//         }
// }
useEffect(()=>{
    if(sessionStorage.getItem("user")){
        const userData = JSON.parse(sessionStorage.getItem("user"))
        setdata(userData)
        const userRole = userData.role.toLowerCase().trim()
        setrole(userRole)
        
    }
},[])
function dropItem(){
    setItem(!item);
    setCustomer(false);
    setProduction(false);
    setSales(false);
    setUser(false);
}
function dropCustomer(){
    setItem(false);
    setCustomer(!customer);
    setProduction(false);
    setSales(false);
    setUser(false);
}
function dropProduction(){
    setItem(false);
    setCustomer(false);
    setProduction(!production);
    setSales(false);
    setUser(false);
}
function dropSales(){
    setItem(false);
    setCustomer(false);
    setProduction(false);
    setSales(!sales);
    setUser(false);
}
function dropUser(){
    setItem(false);
    setCustomer(false);
    setProduction(false);
    setSales(false);
    setUser(!user);
}

    return (
        
                <div className={styles.menu}>
                    <div className={styles.item}>
                       
                        <a href="#">Dashboard</a>
                    </div>
                    <div className={styles.item}>
                       {
                        role === "admin" &&
                        <a className={styles.subbtn} onClick={dropItem}>
                        Register Item
                        <i className={styles.dropdown}></i>
                    </a>
                       }
                       {
                           item &&
                           <div className={styles.submenu}>
                                <Link href="/item"><a onClick={dropItem} className={styles.subitem}>New</a></Link>
                                <Link href="#"><a onClick={dropItem} className={styles.subitem}>View</a></Link>
                           </div>
                       }
                    </div>
                    <div className={styles.item}>
                     {
                        role === "customer" || role === "admin" ?
                        <a className={styles.subbtn} onClick={dropCustomer}>
                        Customer
                        <i className={styles.dropdown}></i>
                    </a>
                    : ""
                     }
                        {
                            customer &&
                            <div className={styles.submenu}>
                                <Link href="/customer"><a onClick={dropCustomer} className={styles.subitem}>New</a></Link>
                                <Link href="#"><a onClick={dropCustomer} className={styles.subitem}>View</a></Link>
                            </div>
                        }
                    </div>
                    {/* {
                        role == "admin" || role == "production" ? */}
                        {
                              role === "production" || role === "admin" ?
                        <div className={styles.item}>
                        <a className={styles.subbtn} onClick={dropProduction}>
                            Production
                            <i className={styles.dropdown}></i>
                        </a>
                        
                            {
                                production &&
                                <div className={styles.submenu} >
                                    <Link href="/production"><a onClick={dropProduction} className={styles.subitem}>New</a></Link>
                                    <Link href="/viewsales"><a onClick={dropProduction} className={styles.subitem}>View Sales</a></Link>
                                </div>
                            }
                    </div>
                     : ""
                    }
               
                  { role === "sales" || role === "admin" ?
                      <div className={styles.item}>
                      <a className={styles.subbtn} onClick={dropSales}>
                          Sales
                          <i className={styles.dropdown}></i>
                      </a>

                      { 
                          sales &&
                          <div className={styles.submenu}>
                              <Link href="/sales"><a onClick={dropSales} className={styles.subitem}>New</a></Link>
                              <Link href="/vieworder"><a onClick={dropSales} className={styles.subitem}>View Orders</a></Link>
                              <Link href="/viewproduction"><a onClick={dropSales} className={styles.subitem}>View Products</a></Link>
                          </div>
                      }
                  </div>
                   : ""
                  }
                    <div className={styles.item}>
                        <a className={styles.subbtn} onClick={dropUser}>
                            User Account
                            <i className={styles.dropdown}></i>
                        </a>

                        { 
                            user &&
                            <div className={styles.submenu}>
                                {
                                role === "admin" &&
                                <Link href="/user"><a onClick={dropUser} className={styles.subitem}>New</a></Link>
                                }
                                <Link href="/show/user"><a onClick={dropUser} className={styles.subitem}>my account</a></Link>
                            </div>
                        }
                    </div>
                </div>
              
    );
}
export default Navbar;