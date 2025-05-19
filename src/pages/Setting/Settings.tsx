import React, { useEffect, useRef, useState } from 'react';
import styles from '../../theme/exports/_form.module.css';
import ImageUploadSpinner from '../../components/Common/ImageUploadSpinner/ImageUploadSpinner';
import { useCreateShopInfoMutation } from '../../app/features/orderService';
import { useShop } from '../../app/Context/ShopContext';

const Settings = () => {
  const [formData, setFormData] = useState({
    site_name: '',
    vat_no: '',
    mobile: '',
    address: '',
    district: '',
    email: '',
    owner_name: '',
    photo: null,
    logo: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);  
  const photoInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const {
    shop,
    isLoading,
    createShopInfo,
    updateShopInfo,
    createStatus,
    updateStatus,
    refetch,
  } = useShop();


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: any, type: 'photo' | 'logo') => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'photo') setLoadingPhoto(true);
    else setLoadingLogo(true);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'crockeries-view');
    data.append('cloud_name', 'dxspmmowc');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dxspmmowc/image/upload', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      const imageUrl = result?.url;

      setFormData(prev => ({ ...prev, [type]: imageUrl }));
      if (type === 'photo') setPhotoPreview(imageUrl);
      else setLogoPreview(imageUrl);
    } catch (err) {
      console.error(err);
    } finally {
      if (type === 'photo') setLoadingPhoto(false);
      else setLoadingLogo(false);
    }
  };

  const triggerImageUpload = (type: 'photo' | 'logo') => {
    if (type === 'photo') photoInputRef.current.click();
    else logoInputRef.current.click();
  };

  const removeImage = (type: 'photo' | 'logo') => {
    setFormData(prev => ({ ...prev, [type]: null }));
    if (type === 'photo') {
      setPhotoPreview(null);
      photoInputRef.current.value = '';
    } else {
      setLogoPreview(null);
      logoInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();    
    try {
      if(shop){   
        console.log("calling update");
      await updateShopInfo({...formData, id:shop._id})
      }else{
        console.log("calling create");
      await createShopInfo(formData); 
      }      
    } catch (error) {
       console.log(err?.data?.message)
    }
  };


  useEffect(()=>{
if(shop){
    setFormData(prev=>({...prev, ...shop}))
  }
  },[shop])
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Site Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Site Name</label>
              <input
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
                placeholder="Site Name"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>VAT No</label>
              <input
                name="vat_no"
                value={formData.vat_no}
                onChange={handleChange}
                placeholder="VAT Number"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Mobile</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>District</label>
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Owner Name</label>
            <input
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              placeholder="Owner's Full Name"
              className={styles.input}
            />
          </div>

          {/* Image Uploads */}
          <div className={styles.doubleInput}>
            {/* Photo */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Photo</label>
              <div className={styles.profileImageContainer}>
                {loadingPhoto ? (
                  <ImageUploadSpinner />
                ) : photoPreview || formData?.photo ? (
                  <div className={styles.profileImageWrapper}>
                    <img src={photoPreview || formData?.photo} alt="Photo" className={styles.imagePreview} />
                    <button type="button" className={styles.removeImageButton} onClick={() => removeImage('photo')}>×</button>
                  </div>
                ) : (
                  <div className={styles.profileUploadArea} onClick={() => triggerImageUpload('photo')}>
                    <div className={styles.uploadContent}>
                      <svg className={styles.profileUploadIcon} viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                      <p className={styles.uploadText}>Click to upload photo</p>
                      <p className={styles.uploadHint}>JPEG or PNG</p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={photoInputRef}
                  onChange={(e) => handleImageUpload(e, 'photo')}
                  accept="image/jpeg, image/png"
                  className={styles.fileInput}
                />
              </div>
            </div>

            {/* Logo */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Logo</label>
              <div className={styles.profileImageContainer}>
                {loadingLogo ? (
                  <ImageUploadSpinner />
                ) : logoPreview || formData?.logo ?  (
                  <div className={styles.profileImageWrapper}>
                    <img src={logoPreview || formData?.logo} alt="Logo" className={styles.imagePreview} />
                    <button type="button" className={styles.removeImageButton} onClick={() => removeImage('logo')}>×</button>
                  </div>
                ) : (
                  <div className={styles.profileUploadArea} onClick={() => triggerImageUpload('logo')}>
                    <div className={styles.uploadContent}>
                      <svg className={styles.profileUploadIcon} viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                      <p className={styles.uploadText}>Click to upload logo</p>
                      <p className={styles.uploadHint}>JPEG or PNG</p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  accept="image/jpeg, image/png"
                  className={styles.fileInput}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
