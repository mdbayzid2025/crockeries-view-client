import React, { useEffect, useRef, useState } from 'react';
import styles from './UpdateProducts.module.css';

import { useAddBrandMutation, useAddCategoryMutation, useGetCategoriesQuery } from '../../app/features/categorySlice';
import { FiPlus } from 'react-icons/fi';
import { useUpdateProductMutation, useGetSingleProductQuery } from '../../app/features/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { data: productData, isLoading: isProductLoading } = useGetSingleProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState<any>({
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
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: categories } = useGetCategoriesQuery(null);
  const [addCategory, { isLoading: isCategoryAdding }] = useAddCategoryMutation();
  const [addBrand, { isLoading: isBrandAdding }] = useAddBrandMutation();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectBrands, setSelectBrands] = useState<any[]>([]);

  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [showAddBrand, setShowAddBrand] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newBrand, setNewBrand] = useState<string>('');

  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('');
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isBrandOpen, setIsBrandOpen] = useState<boolean>(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productData?.data) {
      setFormData({
        name: productData.data.name || '',
        code: productData.data.code || '',
        category: productData.data.category || '',
        brand: productData.data.brand || '',
        unit: productData.data.unit || '',
        price: productData.data.price || '',
        discount: productData.data.discount || 0,
        description: productData.data.description || '',
        image: productData.data.image || null
      });
      setImagePreview(productData.data.image || null);
    }
  }, [productData]);

  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCategories = (categories?.data as any[] || []).filter((cat: any) =>
    cat.category?.toLowerCase().includes(categoryFilter.toLowerCase())
  ) || [];

  const filteredBrands = (selectBrands as any[] || []).filter((brand: any) =>
    brand?.toLowerCase().includes(brandFilter.toLowerCase())
  ) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prevData: any) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setFormData((prev: any) => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const updateProductData = new FormData();

  Object.entries({...formData, id}).forEach(([key, value]) => {
    if (key === "image" && value instanceof File) {
      updateProductData.append(key, value);
    } else if (value !== null && value !== undefined) {
      updateProductData.append(key, value.toString());
    }
  });

  try {
    await updateProduct(updateProductData).unwrap(); // ✅
    navigate("/dashboard");
  } catch (error: any) {
    console.error("Update failed:", error?.data?.message || error?.message || 'Unknown error');
  }
};

  const handleSelectCategory = (item: any) => {
    setSelectedCategory(item);
    setSelectBrands(item?.brands || []);
    setFormData((prev: any) => ({ ...prev, category: item.category }));
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await addCategory({ category: newCategory, brands: [] }).unwrap();
        setNewCategory('');
        setShowAddCategory(false);
      } catch (err: any) {
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
      } catch (err: any) {
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryFilter(e.target.value)}
                          className={styles.filterInput}
                          autoFocus
                        />
                      </div>
                      <div className={styles.optionsContainer}>
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((item: any) => (
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBrand(e.target.value)}
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrandFilter(e.target.value)}
                          className={styles.filterInput}
                          autoFocus
                        />
                      </div>
                      <div className={styles.optionsContainer}>
                        {filteredBrands.length > 0 ? (
                          filteredBrands.map((brand: any, index: number) => (
                            <div
                              key={index}
                              className={styles.option}
                              onClick={() => {
                                setFormData((prev: any) => ({ ...prev, brand }));
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
          <div className={styles.doubleInput}>
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
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
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

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product features, material, dimensions etc."
                className={styles.textarea}
                rows={2}
              />
            </div>
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
