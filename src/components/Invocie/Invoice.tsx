import React, { useEffect, useRef, useState } from 'react';
import styles from './invoice.module.css';
import { useReactToPrint } from 'react-to-print';
import { useGetOrderByIdQuery } from '../../app/features/orderService';
import { useParams } from 'react-router-dom';
import { useShop } from '../../app/Context/ShopContext';


const siteInfo = {
  name: "Crockeries View",
  email: "abc@gmail.com",
  address: "Baitul Mukarram, Dhaka-1000",
  reg_no: "001235054-0208",
  district: "Dhaka",
  mobile: "01619788808",  
}
const sellerName = {
  sellerName: "Johirul",
  invoice_type: "Credit"
}

const Invoice = () => {
  const { id } = useParams();
  const { data: orderData, isLoading: orderLoading, isError: orderError } = useGetOrderByIdQuery(id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [ordersInfo, setOrdersInfo] = useState(null)
const reactToPrintFn = useReactToPrint({ contentRef });

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
};

const {shop, loadiding} = useShop()
useEffect(()=>{
if(orderData){
  setOrdersInfo(orderData?.data)
}
},[orderData])



if(loadiding){
  return <p>Loading....</p>
}
  return (
    <div className={styles.invoiceContainer} ref={contentRef}>
      <button onClick={() => reactToPrintFn()} className={styles.printButton}>
        Print Invoice
      </button>
      
      {/* ${styles.py6}
      ${styles.py4}
      */}
      <div  className={` ${styles.container}`} >
        <div className={`${styles.px14} `}>
          <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0} `}>
            <tbody>
              <tr>
                <td className={`${styles.wFull} ${styles.alignTop} `}>
                  <div className={`${styles.logoContainer}`}>
                  <div className={styles.logoContain}>
                    <img src={shop?.logo ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1PUqNjMHYFvt0o1hzlilB2YTjP1xt9zkvg&s"} className={styles.h12} alt="Company Logo" />
                    <h1>{shop?.site_name}</h1>
                  </div>
                  </div>                  
                </td>

                <td className={styles.alignTop} >
                  <div className={`${styles.textSm} `}>
                    <table className={`${styles.borderCollapse} ${styles.timeSection} ${styles.borderSpacing0} ${styles.invoiceTable}`}>
                      <tbody>
                      {orderData?.data && <tr>
                          <td className={`${styles.borderR} ${styles.pr4}`}>
                            <div>
                              <p className={`${styles.whitespaceNowrap} ${styles.textSlate400} ${styles.textRight}`}>Date</p>
                              <p className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain} ${styles.textRight}`}>
                              {formatDate(orderData?.data.created_at)}
                              </p>
                            </div>
                          </td>
                          <td className={styles.pl4}>
                            <div>
                              <p className={`${styles.whitespaceNowrap} ${styles.textSlate400} ${styles.textRight}`}>Invoice #</p>
                              <p className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain} ${styles.textRight}`}>{orderData?.data?.invoice_no}</p>
                            </div>
                          </td>
                          {/* <td className={styles.pl4}>
                            <div>
                              <p className={`${styles.whitespaceNowrap} ${styles.textSlate400} ${styles.textRight}`}>Invoice #</p>
                              <p className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain} ${styles.textRight}`}>{orderData?.data?.invoice_no}</p>
                            </div>
                          </td> */}
                        </tr>}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className={`${styles.bgSlate100} ${styles.px14} ${styles.py6} ${styles.textSm}`}> */}
        <div className={` ${styles.py6} ${styles.textSm} ${styles.addressContainer}`}>
          <table className={` ${styles.bgSlate100} ${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0}`}>
            <tbody>
              {orderData?.data &&  shop &&  <tr>
                <td className={` ${styles.wHalf} ${styles.alignTop} ${styles.textLeft}`}>
                  <div className={`${styles.textSm} ${styles.textNeutral600}`}>
                    <p className={styles.fontBold}>{orderData?.data?.customer_name}</p>
                    <p>Code: {orderData?.data?.customer_code}</p>
                    <p>Mobile: {orderData?.data?.mobile}</p>
                    <p>{orderData?.data?.address}, {orderData?.data?.district}</p>                           
                  </div>
                </td>
                <td className={`${styles.wHalf} ${styles.alignTop} ${styles.textRight}`}>
                  <div className={`${styles.textSm} ${styles.textNeutral600}`}>
                    <p className={styles.fontBold}>{shop?.site_name}</p>                    
                    <p>VAT: {shop?.vat_no}</p>                    
                    <p>Mobile: {shop?.mobile}</p>
                    <p>{shop?.address}, {shop?.district}.</p>
                  </div>
                </td>
              </tr>}
            </tbody>
          </table>
        </div>

        <div className={`${styles.px14} ${styles.textSm} ${styles.textNeutral700} ${styles.tableContainer}`}>
          <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0} ${styles.productsTable}`}>
            <thead>
              <tr>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl3} ${styles.fontBold} ${styles.textMain}`}>Sl No</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl3} ${styles.fontBold} ${styles.textMain}`}>Item Code</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.fontBold} ${styles.textMain}`}>Item Name</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textRight} ${styles.fontBold} ${styles.textMain}`}>Brand</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textCenter} ${styles.fontBold} ${styles.textMain}`}>Qty.</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textCenter} ${styles.fontBold} ${styles.textMain}`}>Unit</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textRight} ${styles.fontBold} ${styles.textMain}`}>Price</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textRight} ${styles.fontBold} ${styles.textMain}`}>Discount</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.pr3} ${styles.textRight} ${styles.fontBold} ${styles.textMain}`}>Amount</td>
              </tr>
            </thead>
            <tbody>
              {ordersInfo?.order_items && ordersInfo?.order_items.map((item, index)=>
              <tr key={index}>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl3}`}>{index + 1}.</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2}`}>{item?.code}</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textRight}`}>{item?.name}</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textCenter}`}>{item?.brand}</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textCenter}`}>{item?.quantity}</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} `}>{item?.unit}</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.pr3} `}>{item?.price}</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.pr3} `}>{item?.discount}</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.pr3} `}>{item?.total}</td>
              </tr>)}             
              <tr>
                <td colSpan="9">
                  <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0} ${styles.summaryTable}`}>
                    <tbody>
                      {ordersInfo && <tr>
                        <td className={styles.wFull} style={{borderBottom: "none"}}></td>
                        <td style={{borderBottom: "none"}}>
                          <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0}`}>
                            <tbody>
                              <tr>
                                <td className={`${styles.borderB} `}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.textSlate400}`}>Net total:</div>
                                </td>
                                <td className={`${styles.borderB}  ${styles.textRight}`}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain}`}>{ordersInfo?.sub_total}</div>
                                </td>
                              </tr>
                              <tr>
                                <td >
                                  <div className={`${styles.whitespaceNowrap} ${styles.textSlate400}`}>Discount:</div>
                                </td>
                                <td className={` ${styles.textRight}`}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain}`}>{ordersInfo?.discount}</div>
                                </td>
                              </tr>
                              <tr>
                                <td className={`${styles.bgMain} `}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textWhite}`}>Total:</div>
                                </td>
                                <td className={`${styles.bgMain}  ${styles.textRight}`}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textWhite}`}>{ordersInfo?.net_total}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      

        <div className={`${styles.footerContainer} ${styles.px14} ${styles.textSm} ${styles.textNeutral700}`}>
          <div className={`${styles.footerLeft}`}>
                <p>Received By</p>
          </div>
          <div className={styles.footerRight}>
                
                <p>Authorized By</p>
          </div>
        </div>
        
        {/* <div className={`${styles.px14} ${styles.py10} ${styles.textSm} ${styles.textNeutral700}`}>
          <p className={`${styles.textMain} ${styles.fontBold}`}>Notes</p>
          <p className={styles.italic}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
        </div> */}

     {shop &&   <footer className={`${styles.fixed} ${styles.bottom0} ${styles.left0} ${styles.bgSlate100} ${styles.wFull} ${styles.textNeutral600} ${styles.textCenter} ${styles.textXs} ${styles.py3}`}>
        {shop?.site_name}
          <span className={`${styles.textSlate300} ${styles.px2}`}>|</span>
          {shop?.email}
          <span className={`${styles.textSlate300} ${styles.px2}`}>|</span>
          {shop?.mobile}
          <span className={`${styles.textSlate300} ${styles.px2}`}>|</span>
          {shop?.address} {shop?.district}
        </footer>}
      </div>
    </div>
  );
};

export default Invoice;