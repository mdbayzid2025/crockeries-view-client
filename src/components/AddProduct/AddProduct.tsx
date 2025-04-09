import { useState, useRef } from 'react';
import styles from './AddProduct.module.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    discount: '',
    description: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    'Disposable',
    'Plates & Dishes',
    'Glass & Jug',
    'Bowls & Cups',
    'Serving set/Tray',
    'Tea Set'
  ];

  const brands = [
    'Disposable',
    'Plates & Dishes',
    'Glass & Jug',
    'Bowls & Cups',
    'Serving set/Tray',
    'Tea Set'
  ];

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Add New Product</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Product Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Floral Porcelain Tea Cup Set"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.doubleInput}>
 {/* Category */}
 <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>


          {/* Brand */}
 <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>Brand*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="">Select a category</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          </div>
          

 {/* Price and Discount */}
 <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>Price ৳*</label>
              <div className={styles.priceInput}>
                <span className={styles.currency}>৳</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={styles.input}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="discount" className={styles.label}>Discount (%)</label>
              <div className={styles.priceInput}>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0"
                  className={styles.input}
                  min="0"
                  max="100"
                />
                <span className={styles.percent}>%</span>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Product Image</label>
            <div className={styles.imageUploadContainer}>
              {imagePreview ? (
                <div className={styles.imagePreviewWrapper}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className={styles.imagePreview}
                  />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className={styles.removeImageButton}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div 
                  className={styles.uploadArea}
                  onClick={triggerFileInput}
                >
                  <div className={styles.uploadContent}>
                    <svg className={styles.uploadIcon} viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    <p className={styles.uploadText}>Click to upload image</p>
                    <p className={styles.uploadHint}>JPEG or PNG (Max 5MB)</p>
                  </div>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg, image/png"
                className={styles.fileInput}
              />
            </div>
          </div>
                      
          {/* Description */}
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product features, material, dimensions etc."
              className={styles.textarea}
              rows="2"
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;