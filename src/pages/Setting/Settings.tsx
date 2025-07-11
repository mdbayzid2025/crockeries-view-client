import React, { useEffect, useRef, useState } from 'react';
import styles from '../../theme/exports/_form.module.css';
import ImageUploadSpinner from '../../components/Common/ImageUploadSpinner/ImageUploadSpinner';
import { useShop } from '../../app/Context/ShopContext'; // Assuming useShop provides the necessary shop context and mutations

const Settings = () => {
  const [formData, setFormData] = useState<any>({ // Type formData as any
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

  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Type photoPreview as string or null
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // Type logoPreview as string or null
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false); // Type loadingPhoto as boolean
  const [loadingLogo, setLoadingLogo] = useState<boolean>(false); // Type loadingLogo as boolean  
  const photoInputRef = useRef<HTMLInputElement>(null); // Type photoInputRef as HTMLInputElement or null
  const logoInputRef = useRef<HTMLInputElement>(null); // Type logoInputRef as HTMLInputElement or null

  const {
    shop,    
    createShopInfo, // Assuming these are from useShop or imported elsewhere
    updateShopInfo, // Assuming these are from useShop or imported elsewhere
    createStatus, // Not explicitly used but good to acknowledge
    updateStatus, // Not explicitly used but good to acknowledge  
  }: any = useShop(); // Type useShop hook return as any to suppress errors if it's not strictly typed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Type e as React.ChangeEvent<HTMLInputElement>
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value })); // Type prev as any
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'logo') => { // Type e as React.ChangeEvent<HTMLInputElement>
    const file = e.target.files?.[0]; // Use optional chaining
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const imageUrl = result?.url;

      setFormData((prev: any) => ({ ...prev, [type]: imageUrl })); // Type prev as any
      if (type === 'photo') setPhotoPreview(imageUrl);
      else setLogoPreview(imageUrl);
    } catch (err: any) { // Type err as any
      console.error("Image upload failed:", err?.message || err);
    } finally {
      if (type === 'photo') setLoadingPhoto(false);
      else setLoadingLogo(false);
    }
  };

  const triggerImageUpload = (type: 'photo' | 'logo') => {
    if (type === 'photo' && photoInputRef.current) photoInputRef.current.click();
    else if (type === 'logo' && logoInputRef.current) logoInputRef.current.click();
  };

  const removeImage = (type: 'photo' | 'logo') => {
    setFormData((prev: any) => ({ ...prev, [type]: null })); // Type prev as any
    if (type === 'photo') {
      setPhotoPreview(null);
      if (photoInputRef.current) photoInputRef.current.value = '';
    } else {
      setLogoPreview(null);
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Type e as React.FormEvent<HTMLFormElement>
    e.preventDefault();    
    try {
      if(shop?._id){ // Check for shop._id to determine update vs create
        console.log("calling update");
        await updateShopInfo({ ...formData, id: shop._id } as any).unwrap(); // Cast formData as any, use unwrap()
      }else{
        console.log("calling create");
        await createShopInfo(formData as any).unwrap(); // Cast formData as any, use unwrap()
      }      
    } catch (error: any) { // Type error as any
      console.error("Submission failed:", error?.data?.message || error?.message || 'Unknown error');
    }
  };

  useEffect(()=>{
    if(shop){
      setFormData((prev: any) => ({ // Type prev as any
        ...prev, 
        site_name: shop.site_name || '',
        vat_no: shop.vat_no || '',
        mobile: shop.mobile || '',
        address: shop.address || '',
        district: shop.district || '',
        email: shop.email || '',
        owner_name: shop.owner_name || '',
        photo: shop.photo || null,
        logo: shop.logo || null,
      }));
      setPhotoPreview(shop.photo || null);
      setLogoPreview(shop.logo || null);
    }
  },[shop]);
  
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(e, 'photo')}
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
                ) : logoPreview || formData?.logo ? (
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(e, 'logo')}
                  accept="image/jpeg, image/png"
                  className={styles.fileInput}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={createStatus?.isLoading || updateStatus?.isLoading || loadingPhoto || loadingLogo} // Added isLoading states to disable button
            >
              {(createStatus?.isLoading || updateStatus?.isLoading || loadingPhoto || loadingLogo) ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
