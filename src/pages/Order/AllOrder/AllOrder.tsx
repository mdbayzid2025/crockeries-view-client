import React, { useEffect, useState } from 'react';
import styles from './AllOrder.module.css';
import { CiSearch } from "react-icons/ci";
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderStatusMutation } from '../../../app/features/orderService';
import { Link } from 'react-router-dom';
import useConfirmationModal from '../../../hooks/useConfirmationModal';
import ConfirmationModal from '../../../components/Shared/ConfirmationModal';
import emptyImg  from "../../../assets/empty_order.jpg";

const AllOrder = ({status}) => {
  const { data, isLoading, isError } = useGetOrdersQuery(status);
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const {isOpen, showConfirmation, handleConfirm, handleCancel, modalProps} = useConfirmationModal()
  const[deleteOrder, {isLoading: orderDeleting}] = useDeleteOrderMutation();
  const [updateOrderStatus, {isLoading:updateStatus}]= useUpdateOrderStatusMutation();
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
  
    if (data) {      
      console.log("dddd", data);
      setOrders(data);
    }
  }, [data]);

  // Filter data
  const filteredOrders = orders?.filter((order) =>
    order.invoice_no?.toLowerCase().includes(searchTerm.toLowerCase()) | order?.customer_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to load orders.</p>;


  // ---------- Handle Delete ------------
const handleDelete = async (id: string) => {
    const shouldDelete = await showConfirmation({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this order?',
      confirmText: 'Delete',
    });
    
    if (shouldDelete) {
      // Perform delete action
      try {
        const result = await deleteOrder(id);  
  
        console.log("delete r", result)
      } catch (error) {
        console.log('Item deleted:', error);
      }        
      }
  };

  // ---------- Handle Delete ------------
  const handleUpdateStatus = async (id: string, e: any) => {
    try {
      // const status = e.target.value;  
      // Call the update order status function with the selected status and orderId
      const result = await updateOrderStatus({ id, status: e.target.value});
  
      console.log("Update result:", result);
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <CiSearch size={25} />
          <input
            type="text"
            placeholder="Search by Order Number.."
            className={styles.input}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredOrders?.length > 0 ? filteredOrders.map((order, index) => (
        <div key={index}>
          {/* -------- Order Header -------- */}
          <div className={styles.orderHeader}>
            <div className={styles.leftContant}>
              <p className={styles.customer}>
              <b>Customer:</b>  {order.customer_name} <span>({order.customer_code})</span>
              </p>
              <p> <b>Mobile:</b>{order.mobile}</p>
              <p className={styles.address}><b>Shipping Address:</b> {order.address}, {order.district}</p>
            </div>

            <div className={styles.rightContant}>
              <div className={styles.btnContainer}>
              <Link to={`/invoice/${order._id}`} className={styles.printButton}>Print</Link>
              <Link to={`/order/${order._id}`} className={styles.editButton}>Edit</Link>
              <a onClick={()=>handleDelete(order?._id)} className={styles.deleteButton}>{orderDeleting ? "Deleting" : "Delete"}</a>
              </div>
              
              <h3>Order No : {order?.invoice_no}</h3>
              <div className={styles.statusContainer}>
                <p className={styles.status}>Status: <span>{order.status}</span></p>
                <select onChange={(e) => handleUpdateStatus(order._id, e)} name="status" defaultValue={order.status}>
                  <option disabled value={status}>Change</option>
                  <option value="rough">Rough</option>
                  <option value="ladger">Ladger</option>
                </select>
              </div>
              <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* -------- Table -------- */}
          <div className={styles.pageTable}>
            <table>
              <thead>
                <tr className={styles.tableHeader}>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.order_items.map(item => (
                  <tr key={item._id}>
                    <td>
                      <img src={item.image} alt={item.name} className={styles.tableImage} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.category}</td>
                    <td>{item.brand}</td>
                    <td>{item.unit}</td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}

                {/* -------- Summary Row -------- */}
                <tr>
                  <td colSpan={9}>
                    <div className={styles.wrapper}>
                      <div className={styles.itemRow}>
                        <p className={styles.label}>Subtotal</p>
                        <p className={styles.value}>{order.sub_total}</p>
                      </div>
                      <div className={styles.itemRow}>
                        <p className={styles.label}>Discount</p>
                        <p className={styles.value}>{order.discount}</p>
                      </div>
                      <div className={styles.totalContainer}>
                        <p className={styles.totalLabel}>Net Total</p>
                        <p className={styles.totalValue}>{order.net_total}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )): 
      <>
      <div className={styles.emptycontainer}>
            <div className={styles.box}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="Empty Box"
                className={styles.image}
              />
              <h2 className={styles.title}>No Orders Yet</h2>
              <p className={styles.subtitle}>Your recent orders will appear here once available.</p>
            </div>
          </div>
            {/* <div className={styles.emptyOrderContainer}>
              
              <img 
                  src={emptyImg} 
                  alt="No orders illustration" 
                  className={styles.emptyIllustration}/>
              <h2>No Orders Yet</h2>
              <p>When you create orders, they'll appear here. Get started by creating your first order.</p>
              <button className={styles.addOrderBtn} >Create New Order</button>
              
              <div className={styles.attribution}>
                  Illustration by <a href="https://www.freepik.com/" target="_blank">Freepik</a>
              </div>
          </div> */}
      </>
     
      }      
                       <ConfirmationModal
                       isOpen={isOpen}
                       title={modalProps.title}
                       message={modalProps.message}
                       confirmText={modalProps.confirmText}
                       cancelText={modalProps.cancelText}
                       onConfirm={handleConfirm}
                       onCancel={handleCancel}
                     />
    </div>
  );
};

export default AllOrder;