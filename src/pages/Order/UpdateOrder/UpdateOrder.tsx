import { useState, useEffect } from 'react';
import styles from './UpdateOrder.module.css';
import { useGetProductsQuery } from '../../../app/features/productSlice';
import { useGetCustomersQuery } from '../../../app/features/customerService';
import { useUpdateOrderMutation, useGetOrderByIdQuery } from '../../../app/features/orderService';
import ButtonLoader from '../../../components/Shared/ButtonLoader';
import { useParams } from 'react-router-dom';

const UpdateOrder = () => {
  const { id } = useParams();
  const { data: orderData, isLoading: orderLoading, isError: orderError } = useGetOrderByIdQuery(id);
  
  const [formData, setFormData] = useState({
    id: '',
    customer_code: '',
    customer_name: '',
    mobile: '',
    address: '',
    district: '',
    status: 'rough',
    order_items: [],
  });

  const { data, error, isLoading } = useGetProductsQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetCustomersQuery();
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchCustomerResults, setSearchCustomerResults] = useState([]);
  const [showCustomerSearchResults, setShowCustomerSearchResults] = useState(false);

  // Order summary state
  const [summary, setSummary] = useState({
    subTotal: 0,
    totalDiscount: 0,
    netTotal: 0,
  });

  // Initialize form with order data when it's loaded
  useEffect(() => {
    if (orderData) {
        console.log("orderData", orderData)
      setFormData({
        id: orderData?.data?._id,
        customer_code: orderData?.data?.customer_code,
        customer_name: orderData?.data?.customer_name,
        mobile: orderData?.data?.mobile,
        address: orderData?.data?.address,
        district: orderData?.data?.district,
        status: orderData?.data?.status,
        order_items: orderData?.data?.order_items.map(item => ({
          ...item,
          discount: item.discount || 0 // Ensure discount has a value
        })),
      });
      setCustomerSearchTerm(orderData?.data?.customer_code);
    }
  }, [orderData]);

  // Calculate order summary
  useEffect(() => {
    const subTotal = formData.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = formData.order_items.reduce((sum, item) => sum + Number(item?.discount || 0), 0);
        
    setSummary({
      subTotal,
      totalDiscount,
      netTotal: subTotal - totalDiscount,
    });
  }, [formData.order_items]);

  // Customer search handler
  const handleSearchCustomer = (e) => {
    const value = e.target.value;
    setCustomerSearchTerm(value);
  
    if (!value.trim()) {
      setSearchCustomerResults([]);
      setShowCustomerSearchResults(false);
      return;
    }
  
    const results = customers?.data?.filter(customer =>
      customer.code?.toLowerCase().includes(value.toLowerCase()) ||
      customer.name?.toLowerCase().includes(value.toLowerCase())
    );  
    setSearchCustomerResults(results || []);
    setShowCustomerSearchResults(true);
  };

  const selectCustomer = (customer) => {
    setFormData(prev => ({
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

  // Product search handler
  const handleSearch = (e) => {    
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const results = data?.data.filter(product => {        
        return product.name.toLowerCase().includes(term.toLowerCase())     
      });        
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Add product to order
  const addProduct = (product) => {
    const existingItemIndex = formData.order_items.findIndex(item => item._id === product._id);    
    if (existingItemIndex >= 0) {
      const updatedItems = [...formData.order_items];
      updatedItems[existingItemIndex].quantity += 1;
      
      setFormData(prev => ({ ...prev, order_items: updatedItems }));
    } else {
      setFormData(prev => ({
        ...prev,
        order_items: [...prev.order_items, { ...product, quantity: 1, discount: 0 }]
      }));
    }
    
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Update product quantity
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = [...formData.order_items];
    updatedItems[index].quantity = newQuantity;
    setFormData(prev => ({ ...prev, order_items: updatedItems }));
  };

  // Update product discount
  const updateDiscount = (value, id) => {    
    const existingItemIndex = formData.order_items.findIndex(item => item._id === id);    
    
    // Optionally: Remove leading zero if present       
    const cleanValue = value.replace(/^0+(?=\d)/, '');
    
    const updateProduct = formData.order_items.map((item, index) => 
      index === existingItemIndex ? {...item, discount: cleanValue || 0} : item
    );
    setFormData(prev => ({ ...prev, order_items: updateProduct }));    
  }

  // Remove item from order
  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit updated order
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {    
      const result = await updateOrder(formData);
      console.log(result);      
    } catch (error) {
      console.log(error?.message);
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
        <h2 className={styles.formTitle}>Update Order {orderData?.data?._id.slice(-5).toUpperCase()}</h2>
        
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
                  placeholder="Enter customer code or name"
                  className={styles.input}
                  required
                />
              </div>
              <div>
                <label htmlFor="name">Customer Name*</label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleSearchCustomer}
                  placeholder="Enter customer name"
                  className={styles.input}
                  required
                />
              </div>
                        
              {showCustomerSearchResults && (
                <div className={styles.customerResults}>
                  {searchCustomerResults.length > 0 ? (
                    searchCustomerResults.map((customer) => (
                      <div 
                        key={customer._id} 
                        className={styles.productResult}
                        onClick={() => selectCustomer(customer)}
                      >
                        <img 
                          src={customer.photo ??"src/assets/profile.jpg"} 
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
                  type="tel"
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
                  type="tel"
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
                    searchResults.map(product => (
                      <div 
                        key={product.id} 
                        className={styles.productResult}
                        onClick={() => addProduct(product)}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                          <h4>{product.name}</h4>
                          <p>₹{product.price} ({product.discount}% off)</p>
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
                    {formData.order_items.map((item, index) => (
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
                        <td>{item.price}</td>
                        <td>
                          <input 
                            onChange={(e) => updateDiscount(e.target.value, item?._id)} 
                            className={styles.discountInput} 
                            value={item.discount} 
                            type="number" 
                            min={0}
                            placeholder=''
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
                            <span>{item.quantity}</span>
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
            <button type="submit" className={styles.submitBtn}>
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