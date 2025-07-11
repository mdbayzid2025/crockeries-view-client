import React, { useEffect, useState } from 'react';
import { useGetCustomersQuery } from '../../../app/features/customerService';
import { useCreateOrderMutation } from '../../../app/features/orderService';
import { useGetProductsQuery } from '../../../app/features/productSlice';
import ButtonLoader from '../../../components/Shared/ButtonLoader';
import styles from './AddOrder.module.css';


const AddOrder = ({setSelectTab}: any) => { // setSelectTab can be typed as (tab: string) => void
  const [formData, setFormData] = useState<any>({ // Type formData state as any
    customer_code: '',
    customer_name: '',
    mobile: '',
    address: '',
    district: '',
    status: 'rough',
    items: [],
  });

  const { data, } = useGetProductsQuery(null); // Pass undefined to useGetProductsQuery
  const { data: customers,  } = useGetCustomersQuery(null); // Pass undefined to useGetCustomersQuery
  const [createOrder, {isLoading: orderLoading }] = useCreateOrderMutation()
  const [searchTerm, setSearchTerm] = useState<string>(''); // Explicitly type searchTerm as string
  const [customerSearchTerm, setCustomerSearchTerm] = useState<string>(''); // Explicitly type customerSearchTerm as string
  const [searchResults, setSearchResults] = useState<any[]>([]); // Type searchResults as any array
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false); // Explicitly type boolean

  const [searchCustomerResults, setSearchCustomerResults] = useState<any[]>([]); // Type searchCustomerResults as any array
  const [showCustomerSearchResults, setShowCustomerSearchResults] = useState<boolean>(false); // Explicitly type boolean

  const [loading, setLoading] = useState<boolean>(false); // Explicitly type loading as boolean

  // --------------- Customer Filter Section -----------------

  const handleSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => { // Type event as React.ChangeEvent<HTMLInputElement>
    const value = e.target.value;
    setCustomerSearchTerm(value);
  
    if (!value.trim()) {
      setSearchCustomerResults([]);
      setShowCustomerSearchResults(false);
      return;
    }
  
    const results = (customers?.data as any[])?.filter((customer: any) => // Cast customers.data and type customer as any
      customer.code?.toLowerCase().includes(value.toLowerCase()) ||
      customer.name?.toLowerCase().includes(value.toLowerCase())
    );  
    setSearchCustomerResults(results || []);
    setShowCustomerSearchResults(true);
  };

  const selectCustomer = (customer: any) => { // Type customer as any
    setFormData((prev: any) => ({ // Type prev as any
      ...prev,
      customer_code: customer.code,
      customer_name: customer.name,
      mobile: customer.mobile,
      address: customer.address,
      district: customer.district,
    }));
  
    setCustomerSearchTerm(customer.code); // optional: show code in input
    setShowCustomerSearchResults(false);
  };  
  // --------------- Customer Filter Section End -----------------


  // Calculate order summary
  const [summary, setSummary] = useState<any>({ // Type summary as any
    subTotal: 0,
    totalDiscount: 0,
    netTotal: 0,
  });

  useEffect(() => {
    const subTotal = (formData.items as any[]).reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0); // Type sum and item as any
    const totalDiscount = (formData.items as any[]).reduce((sum: number, item: any) => sum + Number(item?.discount), 0); // Type sum and item as any
        
    setSummary({
      subTotal,
      totalDiscount,
      netTotal: subTotal - totalDiscount,
    });
  }, [formData.items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { // Type event
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value })); // Type prev as any
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { // Type event 
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const results = (data?.data as any[])?.filter((product: any) => { // Cast data.data and type product as any
        return product.name.toLowerCase().includes(term.toLowerCase()) || product.code.toLowerCase().includes(term.toLowerCase()); 
        });     
      setSearchResults(results || []); // Ensure results is an array
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const addProduct = (product: any) => { // Type product as any
    const existingItemIndex = (formData.items as any[]).findIndex((item: any) => item._id === product._id); // Type item as any
    if (existingItemIndex >= 0) {
      const updatedItems = [...formData.items];
      updatedItems[existingItemIndex].quantity += 1;
      
      setFormData((prev: any) => ({ ...prev, items: updatedItems })); // Type prev as any
    } else {
      setFormData((prev: any) => ({ // Type prev as any
        ...prev,
        items: [...prev.items, { ...product, quantity: 1, discount: 0 }] // Add discount with default 0
      }));
    }
    
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchResults(false);
  };


  const updateQuantity = (index: number, value: string | number) => { // Type index as number, value as string | number
  // Convert value to string and remove leading zeros
  const cleanValue = String(value).replace(/^0+(?=\d)/, '');

  // Parse as number and validate
  let newQty = Number(cleanValue);
  if (isNaN(newQty) || newQty < 0) {
    newQty = 0;
  }

  setFormData((prev: any) => { // Type prev as any
    const updatedItems = (prev.items as any[]).map((item: any, i: number) => // Type item and i as any/number
      i === index ? { ...item, quantity: newQty } : item
    );
    return { ...prev, items: updatedItems };
  });
};


  const updateDiscount = (value: string, id: string) => { // Type value as string, id as string
    const existingItemIndex = (formData.items as any[]).findIndex((item: any) => item._id === id); // Type item as any
    // Optionally: Remove leading zero if present       
    const cleanValue = String(value).replace(/^0+(?=\d)/, '');
    
    const updateProduct = (formData.items as any[]).map((item: any, index: number) => index === existingItemIndex ? {...item, discount: Number(cleanValue)}: item); // Type item and index as any/number
    setFormData((prev: any) => ({ ...prev, items: updateProduct })); // Type prev as any
  }

  const removeItem = (index: number) => { // Type index as number
    const updatedItems = (formData.items as any[]).filter((_: any, i: number) => i !== index); // Type _ and i as any/number
    setFormData((prev: any) => ({ ...prev, items: updatedItems })); // Type prev as any
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Type event as React.FormEvent<HTMLFormElement>
    e.preventDefault();
    setLoading(true);
    
    try {     
      const result = await createOrder(formData as any); // Cast formData as any for the mutation
      console.log(result);
      setLoading(false);
      setSelectTab(formData?.status);
    } catch (error: any) { // Type error as any
      console.log(error?.message);
      setLoading(false); // Ensure loading is set to false even on error
    }     
  };

  return (
    <div className={styles.orderFormContainer}>
      <div className={styles.orderForm}>
        <h2 className={styles.formTitle}>Create New Order</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Customer Information */}
          <div className={`${styles.section} ${styles.searchContainer}`}>
            <h3 className={styles.sectionTitle}>Customer Information</h3>
            <div className={styles.doubleInput}>
              <div >
                <label htmlFor="customer_code">Customer Code*</label>
                <input
                type="text"
                id="customer_code"
                name="customer_code"
                value={customerSearchTerm}
                onChange={handleSearchCustomer}
                placeholder="Enter customer code or name"
                className={styles.input}
                required
              />
              </div>
              <div >
                <label htmlFor="name">Customer Name*</label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange} // Changed from handleSearchCustomer to handleInputChange for this field
                  placeholder="Enter customer name"
                  className={styles.input}
                  required
                />
              </div>
                        
                      {showCustomerSearchResults && (
                <div className={styles.customerResults}>
                  {searchCustomerResults.length > 0 ? (
                    searchCustomerResults.map((customer: any) => ( // Type customer as any
                      <div 
                        key={customer._id} 
                        className={styles.productResult}
                        onMouseDown={() => selectCustomer(customer)} // Use onMouseDown to prevent blur from closing before click
                      >
                        <img 
                          src={customer.photo ?? "src/assets/profile.jpg"} // Use forward slashes for paths
                          alt={customer.name} 
                          className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                          <h4>{customer.name} ({customer.code})</h4>
                          <p>{customer.mobile} | {customer.district}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noResults}>No customers found</div>
                  )}
                </div>
              )}
              </div>
            
              <div className={styles.doubleInput}>
              <div className={styles.inputGroup}>
              <label htmlFor="mobile">Mobile Number*</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                className={styles.input}
                required
              />
            </div>         
            <div className={styles.inputGroup}>
              <label htmlFor="address">Shipping Address*</label>
              <input
                type="text" // Changed type to text for address
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className={styles.input}
                required
              />
            </div>                       
              </div>
              <div className={styles.doubleInput}>
              <div className={styles.inputGroup}>
              <label htmlFor="district">District*</label>
              <input
                type="text" // Changed type to text for district
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="Enter District"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="status">Order Status*</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={styles.input}
                required
              >
                <option value="rough">Rough</option>
                <option value="ladger">Ladger</option>
              </select>
            </div>
            </div>         
          </div>

          {/* Order Items */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Order Items</h3>
            
            <div className={styles.searchContainer}>
              <div className={styles.inputGroup}>
                <label>Search Products</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by product name..."
                  className={styles.input}
                />
              </div>

              {showSearchResults && (
                <div className={styles.searchResults}>
                  {searchResults.length > 0 ? (
                    searchResults.map((product: any) => ( // Type product as any
                      <div 
                        key={product._id} // Assuming product has _id
                        className={styles.productResult}
                        onMouseDown={() => addProduct(product)} // Use onMouseDown
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                          <h4>{product.name}</h4>
                          <p>{product.price.toFixed(2)} ({product.discount} off)</p> {/* Ensure price and discount are numbers */}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noResults}>No products found</div>
                  )}
                </div>
              )}
            </div>

            {/* Order Items Table */}
            {formData.items.length > 0 ? (
              <div className={styles.orderTableContainer}>
                <table className={styles.orderTable}>
                  <thead>
                    <tr>
                     <th>Product</th>
                     <th>Unit</th>
                     <th>Price</th>
                     <th>Discount</th>
                     <th>Qty</th>
                     <th>Amount</th>
                     <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.items as any[]).map((item: any, index: number) => ( // Type item and index as any/number
                      <tr key={index}>
                        
                          <td className={styles.productCell}>
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className={styles.itemImage}
                            />
                            <span>{item.name}</span>
                          </td>                       
                       <td>{item.unit}</td>
                       <td>{item.price.toFixed(2)}</td> {/* Ensure price is a number */}
                       
                       <td><input onChange={(e) => updateDiscount(e.target.value, item?._id)} className={styles.discountInput} defaultValue={0} type="text" placeholder='Discount' value={item.discount}/></td> {/* Ensure value is controlled */}
                        <td>
                      <div className={styles.quantityControl}>
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className={styles.quantityBtn}
                          >
                            -
                          </button>
                          <input 
                            className={styles.qtyInput}
                            onChange={(e) => updateQuantity(index, e.target.value)}                                  
                            value={item?.quantity}                           
                            type="number" 
                            min={0}
                            placeholder="Order Qty"
                          />
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className={styles.quantityBtn}
                          >
                            +
                          </button>
                        </div>
                        </td>
                        <td>
                          {((item.price * item.quantity) - item.discount).toFixed(2)} {/* Ensure price, quantity, discount are numbers */}
                        </td>
                        <td>
                          <button 
                            type="button" 
                            onClick={() => removeItem(index)}
                            className={styles.removeBtn}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>         
              </div>
            ) : (
              <div className={styles.emptyCart}>
                <p>No items added to the order yet</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className={styles.summarySection}>
            <h3 className={styles.sectionTitle}>Order Summary</h3>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryRow}>
                <span>Sub Total:</span>
                <span>{summary.subTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Discount:</span>
                <span>- {summary.totalDiscount.toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Net Total:</span>
                <span>{summary.netTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn} disabled={loading || orderLoading}>
              {loading || orderLoading ? <div className={styles.loadingButton}> <ButtonLoader /> &nbsp; Confirm Order</div> : 
              <>{formData.status === 'Draft' ? 'Save Draft' : 'Confirm Order'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
