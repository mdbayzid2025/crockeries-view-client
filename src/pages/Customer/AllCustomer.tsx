import React, { useEffect, useRef, useState } from 'react'
import styles from '../../theme/exports/_table.module.css' 
import selfStyle from './AllCustomer.module.css';
import img from '../../assets/profile.jpg'
import { CiSearch } from 'react-icons/ci'
import { useGetCategoriesQuery } from '../../app/features/categorySlice';
import { useDeleteCustomerMutation, useGetCustomersQuery } from '../../app/features/customerService';
import useConfirmationModal from '../../hooks/useConfirmationModal';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import ConfirmationModal from '../../components/Shared/ConfirmationModal';



const AllCustomer = () => { 
 const {data: result, isLoading, isError, error, refetch } = useGetCustomersQuery()
 const [deleteCustomer, {isLoading: deletingCustomer}] = useDeleteCustomerMutation()
 
  const [openMenu, setOpenMenu] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [openUpdate, setOpenUpdate] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

      // Filter data
  const filteredCustomers = result?.data.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) || customer.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    const {isOpen, showConfirmation, handleConfirm, handleCancel, modalProps} = useConfirmationModal();

    const toggleDropdown = (id: string) => {
      if (selectedId === id && openMenu) {
          setOpenMenu(false);
          setSelectedId("");
      } else {
          setSelectedId(id);
          setOpenMenu(true);
      }
  };

 if (isLoading) return <div>Loading...</div>;
 if (isError) {
    console.log('eeee',error?.message )
    return <div>Error: {error?.message}</div>
};   
 

 // ---------- Handle Delete ------------
const handleDelete = async (id: string) => {
  const shouldDelete = await showConfirmation({
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item?',
    confirmText: 'Delete',
  });
  
  if (shouldDelete) {
    // Perform delete action
    try {
      const result = await deleteCustomer(id);  

      console.log("delete r", result)
      // setOpenMenu(!openMenu)
    } catch (error) {
      console.log('Item deleted:', error);
    }        
    }
};

  return (
    <div>      

      <div className={selfStyle.container}>
      <div className={selfStyle.searchBar}>
      <CiSearch size={25}/>        
          <input
          type="text"
          placeholder="Search by code or name"
          onChange={(e)=>setSearchTerm(e.target.value)}
          className={selfStyle.input}
        />        
      </div>     

    <div className={styles.pageTable}>
      {result?.data?.length  ? 
        <table>
        <tr className={styles.tableHeader}>
          <th className={styles.tableCheckbox}>
            {/* <mat-checkbox #matCheckbox (change)="onAllSelectChange($event)"></mat-checkbox> */}
          </th>
          <th>Photo</th>
  <th>Party Code</th>
  <th>Name</th>
  <th>Mobile</th>
  <th>Address</th>
  <th>District</th>    
  <th>Trade License</th>          
  <th>Actions</th>
        </tr>     
        
        {filteredCustomers && filteredCustomers.map((data:any)=>
            <tr key={data._id}>            
      <td>
        <input id="vue-checkbox-list" className={styles.checkBox} type="checkbox" />
      </td>
      <td>

        <img src={data?.photo ?? img} alt="image" className={styles.tableImage} />
      </td>
      <td>{data.code}</td>      
      <td>{data.name}</td>
      <td>{data.mobile}</td>
      <td>{data.address}</td>
      <td>{data.district}</td>
      <td>{data.trade_license}</td>      
      <td className={styles.menuContainer}>
      <button ref={buttonRef} onClick={() => toggleDropdown(data._id)}>
                <BsThreeDots color="#121212" size={20} style={{ cursor: "pointer" }} />
            </button>
            
            {openMenu && selectedId === data?._id && (
                <div ref={menuRef} className={`${styles.menu}`}>
                    <Link to={`/customers/${data?._id}`}><div  className={styles.menuItem}>Edit</div></Link>
                    <div className={styles.menuItem} onClick={() => handleDelete(data?._id)} >Delete</div>
                 <span className={styles.closeIcon} onClick={()=>setOpenMenu(!openMenu)}><IoMdClose  size={20}/></span>
                </div>
            )}       
        </td>        
            </tr>
        )  } 
        </table>: 
        <div> Nothing Here</div> }
        </div>
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

     
     
      </div>
  )
}

export default AllCustomer