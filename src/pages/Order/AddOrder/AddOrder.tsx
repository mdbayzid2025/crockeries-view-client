import { useState, useEffect } from 'react';
import styles from './AddOrder.module.css';
import { useGetProductsQuery } from '../../../app/features/productSlice';
import { useGetCustomersQuery } from '../../../app/features/customerService';


const AddOrder = () => {
  const [formData, setFormData] = useState({
    customer_code: '',
    customer_name: '',
    mobile: '',
    address: '',
    district: '',
    status: 'rough',
    items: [],
  });


  const { data, error, isLoading } = useGetProductsQuery();
  const { data: customers, isLoading: loadingCustomers, isError: errorCustomers, refetch } = useGetCustomersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [searchCustomerResults, setSearchCustomerResults] = useState([]);
  const [showCustomerSearchResults, setShowCustomerSearchResults] = useState(false);

  // --------------- Customer Filter Section -----------------

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
  
    setCustomerSearchTerm(customer.code); // optional: show code in input
    setShowCustomerSearchResults(false);
  };  
  // --------------- Customer Filter Section End -----------------



  // Calculate order summary
  const [summary, setSummary] = useState({
    subTotal: 0,
    totalDiscount: 0,
    netTotal: 0,
  });

  useEffect(() => {
    const subTotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = formData.items.reduce((sum, item) => sum + Number(item?.discount), 0);
    
    console.log("dddd", totalDiscount)
    setSummary({
      subTotal,
      totalDiscount,
      netTotal: subTotal - totalDiscount,
    });
  }, [formData.items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const addProduct = (product) => {
    const existingItemIndex = formData.items.findIndex(item => item._id === product._id);    
    if (existingItemIndex >= 0) {
      const updatedItems = [...formData.items];
      updatedItems[existingItemIndex].quantity += 1;
      
      setFormData(prev => ({ ...prev, items: updatedItems }));
    } else {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { ...product, quantity: 1}]
      }));
    }
    
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchResults(false);
  };


  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = [...formData.items];
    updatedItems[index].quantity = newQuantity;
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const updateDiscount = (value, id) =>{    
    const existingItemIndex = formData.items.findIndex(item => item._id === id);           
    
    const updateProduct = formData.items.map((item, index)=>index === existingItemIndex ? {...item, discount: value}: item);
    setFormData(prev => ({ ...prev, items: updateProduct }));    
  }

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    
    // Add your order submission logic here
    localStorage.setItem('order', JSON.stringify(formData));
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
                          src={customer.photo ??"src\assets\profile.jpg"} 
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
                    {formData.items.map((item, index) => (
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
                       <td><input onChange={(e)=>updateDiscount(e.target.value, item?._id)} className={styles.discountInput} defaultValue={0} type="text" placeholder='0'/></td>
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
                          {((item.price * item.quantity) * (100 - item.discount) / 100).toFixed(2)}
                        </td>
                        <td>
                          <button 
                            type="button" 
                            onClick={() => removeItem(index)}
                            className={styles.removeBtn}
                          >
                            {/* {isMobile ? '×' : 'Remove'} */}
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
              {formData.status === 'Draft' ? 'Save Draft' : 'Confirm Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;