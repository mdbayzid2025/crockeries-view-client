import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";

import styles from './AllProducts.module.css'
import AllProductsHeader from './AllProductsHeader'
import AddProduct from '../../components/AddProduct/AddProduct'
import { CiSearch } from 'react-icons/ci'
import { useDeleteProductMutation, useGetProductsQuery } from "../../app/features/productSlice";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import ConfirmationModal from "../../components/Shared/ConfirmationModal";
import UpdateProduct from "./UpdateProduct";
import { Link } from "react-router-dom";

const img = "https://api.bongodeshi.com/api/upload/images/2-e822dae0-14df-4cb8-b145-ea4dc0966b34-0517.webp";

const AllProducts = () => {
    const [selected, setSelectTab] = useState('All Products');    
    const { data, error, isLoading } = useGetProductsQuery();
    
    const [deleteProduct, result] =  useDeleteProductMutation();
    const [searchProduct, setSearchProduct] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [openUpdate, setOpenUpdate] = useState(false);

    
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current && 
            !menuRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setOpenMenu(false);
            setSelectedId("");
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

if(error) {
  return <p>error ...</p>
}

if(isLoading) {
  return <p>loading...</p>
}

const filteredProduct = !searchProduct && data?.data ? data?.data : data?.data.filter((product:any)=> {
return  product.name.toLowerCase().includes(searchProduct.toLowerCase()) || product.code.toLowerCase().includes(searchProduct.toLowerCase()) || product.category.toLowerCase().includes(searchProduct.toLowerCase()) 
})

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
      const result = await deleteProduct(id);  

      console.log("delete r", result)
    } catch (error) {
      console.log('Item deleted:', error);
    }
    
    
    }
};
  return (
    <div>
        <AllProductsHeader selected={selected} setSelectTab={setSelectTab} />
       {selected === 'All Products' && <div className={styles.container}>      
      <div className={styles.searchBar}>
        
      <CiSearch size={25}/>
        <input
          type="text"
          placeholder="Search product"
          onChange={(e)=>setSearchProduct(e.target.value)}
          className={styles.input}
        />
      </div>
    </div>}


         {selected === 'All Products' && 
        <div className={styles.pageTable}>
        <table>
        <tr className={styles.tableHeader}>
          <th className={styles.tableCheckbox}>
            {/* <mat-checkbox #matCheckbox (change)="onAllSelectChange($event)"></mat-checkbox> */}
          </th>
          <th>Image</th>
          <th>Name</th>
          <th>Code</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Unit</th>                    
          <th>Price</th>                    
          <th>Actions</th>
        </tr>     
        
        {filteredProduct?.length > 0 ? filteredProduct.map((data:any)=>
            <tr key={data._id}>            
      <td>
        <input id="vue-checkbox-list" className={styles.checkBox} type="checkbox" />
      </td>
      <td>

        <img src={data.image ?? img} alt="image" className={styles.tableImage} />
      </td>
      <td>{data.name}</td>
      <td>{data.code}</td>
      <td>{data.category}</td>
      <td>{data.brand}</td>
      <td>{data.unit}</td>
      <td>{data.price}</td>
      <td className={styles.menuContainer}>
      <button ref={buttonRef} onClick={() => toggleDropdown(data._id)}>
                <BsThreeDots size={20} style={{ cursor: "pointer" }} />
            </button>
            
            {openMenu && selectedId === data?._id && (
                <div ref={menuRef} className={`${styles.menu}`}>
                    <Link to={`/product/${data?._id}`}><div  className={styles.menuItem}>Edit</div></Link>
                    <div className={styles.menuItem} onClick={() => handleDelete(data?._id)} >Delete</div>
                </div>
            )}       
        </td>      
            </tr>
         ) : 
         <tr>
          <td colSpan={9} className={styles.notFound}>Products not found !!!</td>
          </tr>
         } 
        </table>
        </div>
        }
        {selected === 'Add Product' && <AddProduct />}                      
        {/* {selected === 'Add Product' && <ProductForm2 />} */}
    
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
  )
}

export default AllProducts;



