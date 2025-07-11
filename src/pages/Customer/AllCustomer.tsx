import React, { useEffect, useRef, useState } from 'react';
import styles from '../../theme/exports/_table.module.css'; 
import selfStyle from './AllCustomer.module.css';
import { CiSearch } from 'react-icons/ci';
import { useDeleteCustomerMutation, useGetCustomersQuery } from '../../app/features/customerService'; // Assuming correct path
import useConfirmationModal from '../../hooks/useConfirmationModal'; // Assuming correct path
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import ConfirmationModal from '../../components/Shared/ConfirmationModal'; // Assuming correct path
import placeholderImg from "/elementor-placeholder-image.webp"
import PageSpinner from '../../components/Shared/PageSpinner';



const AllCustomer = () => { 
  // Type result and error as any to suppress TypeScript errors
  const { data: result, isLoading, isError, error,  } = useGetCustomersQuery(undefined); // Explicitly pass undefined as argument
  const [deleteCustomer] = useDeleteCustomerMutation();
  
  const [openMenu, setOpenMenu] = useState<boolean>(false); // Explicitly type boolean
  const [selectedId, setSelectedId] = useState<string>(""); // Explicitly type string  

  const [searchTerm, setSearchTerm] = useState<string>(""); // Explicitly type string

  // Filter data - ensure 'result?.data' is treated as an array of any type
  const filteredCustomers = (result?.data as any[] || []).filter((customer: any) => // Type customer as any
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Assuming useConfirmationModal returns typed properties or is already typed to handle any
  const {isOpen, showConfirmation, handleConfirm, handleCancel, modalProps} = useConfirmationModal();

  const toggleDropdown = (id: string) => { // id is already typed as string
    if (selectedId === id && openMenu) {
      setOpenMenu(false);
      setSelectedId("");
    } else {
      setSelectedId(id);
      setOpenMenu(true);
    }
  };

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
        setSelectedId(""); // Clear selectedId when closing menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu, selectedId]); // Depend on openMenu and selectedId to re-attach listener if they change

  
  if (isError) {    
    return <div>Error: {(error as any)?.message || "An unknown error occurred."}</div>; // Cast error to any
  }  
  
  // ---------- Handle Delete ------------
  const handleDelete = async (id: string) => { // id is already typed as string
    const shouldDelete = await showConfirmation({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      confirmText: 'Delete',
      cancelText: 'Cancel', // Added cancelText for completeness
    });
    
    if (shouldDelete) {
      // Perform delete action
      try {
        const result = await deleteCustomer(id).unwrap(); // Use unwrap() for better error handling with RTK Query

        console.log("delete result:", result); // Changed variable name to avoid conflict
        setOpenMenu(false); // Close menu after action
      } catch (error: any) { // Type error as any
        console.log('Item deletion failed:', error?.data?.message || error?.message || 'Unknown error');
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} // Type 'e'
            className={selfStyle.input}
          />          
        </div>    

        <div className={styles.pageTable}>
          {isLoading ? <PageSpinner /> :
          <>
          {filteredCustomers && filteredCustomers.length > 0 ? // Use filteredCustomers directly
            <table>
              <thead>
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
              </thead>
               
               <tbody>
                {filteredCustomers.map((data: any) => // data is already typed as any
                  <tr key={data._id}>            
                    <td>
                      <input id={`checkbox-${data._id}`} className={styles.checkBox} type="checkbox" />
                    </td>
                    <td>
                      <img src={data?.photo ? data?.photo : placeholderImg} alt="profile" className={styles.tableImage} />
                    </td>
                    <td>{data.code}</td>       
                    <td>{data.name}</td>
                    <td>{data.mobile}</td>
                    <td>{data.address}</td>
                    <td>{data.district}</td>
                    <td>{data.trade_license}</td>       
                    <td className={styles.menuContainer}>
                      <button ref={selectedId === data._id ? buttonRef : null} onClick={() => toggleDropdown(data._id)}>
                        <BsThreeDots color="#121212" size={20} style={{ cursor: "pointer" }} />
                      </button>
                      
                      {openMenu && selectedId === data?._id && (
                        <div ref={menuRef} className={`${styles.menu}`}>
                            <Link to={`/customers/${data?._id}`}><div className={styles.menuItem}>Edit</div></Link>
                            <div className={styles.menuItem} onClick={() => handleDelete(data?._id)} >Delete</div>
                          <span className={styles.closeIcon} onClick={() => setOpenMenu(false)}><IoMdClose size={20}/></span> {/* Changed onClick to setOpenMenu(false) */}
                        </div>
                      )}       
                    </td>        
                  </tr>
                )} 
              </tbody>                            
            </table>
          : 
            <div className={styles.noDataFound}>Nothing Here</div> /* Added a specific style for no data */
          }
          </>
          }
          
        </div>
        <ConfirmationModal
          isOpen={isOpen}
          title={modalProps.title || 'Confirm'} // Provide default if title can be null/undefined
          message={modalProps.message || 'Are you sure?'} // Provide default
          confirmText={modalProps.confirmText || 'Yes'} // Provide default
          cancelText={modalProps.cancelText || 'No'} // Provide default
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AllCustomer;
