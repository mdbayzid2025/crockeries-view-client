
import { useState, useRef, useEffect } from 'react';
import styles from './AddProduct.module.css';
import ImageUploadSpinner from '../Common/ImageUploadSpinner/ImageUploadSpinner';
import { useAddBrandMutation, useAddCategoryMutation, useDeleteBrandMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../../app/features/categorySlice';
import { FiEdit2, FiCheck, FiX, FiPlus } from 'react-icons/fi';
import { GiConsoleController } from 'react-icons/gi';
import { useAddProductMutation } from '../../app/features/productSlice';
import ConfirmationModal from '../Shared/ConfirmationModal';
import useConfirmationModal from '../../hooks/useConfirmationModal';


const AddProduct = ({setSelectTab}) => {
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
  const {data: categories1, isLoading  } = useGetCategoriesQuery()
  
  const [addCategory, {isLoading: loading3}]= useAddCategoryMutation()
 const [addBrand, {isLoading: loading4}] = useAddBrandMutation()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectBrands, setSelectBrands]   = useState([]);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteBrand] = useDeleteBrandMutation()

  // --------------------------- Add Product -----------------
const [addProduct, {isLoading: loading5}] = useAddProductMutation()
const {isOpen, showConfirmation, handleConfirm, handleCancel, modalProps} = useConfirmationModal();


    // State for showing/hiding add inputs
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddBrand, setShowAddBrand] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newBrand, setNewBrand] = useState('');

    const [allBrand, setAllBrand ]  = useState("")


    const [showEditCategory, setShowEditCategory] = useState(false);
    const [updateCategoryValue, setUpdateCategoryValue] = useState("")
   
    const [showEditBrand, setShowEditBrand] = useState(false);
    const [updateBrandValue, setUpdateBrandValue] = useState("")
    const [oldBrand, setOldBrand] = useState("")
    // State for editing
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editCategoryValue, setEditCategoryValue] = useState('');
  const [editBrandValue, setEditBrandValue] = useState('');


    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);

    const [isOpenBrand, setIsOpenBrand] = useState(false)

    // Refs for detecting clicks outside
  const categoryRef = useRef(null);
  const brandRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Filter categories based on input
  const filteredCategories = categories1?.data?.filter(cat => 
    cat.category.toLowerCase().includes(categoryFilter.toLowerCase())
  ) || [];

  // Filter brands based on input
  const filteredBrands = selectBrands?.filter(brand => 
    brand.toLowerCase().includes(brandFilter.toLowerCase())
  ) || [];

  let loadText : string;

  if(isLoading ) return loadText = "loading"
  
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
       const submissionProductData = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      // Only append if photo is a File or for all other fields
      if (key === "image" && value instanceof File) {
        submissionProductData.append(key, value);
      } else if (key !== "image") {
        submissionProductData.append(key, value);
      }
    });
    
    try {
      const result = await addProduct(submissionProductData);
      console.log(result);
      setSelectTab("All Products")
    } catch (error) {
      console.log(error);
    }    
  };

  
    const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      console.log("Selected category:", selectedValue);
      
      // If you need the full category object, find it from your categories array
      const selectedCategory = categories1?.data.find(
        (cat) => cat.category === selectedValue
      );      
      setSelectedCategory(selectedCategory);
    
      // Update your form data
      setFormData({
        ...formData,
        category: selectedValue
      });
    };

    const handleSelectCategory =(item) =>{
      setSelectedCategory(item);
      setSelectBrands(item?.brands)      
    }



     // Handle adding new category
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      // Here you would typically call an API to add the new category
      console.log('Adding new category:', newCategory);
      
      try {
        const result = await addCategory({category: newCategory, brands: []})        
        // Then reset and hide the input
        console.log(result);
      setNewCategory('');

      setShowAddCategory(false);
      } catch (err) {
        // Handle error
        console.log(err?.data?.message)
      }
      
    }
  };

  // Handle updating a category
const handleUpdateCategory = async () => {
  if (updateCategoryValue.trim()) {    
    
    try {
      const id = selectedCategory?._id;
      // Assuming you have an API function called updateCategory
      // that takes the category ID and new name
      const result = await updateCategory({
        id,
        category: updateCategoryValue
      });
                  
      setFormData({...formData, category: result?.data?.category});
      setUpdateCategoryValue('');
      setShowEditCategory(false);      
      
      // You might want to refresh your categories list here
      // or update the specific category in your local state
    } catch (err) {
      // Handle error
      console.log(err?.data?.message);
    } 
  }
};

const handleImageChange = (e: any) => {
  const file = e.target.files[0];
  if (file) {
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  }
};



  // Handle adding new brand
  const handleAddBrand = async () => {
    if (newBrand.trim()) {              
      try {
        console.log("newBrand", newBrand);
        const id = selectedCategory?._id;
        const result = await addBrand({id, brand: newBrand})                   
        
        setSelectBrands(result?.data?.brands)
        setSelectedCategory(result?.data);
        setNewBrand('');
      setShowAddBrand(false);
    }  catch (err) {
      // Handle error
      console.log(err?.data?.message)
    }
  }
};

// handle update brand
const handleUpdateBrand = async () => {
  if (oldBrand && updateBrandValue && selectedCategory) {
    const brandIndex = selectedCategory?.brands.indexOf(oldBrand);    
    if (brandIndex === -1) {
      return alert("Brand not found in category");
    }

    // Update brand in local copy
    const updatedCategory = { ...selectedCategory,  brands: [...selectedCategory.brands]  };
    // console.log("uuuuccc", updatedCategory.brands[brandIndex]);
    // updatedCategory.brands[brandIndex] = updateBrandValue.trim();
    updatedCategory.brands.splice(brandIndex, 1, updateBrandValue.trim());
    
    try {
      const result = await updateCategory({
        id: updatedCategory._id,
        category: updatedCategory?.category,
        brands: updatedCategory?.brands,
      });
            
      setFormData({ ...formData, category: result?.data?.category, brand: updateBrandValue });
      setUpdateCategoryValue('');
      setUpdateBrandValue(updateBrandValue)
      setShowEditBrand(false);
      setSelectBrands(result?.data?.brands);
    } catch (error) {
      console.log(error?.data?.message || "Update failed");
    }
  }
};


const onChange = (data) =>{
  console.log(data)
  setFormData({...formData, brand: data})
}


const handleDelete = async (item: any) => {
  const shouldDelete = await showConfirmation({
    title: 'Delete Item',
    message: `Are you sure you want to delete ${item?.category} category?`,
    confirmText: 'Delete',
  });

  
  if (shouldDelete) {        
    try {            
    await deleteCategory( item?._id);  

    setSelectedCategory(null);
    setFormData({...formData, category: ""});

    } catch (error) {
      console.log('Item deleted:', error);
    }        
    }
};

const handleDeleteBrand = async (brandName: any) => {

  setFormData({...formData, brand: ""})
  const shouldDelete = await showConfirmation({
    title: 'Delete Item',
    message: `Are you sure you want to delete ${brandName} Brand?`,
    confirmText: 'Delete',
  });
    
  if (shouldDelete) {        
    try {            
  
    const {data} = await deleteBrand({
    id: selectedCategory?._id,
    brand: brandName,
  });
  
  console.log("rrr", data?.data?.brands);
    setSelectBrands(data?.data?.brands)
    setFormData({...formData, brand: ""});

    } catch (error) {
      console.log('Item deleted:', error);
    }        
    }
};
  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Add New Product</h2>
        
        <form onSubmit={handleSubmit}>             
        <div className={styles.doubleInput}>
  {/* Title */}
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

 {/* Title */}
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
        {/* Category with filter */}
        <div className={styles.formGroup} ref={categoryRef}>
        <div className={styles.labelContainer}>
            <label htmlFor="category" className={styles.label}>Category*</label>
           {!showEditCategory && <button 
              type="button" 
              className={styles.addButton}
              onClick={() => setShowAddCategory(!showAddCategory)}
            >
              {showAddCategory ? 'Cancel' : '+ Add Category'}
            </button>}

            {showEditCategory && <button 
              type="button" 
              className={styles.addButton}
              onClick={() => setShowEditCategory(!showEditCategory)}
            >
              Cancel
            </button>}
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
              >
                {/* {loadText ? loadText :  "Add"} */}
                {loading3 ? "loading..." : "Add"}
              </button>
            </div>
          )}

          {showEditCategory && (
            <div className={styles.addInputContainer}>
              <input
                type="text"
                value={updateCategoryValue}
                onChange={(e) => setUpdateCategoryValue(e.target.value)}
                placeholder={`${updateCategoryValue}`}
                className={styles.input}
              />
              <button 
                type="button" 
                className={styles.confirmAddButton}
                onClick={handleUpdateCategory}
              >
                {/* {loadText ? loadText :  "Add"} */}
                {loading3 ? "loading..." : "Update"}
              </button>
            </div>
          )}
          
          {!showAddCategory && !showEditCategory &&<div 
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
                          setFormData({...formData, category: item.category});
                          setIsCategoryOpen(false);
                          setCategoryFilter('');
                          handleSelectCategory(item)
                        }}
                      >
                        <span>{item.category}</span>  <span  className={styles.actionBtn}> <span onClick={()=>{setShowEditCategory(!showEditCategory); setUpdateCategoryValue(item.category)}} className={styles.editBtn}><FiEdit2 color='blue' /> Edit</span> <button onClick={()=>handleDelete(item)}>Delete</button></span>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noResults}>No categories found</div>
                  )}
                </div>
              </div>
            )}
          </div>}
          {/* Add Category button would go here */}
        </div>

        <div className={styles.formGroup} ref={brandRef}>
        <div className={styles.labelContainer}>
            <label htmlFor="brand" className={styles.label}>Brand*</label>
           {!showEditCategory && !showEditBrand && <button 
              type="button" 
              className={styles.addButton}
              onClick={() => setShowAddBrand(!showAddBrand)}
            >
              {showAddBrand ? 'Cancel' : '+ Add Brand'}
            </button>}

            {!showEditCategory && showEditBrand && <button 
              type="button" 
              className={styles.addButton}
              onClick={() => setShowEditBrand(!showEditBrand)}
            >
              Cancel
            </button>}
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
              >
                {/* {loadText ? loadText :  "Add"} */}
                {loading3 ? "loading..." : "Add"}
              </button>
            </div>
          )}
      
      {showEditBrand && (
            <div className={styles.addInputContainer}>
              <input
                type="text"    
                value={updateBrandValue}            
                onChange={(e) => setUpdateBrandValue(e.target.value)}
                placeholder={`Update Brand`}
                className={styles.input}
              />
              <button 
                type="button" 
                className={styles.confirmAddButton}
                onClick={handleUpdateBrand}
              >
                {/* {loadText ? loadText :  "Add"} */}
                {loading3 ? "loading..." : "Update"}
              </button>
            </div>
          )}

      

{!showAddBrand && !showEditBrand && <div 
className={`${styles.customSelect} ${isCategoryOpen ? styles.open : ''}`}
onClick={() => setIsOpenBrand(!isOpenBrand)}
>
<div className={styles.selectedValue}>
        {formData?.brand || "Select a brand"}
      </div>
      {isOpenBrand && (
        <div className={styles.selectDropdown}>    
          <div className={styles.searchBox}>
                  <input
                    type="text"
                    placeholder="Search brand..."
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className={styles.filterInput}
                    autoFocus
                  />
                </div>    
                <div className={styles.optionsContainer}>
          {filteredBrands && filteredBrands.map((brand, index) => (
            <div key={index} className={styles.option}
            onClick={() => {
              onChange(brand);
              setIsOpenBrand(false);
            }}
            >
              <span>{brand}</span>      
              <span className={styles.actionBtn}> <span onClick={()=>{setShowEditBrand(!showEditBrand); setUpdateBrandValue(brand); setOldBrand(brand)}} className={styles.editBtn}><FiEdit2 color='blue' /> Edit</span> <button onClick={()=>handleDeleteBrand(brand)}>Delete</button></span>                                  
            </div>
          ))}
          </div>  
          </div>        
      )}

</div>}
     
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
                  value={formData.discount ?? 0}
                  onChange={handleChange}
                  placeholder="0"
                  className={styles.input}
                  min="0"
                  max="100"
                  disabled
                />
                <span className={styles.percent}>%</span>
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
              <label htmlFor="discount" className={styles.label}>Product Unit</label>
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

          {/* Image Upload */}
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
  );
};

export default AddProduct;