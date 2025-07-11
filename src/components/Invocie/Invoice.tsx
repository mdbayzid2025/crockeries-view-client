import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useShop } from '../../app/Context/ShopContext';
import { useGetOrderByIdQuery } from '../../app/features/orderService';
import PageSpinner from '../Shared/PageSpinner';
import styles from './invoice.module.css';

interface OrderItem {
  code: string;
  name: string;
  brand: string;
  quantity: number;
  unit: string;
  price: number;
  discount: number;
  total: number;
}

interface OrderInfo {
  created_at: string;
  invoice_no: string;
  customer_name: string;
  customer_code: string;
  mobile: string;
  address: string;
  district: string;
  sub_total: number;
  discount: number;
  net_total: number;
  order_items: OrderItem[];
}


const Invoice = () => {
  const { id } = useParams<{ id: string }>();
  const { shop, loading: shopLoading } = useShop();
  const { data: orderData, isLoading: orderLoading } = useGetOrderByIdQuery(id || '');
  const contentRef = useRef<HTMLDivElement>(null);
  const [ordersInfo, setOrdersInfo] = useState<OrderInfo | null>(null);


  const reactToPrintFn = useReactToPrint({ contentRef });


  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (orderData?.data) {
      setOrdersInfo(orderData.data);
    }
  }, [orderData]);

  return (
    <div className={styles.invoiceContainer}>

      <div onClick={() => reactToPrintFn?.()}>
        <PrintButton />
      </div>
      {(shopLoading || orderLoading) ? <PageSpinner /> :
         <div ref={contentRef} className={styles.container}>
        {/* Rest of your invoice content remains the same */}
        {/* Header */}

        <div className={styles.px14}>
          <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0}`}>
            <tbody>
              <tr>
                <td >
                  <div className={styles.logoContainer}>
                    <div className={styles.logoContain}>
                      <img
                        src={shop?.logo ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1PUqNjMHYFvt0o1hzlilB2YTjP1xt9zkvg&s"}
                        className={styles.h12}
                        alt="Company Logo"
                      />
                      <h1>{shop?.site_name}</h1>
                    </div>
                  </div>
                </td>
                <td className={styles.alignTop}>
                  <table className={`${styles.invoiceTable}`}>
                    <tbody>
                      <tr style={{borderTop: 'none'}}>
                        <td className={styles.pl4} style={{border: 'none'}}>
                          <p style={{whiteSpace: "nowrap"}} className={`${styles.textRight} ${styles.textMain} ${styles.fontBold} `}>Invoice # :  {ordersInfo?.invoice_no}</p>                          
                          {ordersInfo && <p className={styles.textRight}>Date : &nbsp; 
                            {formatDate(ordersInfo?.created_at)}
                          </p>}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Address Info */}
        <div className={`${styles.py6} ${styles.textSm} ${styles.addressContainer}`}>
          <table className={`${styles.bgSlate100} ${styles.wFull}`}>
            <tbody>
              <tr>
                <td className={`${styles.wHalf} ${styles.textLeft}`}>
                  <p className={styles.fontBold}>{ordersInfo?.customer_name}</p>
                  <p>Code: {ordersInfo?.customer_code}</p>
                  <p>Mobile: {ordersInfo?.mobile}</p>
                  <p>{ordersInfo?.address}, {ordersInfo?.district}</p>
                </td>
                <td className={`${styles.wHalf} ${styles.textRight}`}>
                  {shop?.site_name && <p className={styles.fontBold}>{shop?.site_name}</p>}
                  {shop?.vat_no && <p>VAT: {shop?.vat_no}</p>}
                  {shop?.mobile && <p>Mobile: {shop?.mobile}</p>}
                  {shop?.district && <p>{shop?.address}, {shop?.district}</p>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Order Items */}
        <div className={`${styles.px14} ${styles.tableContainer}`}>
          <table className={`${styles.wFull} ${styles.productsTable}`}>
            <thead>
              <tr>
                <td>Sl No</td>
                <td>Item Code</td>
                <td>Item Name</td>
                <td>Brand</td>
                <td>Qty.</td>
                <td>Unit</td>
                <td>Price</td>
                <td>Discount</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              {ordersInfo?.order_items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.brand}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.discount.toFixed(2)}</td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}

              {/* Summary */}
              <tr>
                <td colSpan={9}>
                  <table className={styles.summaryTable}>
                    <tbody>
                      <tr>
                        <td className={styles.wFull} style={{border: "none", }}></td>
                        <td style={{border: "none", padding: '0px'}}>
                          <table className={styles.wFull}>
                            <tbody>
                              <tr>
                                <td style={{ whiteSpace: "nowrap"}} >Sub total:</td>
                                <td className={styles.textRight}>
                                  {ordersInfo?.sub_total.toFixed(2)}
                                </td>
                              </tr>
                              <tr>
                                <td>Discount:</td>
                                <td className={styles.textRight}>
                                  {ordersInfo?.discount.toFixed(2)}
                                </td>
                              </tr>
                              <tr className={styles.bgMain}>
                                <td style={{ whiteSpace: "nowrap"}} className={styles.textWhite}>Net Total:</td>
                                <td className={`${styles.textWhite} ${styles.textRight}`}>
                                  {ordersInfo?.net_total.toFixed(2)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={`${styles.footerContainer} ${styles.px14}`}>
          <div className={styles.footerLeft}>
            <p>Received By</p>
          </div>
          <div className={styles.footerRight}>
            <p>Authorized By</p>
          </div>
        </div>

        {/* Bottom Note */}
        {shop && (
          <footer className={`${styles.fixed}  ${styles.bottom0} ${styles.bgSlate100} ${styles.textCenter} ${styles.textXs}`}>
            {shop.site_name}
            <span className={styles.px2}>|</span>
            {shop.email}
            <span className={styles.px2}>|</span>
            {shop.mobile}
            <span className={styles.px2}>|</span>
            {shop.address} {shop.district}
          </footer>
        )}
      </div>
      }
   
    </div>
  );
};

export default Invoice;



const PrintButton = () => {


  return (
    <>
      <style>
        {`
        @keyframes pulse-print {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .print-icon-animated:hover {
          animation: pulse-print 1s infinite;
        }
        `}
      </style>

      <button
      className='print-btn'
        style={{
          position: 'fixed',
          bottom: '10%',
          right: '5%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 28px',
          backgroundColor: 'rgba(101, 114, 101,1)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
          fontFamily: 'Inter, sans-serif',
          outline: 'none',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#45a049';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.18)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(101, 114, 101,1)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        }}
      >
        <svg
          className="print-icon-animated"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            width: '24px',
            height: '24px',
            transition: 'transform 0.2s ease',
          }}
        >
          <path d="M6 3H18V7H6zM19 12H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM17 19H7v-3h10v3zM18 10H6V3h12v7zM16 13h-3V9h-2v4H8l4 4 4-4z" />
        </svg>
        <span>Print</span>
      </button>
    </>
  );
};