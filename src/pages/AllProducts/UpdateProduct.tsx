import { useState, useRef, useEffect } from 'react';
import styles from './UpdateProducts.module.css';

import { useAddBrandMutation, useAddCategoryMutation, useGetCategoriesQuery } from '../../app/features/categorySlice';
import { FiEdit2, FiPlus } from 'react-icons/fi';
import { useUpdateProductMutation, useGetSingleProductQuery } from '../../app/features/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploadSpinner from '../../components/Common/ImageUploadSpinner/ImageUploadSpinner';
import { PiColumnsPlusLeft } from 'react-icons/pi';

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: productData, isLoading: isProductLoading } = useGetSingleProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    brand: '',    
    unit: '',    
    price: '',
    discount: 0,
    description: '',
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [addCategory, { isLoading: isCategoryAdding }] = useAddCategoryMutation();
  const [addBrand, { isLoading: isBrandAdding }] = useAddBrandMutation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectBrands, setSelectBrands] = useState([]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newBrand, setNewBrand] = useState('');

  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  const categoryRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData?.data?.name || '',
        code: productData?.data?.code || '',
        category: productData?.data?.category || '',
        brand: productData?.data?.brand || '',    
        unit: productData?.data?.unit || '',    
        price: productData?.data?.price || '',
        discount: productData?.data?.discount || 0,
        description: productData?.data?.description || '',
        image: productData?.data?.image || null
      });
      setImagePreview(productData.data.image || null);
    }
  }, [productData]);

  const navigate = useNavigate()
  useEffect(() => {
   
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setIsBrandOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCategories = categories?.data?.filter(cat => 
    cat.category.toLowerCase().includes(categoryFilter.toLowerCase())
  ) || [];

  const filteredBrands = selectBrands?.filter(brand => 
    brand.toLowerCase().includes(brandFilter.toLowerCase())
  ) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async(e) => {
    setLoading(true);
    const file = e.target.files[0];
    if(!file) return;
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "crockeries-view");
    data.append("cloud_name", "dxspmmowc");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dxspmmowc/image/upload", {
        method: "POST",
        body: data,
      });
      const uploadedImageUrl = await response.json();
      setImagePreview(uploadedImageUrl?.url);
      setFormData(prev => ({ ...prev, image: uploadedImageUrl?.url }));
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("{ id, ...formData }", {id, ...formData})
      await updateProduct({ id, ...formData }).unwrap();
      navigate("/dashboard")
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleSelectCategory = (item) => {
    setSelectedCategory(item);
    setSelectBrands(item?.brands || []);
    setFormData(prev => ({ ...prev, category: item.category }));
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await addCategory({ category: newCategory, brands: [] }).unwrap();
        setNewCategory('');
        setShowAddCategory(false);
      } catch (err) {
        console.error(err?.data?.message || "Failed to add category");
      }
    }
  };

  const handleAddBrand = async () => {
    if (newBrand.trim() && selectedCategory?._id) {
      try {
        const result = await addBrand({ id: selectedCategory._id, brand: newBrand }).unwrap();
        setSelectBrands(result?.brands || []);
        setNewBrand('');
        setShowAddBrand(false);
      } catch (err) {
        console.error(err?.data?.message || "Failed to add brand");
      }
    }
  };

  if (isProductLoading) return <div>Loading product data...</div>;

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Update Product</h2>
        
        <form onSubmit={handleSubmit}>             
          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>Product Title*</label>
              <input
                type="text"
                id="title"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Floral Porcelain Tea Cup Set"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="code" className={styles.label}>Item Code*</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Item Code"
                className={styles.input}
                required
              />
            </div>
          </div>
        
          <div className={styles.doubleInput}>
            <div className={styles.formGroup} ref={categoryRef}>
              <div className={styles.labelContainer}>
                <label htmlFor="category" className={styles.label}>Category*</label>
                <button 
                  type="button" 
                  className={styles.addButton}
                  onClick={() => setShowAddCategory(!showAddCategory)}
                >
                  {showAddCategory ? 'Cancel' : <><FiPlus /> Add Category</>}
                </button>
              </div>        

              {showAddCategory && (
                <div className={styles.addInputContainer}>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className={styles.input}
                  />
                  <button 
                    type="button" 
                    className={styles.confirmAddButton}
                    onClick={handleAddCategory}
                    disabled={isCategoryAdding}
                  >
                    {isCategoryAdding ? "Adding..." : "Add"}
                  </button>
                </div>
              )}
              
              {!showAddCategory && (
                <div 
                  className={`${styles.customSelect} ${isCategoryOpen ? styles.open : ''}`}
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <div className={styles.selectedValue}>
                    {formData.category || 'Select a category'}
                  </div>
                  {isCategoryOpen && (
                    <div className={styles.selectDropdown}>
                      <div className={styles.searchBox}>
                        <input
                          type="text"
                          placeholder="Search categories..."
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className={styles.filterInput}
                          autoFocus
                        />
                      </div>
                      <div className={styles.optionsContainer}>
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((item) => (
                            <div
                              key={item._id}
                              className={styles.option}
                              onClick={() => {
                                handleSelectCategory(item);
                                setIsCategoryOpen(false);
                                setCategoryFilter('');
                              }}
                            >
                              {item.category}
                            </div>
                          ))
                        ) : (
                          <div className={styles.noResults}>No categories found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.formGroup} ref={brandRef}>
              <div className={styles.labelContainer}>
                <label htmlFor="brand" className={styles.label}>Brand*</label>
                <button 
                  type="button" 
                  className={styles.addButton}
                  onClick={() => setShowAddBrand(!showAddBrand)}
                  disabled={!formData.category}
                >
                  {showAddBrand ? 'Cancel' : <><FiPlus /> Add Brand</>}
                </button>
              </div>  

              {showAddBrand && (
                <div className={styles.addInputContainer}>
                  <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="Enter new Brand"
                    className={styles.input}
                  />
                  <button 
                    type="button" 
                    className={styles.confirmAddButton}
                    onClick={handleAddBrand}
                    disabled={isBrandAdding}
                  >
                    {isBrandAdding ? "Adding..." : "Add"}
                  </button>
                </div>
              )}
            
              {!showAddBrand && (
                <div 
                  className={`${styles.customSelect} ${isBrandOpen ? styles.open : ''}`}
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                >
                  <div className={styles.selectedValue}>
                    {formData.brand || 'Select a brand'}
                  </div>
                  {isBrandOpen && (
                    <div className={styles.selectDropdown}>    
                      <div className={styles.searchBox}>
                        <input
                          type="text"
                          placeholder="Search brands..."
                          value={brandFilter}
                          onChange={(e) => setBrandFilter(e.target.value)}
                          className={styles.filterInput}
                          autoFocus
                        />
                      </div>    
                      <div className={styles.optionsContainer}>
                        {filteredBrands.length > 0 ? (
                          filteredBrands.map((brand, index) => (
                            <div 
                              key={index} 
                              className={styles.option}
                              onClick={() => {
                                setFormData(prev => ({ ...prev, brand }));
                                setIsBrandOpen(false);
                              }}
                            >
                              {brand}
                            </div>
                          ))
                        ) : (
                          <div className={styles.noResults}>No brands found</div>
                        )}
                      </div>  
                    </div>        
                  )}
                </div>
              )}
            </div>
          </div>                 

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

          <div className={styles.formGroup}>
            <label htmlFor="unit" className={styles.label}>Product Unit</label>
            <div className={styles.priceInput}>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Enter product unit"
                className={styles.input}                  
              />              
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Product Image</label>
            <div className={styles.imageUploadContainer}>
              {loading ? <ImageUploadSpinner /> : 
                <>
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
                </>
              }
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg, image/png"
                className={styles.fileInput}
              />
            </div>
          </div>
                      
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
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;