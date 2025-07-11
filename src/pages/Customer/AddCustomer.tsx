import React, { useRef, useState } from 'react';
import styles from '../../theme/exports/_form.module.css';
import ImageUploadSpinner from '../../components/Common/ImageUploadSpinner/ImageUploadSpinner';
import { useAddCustomerMutation } from '../../app/features/customerService';
import { useNavigate } from 'react-router-dom';

const AddCustomer = ({ setSelectTab }: any) => { // Type setSelectTab as any
  const [formData, setFormData] = useState<any>({ // Type formData as any
    name: '',
    // code: '', // This line is commented out, so it won't be part of formData unless uncommented
    address: '',
    district: '',
    mobile: '',
    trade_license: '',
    photo: null
  });

  const [addCustomer, { isLoading }] = useAddCustomerMutation();

  const [imagePreview, setImagePreview] = useState<string | null>(null); // Type imagePreview as string or null
  const [loading, setLoading] = useState<boolean>(false); // Type loading as boolean
  const fileInputRef = useRef<HTMLInputElement>(null); // Type fileInputRef as HTMLInputElement or null


  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Type 'e'
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value })); // Type prev as any
  };


  const triggerFileInput = () => {
    if (fileInputRef.current) { // Check if current is not null
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setFormData((prev: any) => ({ ...prev, photo: null })); // Type prev as any
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Type 'e'
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const submissionData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photo" && value instanceof File) {
          submissionData.append("photo", value);
        } else if (value !== null) { // Only append if value is not null for non-photo fields
          submissionData.append(key, String(value)); // Convert value to string for FormData
        }
      });

      await addCustomer(submissionData).unwrap();
      navigate("/customers")
      setSelectTab("All Customer");
      // Reset form after successful submission (optional)
      setFormData({
        name: '',
        // code: '',
        address: '',
        district: '',
        mobile: '',
        trade_license: '',
        photo: null
      });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) { // Type 'error'
      console.log("Add Customer Error:", error?.data?.message || error?.message || "Unknown error");
    } finally {
      setLoading(false); // End loading
    }
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Type 'e'
    const file = e.target.files?.[0]; // Use optional chaining
    if (file) {
      setFormData((prevData: any) => ({ // Type prevData as any
        ...prevData,
        photo: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Add Customer</h2>

        <form onSubmit={handleSubmit}>

          {/* Image Upload */}
          <div className={styles.formGroup}>
            <label style={{ textAlign: 'center', fontSize: '25px' }} className={styles.label}>Profile</label>
            <div className={styles.profileImageContainer}>
              {loading ? <ImageUploadSpinner /> :

                <>
                  {imagePreview ? (
                    <div className={styles.profileImageWrapper}>
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
                      className={styles.profileUploadArea}
                      onClick={triggerFileInput}
                    >
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

          <div className={styles.doubleInput}>
            {/* Code */}
            <div className={styles.formGroup}>
              <label htmlFor="code" className={styles.label}>Party Code*</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code || ''} // Provide a fallback for code if it's not generated yet
                onChange={handleChange}
                placeholder="e.g., Floral Porcelain Tea Cup Set"
                className={styles.input}
                // required // Removed as it's disabled
                disabled
              />
            </div>

            {/* Title */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Customer Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Customer Name"
                className={styles.input}
                required
              />
            </div>
          </div>


          <div className={styles.doubleInput}>
            {/* Mobile */}
            <div className={styles.formGroup}>
              <label htmlFor="mobile" className={styles.label}>Mobile*</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Customer Mobile"
                className={styles.input}
                required
              />
            </div>

            {/* District */}
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>Address*</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className={styles.input}
                required
              />
            </div>
          </div>


          {/* Trade License No */}
          <div className={styles.doubleInput}>

            {/* District */}
            <div className={styles.formGroup}>
              <label htmlFor="district" className={styles.label}>District*</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
                className={styles.input}                
              />
            </div>


            <div className={styles.formGroup}>
              <label htmlFor="trade_license" className={styles.label}>Trade License No*</label>
              <div className={styles.priceInput}>
                <input
                  type="text"
                  id="trade_license"
                  name="trade_license"
                  value={formData.trade_license}
                  onChange={handleChange}
                  placeholder="Trade License"
                  className={styles.input}                  
                />
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton} disabled={isLoading || loading}>
              {isLoading || loading ? 'Adding...' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCustomer;
