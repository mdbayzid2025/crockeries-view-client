import React, { useEffect, useRef, useState } from 'react';
import styles from '../../theme/exports/_form.module.css';
import ImageUploadSpinner from '../../components/Common/ImageUploadSpinner/ImageUploadSpinner';
import { useGetCustomerByIdQuery, useUpdateCustomerMutation } from '../../app/features/customerService';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCustomer = () => {
  const { id } = useParams(); // Get customer ID from URL
  const { data: customerData, isLoading: isFetching } = useGetCustomerByIdQuery(id);
  const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    district: '',
    mobile: '',
    trade_license: '',
    photo: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);


  const navigate = useNavigate();
  useEffect(() => {
    if (customerData) {
        console.log(customerData)
      setFormData(customerData?.data);
      setImagePreview(customerData?.data?.photo || null);
    }
  }, [customerData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "crockeries-view");
    data.append("cloud_name", "dxspmmowc");

    const response = await fetch("https://api.cloudinary.com/v1_1/dxspmmowc/image/upload", {
      method: "POST",
      body: data,
    });

    const uploadedImageUrl = await response.json();
    setImagePreview(uploadedImageUrl?.url);
    setFormData(prev => ({ ...prev, photo: uploadedImageUrl?.url }));
    setLoading(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateCustomer({ id, ...formData });
      navigate("/customers")
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isFetching) return <p>Loading customer data...</p>;

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Update Customer</h2>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className={styles.formGroup}>
            <label style={{ textAlign: 'center', fontSize: '25px' }} className={styles.label}>Profile</label>
            <div className={styles.profileImageContainer}>
              {loading ? <ImageUploadSpinner /> : (
                <>
                  {imagePreview ? (
                    <div className={styles.profileImageWrapper}>
                      <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                      <button type="button" onClick={removeImage} className={styles.removeImageButton}>×</button>
                    </div>
                  ) : (
                    <div className={styles.profileUploadArea} onClick={triggerFileInput}>
                      <div className={styles.uploadContent}>
                        <svg className={styles.profileUploadIcon} viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                        <p className={styles.uploadText}>Click to upload image</p>
                        <p className={styles.uploadHint}>JPEG or PNG (Max 5MB)</p>
                      </div>
                    </div>
                  )}
                </>
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

          {/* Form Inputs */}
          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label htmlFor="code" className={styles.label}>Party Code*</label>
              <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Customer Name*</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
            </div>
          </div>

          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label htmlFor="mobile" className={styles.label}>Mobile*</label>
              <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>Address*</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={styles.input} required />
            </div>
          </div>

          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label htmlFor="district" className={styles.label}>District*</label>
              <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="trade_license" className={styles.label}>Trade License No*</label>
              <input type="text" id="trade_license" name="trade_license" value={formData.trade_license} onChange={handleChange} className={styles.input} required />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomer;
