import React, { useEffect, useState } from 'react';
import styles from './DraftOrder.module.css';
import { CiSearch } from "react-icons/ci";
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderStatusMutation } from '../../../app/features/orderService';
import { Link } from 'react-router-dom';
import useConfirmationModal from '../../../hooks/useConfirmationModal';
import ConfirmationModal from '../../../components/Shared/ConfirmationModal';
import PageSpinner from '../../../components/Shared/PageSpinner';


const DraftOrder = ({status}: any) => { // Type status as any
  const { data, isLoading, isError } = useGetOrdersQuery(status);
  const [orders, setOrders] = useState<any[]>([]); // Type orders as any array  
  const {isOpen, showConfirmation, handleConfirm, handleCancel, modalProps} = useConfirmationModal();
  const[deleteOrder, {isLoading: orderDeleting}] = useDeleteOrderMutation();
  const [updateOrderStatus]= useUpdateOrderStatusMutation();
  const [loading, setLoading] = useState<boolean>(false); // Type loading as boolean
  
  const [searchTerm, setSearchTerm] = useState<string>(""); // Type searchTerm as string

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  if (isLoading) return <PageSpinner />;
  if (isError) return <p>Failed to load orders.</p>;

  const filteredOrders = (orders as any[])?.filter((order: any) => // Cast orders and type order as any
    order?.invoice_no?.toLowerCase().includes(searchTerm.toLowerCase()) || order?.customer_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => { // id is already typed as string
    const shouldDelete = await showConfirmation({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this order?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });
    
    if (shouldDelete) {
      try {
        setLoading(true);
        const result = await deleteOrder(id).unwrap(); // Use unwrap() for better error handling
        console.log("delete result:", result); // Changed variable name to avoid conflict
        setLoading(false);
      } catch (error: any) { // Type error as any
        console.log('Item deletion failed:', error?.data?.message || error?.message || 'Unknown error');
        setLoading(false); // Ensure loading is reset on error
      }        
    }
  };

  const handleUpdateStatus = async (id: string, e: React.ChangeEvent<HTMLSelectElement>) => { // Type 'e'
    try {
      const newStatus = e.target.value; // Renamed to newStatus to avoid conflict with `status` prop
      const result = await updateOrderStatus({ id, status: newStatus}).unwrap(); // Use unwrap()
      console.log("Update result:", result);
    } catch (error: any) { // Type error as any
      console.log("Error updating status:", error?.data?.message || error?.message || 'Unknown error');
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} // Type 'e'
          />
        </div>
      </div>

      {filteredOrders?.length > 0 ? filteredOrders.map((order: any, index: number) => ( // Type order and index as any/number
        <div key={index}>
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
              <a onClick={() => handleDelete(order?._id)} className={styles.deleteButton}>{orderDeleting || loading ? "Deleting" : "Delete"}</a> {/* Use both loading states */}
              </div>
              
              <h3>Order No : {order?.invoice_no}</h3>
              <div className={styles.statusContainer}>
                <p className={styles.status}>Status: <span>{order.status}</span></p>
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleUpdateStatus(order._id, e)} name="status" defaultValue={order?.status}>
                  <option disabled value={status}>Change</option>
                  <option value="rough">Rough</option>
                  <option value="ladger">Ladger</option>
                </select>
              </div>
              <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>

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
                {order.order_items.map((item: any) => ( // Type item as any
                  <tr key={item._id}>
                    <td>
                      <img src={item.image} alt={item.name} className={styles.tableImage} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.category}</td>
                    <td>{item.brand}</td>
                    <td>{item.unit}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>{item.discount.toFixed(2)}</td>
                    <td>{item.total.toFixed(2)}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={9}> {/* Changed colSpan to 9 based on the number of columns in the header */}
                    <div className={styles.wrapper}>
                      <div className={styles.itemRow}>
                        <p className={styles.label}>Subtotal</p>
                        <p className={styles.value}>{order.sub_total.toFixed(2)}</p>
                      </div>
                      <div className={styles.itemRow}>
                        <p className={styles.label}>Discount</p>
                        <p className={styles.value}>{order.discount.toFixed(2)}</p>
                      </div>
                      <div className={styles.totalContainer}>
                        <p className={styles.totalLabel}>Net Total</p>
                        <p className={styles.totalValue}>{order.net_total.toFixed(2)}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )) :
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
      </>
      }      
        <ConfirmationModal
          isOpen={isOpen}
          title={modalProps.title || 'Confirm Action'}
          message={modalProps.message || 'Are you sure?'}
          confirmText={modalProps.confirmText || 'Yes'}
          cancelText={modalProps.cancelText || 'No'}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
    </div>
  );
};

export default DraftOrder;
