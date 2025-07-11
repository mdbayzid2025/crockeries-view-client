import  { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import styles from './AllProducts.module.css';
import AllProductsHeader from './AllProductsHeader';
import AddProduct from '../../components/AddProduct/AddProduct';
import { CiSearch } from 'react-icons/ci';
import { useDeleteProductMutation, useGetProductsQuery } from "../../app/features/productSlice";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import ConfirmationModal from "../../components/Shared/ConfirmationModal";

import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import PageSpinner from "../../components/Shared/PageSpinner";

const img = "https://api.bongodeshi.com/api/upload/images/2-e822dae0-14df-4cb8-b145-ea4dc0966b34-0517.webp";

const AllProducts = () => {
    const [selected, setSelectTab] = useState<string>('All Products');
    const { data, error, isLoading } = useGetProductsQuery(null);
    
    const [deleteProduct, ] = useDeleteProductMutation();
    const [searchProduct, setSearchProduct] = useState<string>("");
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>("");    

    
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
    }, [openMenu, selectedId]);

    if(error) {
        return <p>Error: {(error as any)?.message || "An unknown error occurred."}</p>;
    }

    const filteredProduct = !searchProduct && data?.data ? 
        (data?.data as any[]) : 
        (data?.data as any[] || []).filter((product: any) => {
            const searchTermLower = searchProduct.toLowerCase();
            return product.name?.toLowerCase().includes(searchTermLower) || 
                   product.code?.toLowerCase().includes(searchTermLower) || 
                   product.category?.toLowerCase().includes(searchTermLower); 
        });

    const handleDelete = async (id: string) => {
        const shouldDelete = await showConfirmation({
            title: 'Delete Item',
            message: 'Are you sure you want to delete this item?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
        });
        
        if (shouldDelete) {
            try {
                const deleteResult = await deleteProduct(id).unwrap();

                console.log("delete result:", deleteResult);
                setOpenMenu(false);
            } catch (error: any) {
                console.log('Item deletion failed:', error?.data?.message || error?.message || 'Unknown error');
            }        
        }
    };

    return (
        <div>
            <AllProductsHeader selected={selected} setSelectTab={setSelectTab} />
            {selected === 'All Products' && 
                <div className={styles.container}>       
                    <div className={styles.searchBar}>
                        <CiSearch size={25}/>
                        <input
                            type="text"
                            placeholder="Search product"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchProduct(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                </div>
            }

            {selected === 'All Products' && 
                <div className={styles.pageTable}>
                    <table>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th className={styles.tableCheckbox}>
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
                        </thead>
                        {isLoading ? <PageSpinner /> :
                        <tbody>
                            {filteredProduct && filteredProduct.length > 0 ? 
                                filteredProduct.map((data: any) =>
                                    <tr key={data._id}>            
                                        <td>
                                            <input id={`checkbox-${data._id}`} className={styles.checkBox} type="checkbox" />
                                        </td>
                                        <td>
                                            <img src={data.image ?? img} alt={data.name || "product image"} className={styles.tableImage} />
                                        </td>
                                        <td>{data.name}</td>
                                        <td>{data.code}</td>
                                        <td>{data.category}</td>
                                        <td>{data.brand}</td>
                                        <td>{data.unit}</td>
                                        <td>{data.price}</td>
                                        <td className={styles.menuContainer}>
                                            <button ref={selectedId === data._id ? buttonRef : null} onClick={() => toggleDropdown(data._id)}>
                                                <BsThreeDots size={20} style={{ cursor: "pointer" }} />
                                            </button>
                                            
                                            {openMenu && selectedId === data?._id && (
                                                <div ref={menuRef} className={`${styles.menu}`}>
                                                    <Link to={`/product/${data?._id}`}><div className={styles.menuItem}>Edit</div></Link>
                                                    <div className={styles.menuItem} onClick={() => handleDelete(data?._id)} >Delete</div>
                                                
                                                    <span className={styles.closeIcon} onClick={() => setOpenMenu(false)}><IoMdClose size={20}/></span>
                                                </div>
                                            )}       
                                        </td>       
                                    </tr>
                                ) : 
                                <tr>
                                    <td colSpan={9} className={styles.notFound}>Products not found !!!</td>
                                </tr>
                            } 
                        </tbody>
                        }                        
                    </table>
                </div>
            }
            {selected === 'Add Product' && <AddProduct setSelectTab={setSelectTab} />}            
            
            <ConfirmationModal
                isOpen={isOpen}
                title={modalProps.title || 'Confirm Action'}
                message={modalProps.message || 'Are you sure you want to proceed?'}
                confirmText={modalProps.confirmText || 'Confirm'}
                cancelText={modalProps.cancelText || 'Cancel'}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default AllProducts;
