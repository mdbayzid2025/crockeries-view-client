import React, { useState, useEffect } from 'react';
import styles from './UpdateOrder.module.css';
import { useGetProductsQuery } from '../../../app/features/productSlice';
import { useGetCustomersQuery } from '../../../app/features/customerService';
import { useUpdateOrderMutation, useGetOrderByIdQuery } from '../../../app/features/orderService';
import ButtonLoader from '../../../components/Shared/ButtonLoader';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateOrder = () => {
  const { id } = useParams<{ id: string }>();
  const { data: orderData, isLoading: orderLoading, isError: orderError } = useGetOrderByIdQuery(id);
  
  const [formData, setFormData] = useState<any>({
    id: '',
    customer_code: '',
    customer_name: '',
    mobile: '',
    address: '',
    district: '',
    status: 'rough',
    order_items: [],
  });

  const { data, } = useGetProductsQuery(null);
  const { data: customers } = useGetCustomersQuery(null);
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [searchCustomerResults, setSearchCustomerResults] = useState<any[]>([]);
  const [showCustomerSearchResults, setShowCustomerSearchResults] = useState<boolean>(false);

  const [summary, setSummary] = useState<any>({
    subTotal: 0,
    totalDiscount: 0,
    netTotal: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (orderData?.data) {
      setFormData({
        id: orderData.data._id,
        customer_code: orderData.data.customer_code,
        customer_name: orderData.data.customer_name,
        mobile: orderData.data.mobile,
        address: orderData.data.address,
        district: orderData.data.district,
        status: orderData.data.status,
        order_items: orderData.data.order_items.map((item: any) => ({
          ...item,
          discount: item.discount || 0
        })),
      });
      setCustomerSearchTerm(orderData.data.customer_code);
    }
  }, [orderData]);

  useEffect(() => {
    const subTotal = (formData.order_items as any[]).reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const totalDiscount = (formData.order_items as any[]).reduce((sum: number, item: any) => sum + Number(item?.discount || 0), 0);
        
    setSummary({
      subTotal,
      totalDiscount,
      netTotal: subTotal - totalDiscount,
    });
  }, [formData.order_items]);

  const handleSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerSearchTerm(value);
  
    if (!value.trim()) {
      setSearchCustomerResults([]);
      setShowCustomerSearchResults(false);
      return;
    }
  
    const results = (customers?.data as any[])?.filter((customer: any) =>
      customer.code?.toLowerCase().includes(value.toLowerCase()) ||
      customer.name?.toLowerCase().includes(value.toLowerCase())
    );  
    setSearchCustomerResults(results || []);
    setShowCustomerSearchResults(true);
  };

  const selectCustomer = (customer: any) => {
    setFormData((prev: any) => ({
      ...prev,
      customer_code: customer.code,
      customer_name: customer.name,
      mobile: customer.mobile,
      address: customer.address,
      district: customer.district,
    }));
  
    setCustomerSearchTerm(customer.code);
    setShowCustomerSearchResults(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {    
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const results = (data?.data as any[])?.filter((product: any) => {        
        return product.name.toLowerCase().includes(term.toLowerCase()) || product.code.toLowerCase().includes(term.toLowerCase());     
      });         
      setSearchResults(results || []);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const addProduct = (product: any) => {
    const existingItemIndex = (formData.order_items as any[]).findIndex((item: any) => item._id === product._id);    
    if (existingItemIndex >= 0) {
      const updatedItems = [...formData.order_items];
      updatedItems[existingItemIndex].quantity += 1;
      
      setFormData((prev: any) => ({ ...prev, order_items: updatedItems }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        order_items: [...prev.order_items, { ...product, quantity: 1, discount: 0 }]
      }));
    }
    
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const updateQuantity = (index: number, newQuantity: string | number) => {
    const cleanValue = String(newQuantity).replace(/^0+(?=\d)/, '');

    let newQty = Number(cleanValue);
    if (isNaN(newQty) || newQty < 0) {
      newQty = 0;
    }
    
    setFormData((prev: any) => {
      const updatedItems = (prev.order_items as any[]).map((item: any, i: number) =>
        i === index ? { ...item, quantity: newQty } : item
      );
      return { ...prev, order_items: updatedItems };
    });
  };

  const updateDiscount = (value: string, id: string) => {    
    const existingItemIndex = (formData.order_items as any[]).findIndex((item: any) => item._id === id);    
    
    const cleanValue = String(value).replace(/^0+(?=\d)/, '');
    
    const updateProduct = (formData.order_items as any[]).map((item: any, index: number) => 
      index === existingItemIndex ? {...item, discount: Number(cleanValue) || 0} : item
    );
    setFormData((prev: any) => ({ ...prev, order_items: updateProduct }));    
  }

  const removeItem = (index: number) => {
    const updatedItems = (formData.order_items as any[]).filter((_: any, i: number) => i !== index);
    setFormData((prev: any) => ({ ...prev, order_items: updatedItems }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {    
      const result = await updateOrder(formData as any).unwrap();
      console.log(result);  
      navigate("/order");   
    } catch (error: any) {
      console.log(error?.message || 'Unknown error during update');
    }    
  };

  if (orderLoading) {
    return <div className={styles.loadingContainer}>Loading order data...</div>;
  }

  if (orderError) {
    return <div className={styles.errorContainer}>Error loading order data</div>;
  }

  return (
    <div className={styles.orderFormContainer}>
      {orderData && <div className={styles.orderForm}>
        <h2 className={styles.formTitle}>Update Order: {orderData?.data?.invoice_no}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Customer Information */}
          <div className={`${styles.section} ${styles.searchContainer}`}>
            <h3 className={styles.sectionTitle}>Customer Information</h3>
            <div className={styles.doubleInput}>
              <div>
                <label htmlFor="customer_code">Customer Code*</label>
                <input
                  type="text"
                  id="customer_code"
                  name="customer_code"
                  value={customerSearchTerm}
                  onChange={handleSearchCustomer}
                  onBlur={() => setTimeout(() => setShowCustomerSearchResults(false), 200)} // Delay hiding results
                  placeholder="Enter customer code or name"
                  className={styles.input}
                  required
                />
              </div>
              <div>
                <label htmlFor="customer_name">Customer Name*</label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  placeholder="Enter customer name"
                  className={styles.input}
                  required
                />
              </div>
                        
              {showCustomerSearchResults && (
                <div className={styles.customerResults}>
                  {searchCustomerResults.length > 0 ? (
                    searchCustomerResults.map((customer: any) => (
                      <div 
                        key={customer._id} 
                        className={styles.productResult}
                        onMouseDown={() => selectCustomer(customer)} // Use onMouseDown to prevent blur from closing before click
                      >
                        <img 
                          src={customer.photo ?? "src/assets/profile.jpg"} 
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
                  type="text" // Changed type to text
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
                  type="text" // Changed type to text
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
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)} // Delay hiding results
                  placeholder="Search by product name..."
                  className={styles.input}
                />
              </div>

              {showSearchResults && (
                <div className={styles.searchResults}>
                  {searchResults.length > 0 ? (
                    searchResults.map((product: any) => (
                      <div 
                        key={product._id} 
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
                          <p>{product.price.toFixed(2)} ({product.discount} off)</p>
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
            {formData.order_items.length > 0 ? (
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
                    {(formData.order_items as any[]).map((item: any, index: number) => (
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
                        <td>{item.price.toFixed(2)}</td>
                        <td>
                          <input 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDiscount(e.target.value, item?._id)} 
                            className={styles.discountInput} 
                            value={item.discount} 
                            type="number" 
                            min={0}
                            placeholder='Discount'
                          />            
                        </td>
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuantity(index, e.target.value)}                                  
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
                          {((item.price * item.quantity) - (item.discount || 0)).toFixed(2)}
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
            <button type="submit" className={styles.submitBtn} disabled={updateLoading}>
              {updateLoading ? (
                <div className={styles.loadingButton}>
                  <ButtonLoader /> &nbsp; Update Order
                </div>
              ) : 'Update Order'}
            </button>
          </div>
        </form>
      </div>}
    </div>
  );
};

export default UpdateOrder;
