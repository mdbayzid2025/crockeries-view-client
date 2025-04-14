import { useState, useEffect } from 'react';
import styles from './AddOrder.module.css';

// Mock product data
const mockProducts = [
  { id: 1, title: 'Floral Tea Cup Set', price: 1299, discount: 10, 
    image: 'https://images.pexels.com/photos/31459351/pexels-photo-31459351/free-photo-of-romantic-embrace-on-rooftop-under-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
   },
  { id: 2, title: 'Porcelain Dinner Plate', price: 599, discount: 5, 
    image: 'https://images.pexels.com/photos/31459351/pexels-photo-31459351/free-photo-of-romantic-embrace-on-rooftop-under-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  },
  { id: 3, title: 'Glass Water Jug', price: 899, discount: 15, 
    image: 'https://images.pexels.com/photos/31459351/pexels-photo-31459351/free-photo-of-romantic-embrace-on-rooftop-under-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  },
  { id: 4, title: 'Bamboo Serving Tray', price: 799, discount: 0, 
    image: 'https://images.pexels.com/photos/31459351/pexels-photo-31459351/free-photo-of-romantic-embrace-on-rooftop-under-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  },
];

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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate order summary
  const [summary, setSummary] = useState({
    subTotal: 0,
    totalDiscount: 0,
    netTotal: 0,
  });

  useEffect(() => {
    const subTotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = formData.items.reduce((sum, item) => {
      const itemDiscount = (item.price * item.discount * item.quantity) / 100;
      return sum + itemDiscount;
    }, 0);
    
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
      const results = mockProducts.filter(product =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const addProduct = (product) => {
    const existingItemIndex = formData.items.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      const updatedItems = [...formData.items];
      updatedItems[existingItemIndex].quantity += 1;
      setFormData(prev => ({ ...prev, items: updatedItems }));
    } else {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { ...product, quantity: 1 }]
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
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Customer Information</h3>
            <div className={styles.doubleInput}>
            <div >
              <label htmlFor="customer_code">Customer Code*</label>
              <input
                type="text"
                id="customer_code"
                name="customer_code"
                value={formData.customer_code}
                onChange={handleInputChange}
                placeholder="Enter customer code"
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
                onChange={handleInputChange}
                placeholder="Enter customer name"
                className={styles.input}
                required
              />
            </div>
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
                          alt={product.title} 
                          className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                          <h4>{product.title}</h4>
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
                              alt={item.title} 
                              className={styles.itemImage}
                            />
                            <span>{item.title}</span>
                          </td>                        
                       <td>{item.unit}</td>
                       <td>{item.price}</td>
                       <td><input className={styles.discountInput} value={item.discount ?? 0} type="text" placeholder='Discount'/></td>
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

                {/* {isMobile && formData.items.map((item, index) => (
                  <div key={`mobile-${index}`} className={styles.mobileItemCard}>
                    <div className={styles.mobileItemHeader}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className={styles.mobileItemImage}
                      />
                      <div>
                        <h4>{item.title}</h4>
                        <p>₹{item.price} ({item.discount}% off)</p>
                      </div>
                    </div>
                    <div className={styles.mobileItemDetails}>
                      <div className={styles.mobileQuantityControl}>
                        <span>Quantity:</span>
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
                      </div>
                      <div className={styles.mobileItemAmount}>
                        <span>Amount:</span>
                        <span>₹{((item.price * item.quantity) * (100 - item.discount) / 100).toFixed(2)}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeItem(index)}
                        className={styles.mobileRemoveBtn}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                ))} */}
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