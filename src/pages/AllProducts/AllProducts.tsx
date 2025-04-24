
import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from './AllProducts.module.css'
import AllProductsHeader from './AllProductsHeader'
import AddProduct from '../../components/AddProduct/AddProduct'
import { CiSearch } from 'react-icons/ci'

const products = [
    {
        "_id": "67e18a16ee1a89daa46a8e99",
        "name": "DAMBOO 123",
        "slug": "damboo-123",
        "category": {
            "_id": "67dbc9fa6d61c673b334412b",
            "name": "popular-store",
            "slug": "popular-store"
        },
        "brand": {
            "_id": "67db7bbb6d61c673b3343cfd",
            "name": "banner 3",
            "slug": "banner-3"
        },
        "images": [
            "https://api.bongodeshi.com/api/upload/images/2-e822dae0-14df-4cb8-b145-ea4dc0966b34-0517.webp",
            "https://api.bongodeshi.com/api/upload/images/chjpdmf0zs9sci9pbwfnzxmvd2vic2l0zs8ymdiyltexl3bmlxmxmdgtcg0tndexmy1tb2nrdxauanbn-2546.webp",
            "https://api.bongodeshi.com/api/upload/images/download-22bd.jpg",
            "https://api.bongodeshi.com/api/upload/images/pexels-madebymath-90946-b102c.jpg"
        ],
        "salePrice": 100,
        "discountType": 1,
        "discountAmount": 10,
        "variationList": [],
        "ratingCount": 5,
        "ratingTotal": 1,
        "status": "publish",
        "createdAtString": "2025-03-24",
        "subCategory": ""
    },
    {
        "_id": "67ab81d9b069adee90796b07",
        "name": "I.N.C. International Concepts",
        "slug": "inc-international-concepts",
        "category": {
            "_id": "6783f76109a431b4d9fe7125",
            "name": "Men Fashion",
            "slug": "men-fashion"
        },
        "subCategory": {
            "_id": "6783fb7109a431b4d9fe7359",
            "name": "Jeans Pants",
            "slug": "jeans-pants"
        },
        "brand": {
            "_id": "67278c3fac3ec141b8526e5c",
            "name": "Test Brand",
            "slug": "test-brand"
        },
        "images": [
            "https://v2.api.bongodeshi.softlabit.com/api/upload/images/download-c0c10.jpg",
            "https://v2.api.bongodeshi.softlabit.com/api/upload/images/pexels-madebymath-90946-31099.jpg"
        ],
        "salePrice": null,
        "discountType": null,
        "discountAmount": null,
        "variationList": [
            {
                "name": "Red, s",
                "salePrice": 10,
                "discountType": 1,
                "discountAmount": 20,
                "quantity": 21,
                "trackQuantity": null,
                "_id": "67ab81d9b069adee90796b08"
            }
        ],
        "ratingCount": 0,
        "ratingTotal": 0,
        "status": "publish",
        "createdAtString": "2025-02-11"
    },
    {
        "_id": "67ab7f95b069adee9079641c",
        "name": "Tommy Hilfiger Women's Power-Grid Round-Neck Shift Dress",
        "slug": "tommy-hilfiger-womens-power-grid-round-neck-shift-dress",
        "category": {
            "_id": "6783f7dd09a431b4d9fe71cd",
            "name": "Cosmatics",
            "slug": "cosmatics"
        },
        "brand": {
            "_id": "67278c3fac3ec141b8526e5c",
            "name": "Test Brand",
            "slug": "test-brand"
        },
        "images": [
            "https://v2.api.bongodeshi.softlabit.com/api/upload/images/2-e822dae0-14df-4cb8-b145-ea4dc0966b34-a6c1.webp"
        ],
        "salePrice": null,
        "discountType": null,
        "discountAmount": null,
        "variationList": [
            {
                "name": "Red, XL",
                "salePrice": 100,
                "discountType": 1,
                "discountAmount": 5,
                "quantity": 100,
                "trackQuantity": null,
                "_id": "67ab7f95b069adee9079641d"
            },
            {
                "name": "Red, XXL",
                "salePrice": 100,
                "discountType": 1,
                "discountAmount": 5,
                "quantity": 100,
                "trackQuantity": null,
                "_id": "67ab7f95b069adee9079641e"
            },
            {
                "name": "Blue, XL",
                "salePrice": 100,
                "discountType": 1,
                "discountAmount": 5,
                "quantity": 100,
                "trackQuantity": null,
                "_id": "67ab7f95b069adee9079641f"
            },
            {
                "name": "Blue, XXL",
                "salePrice": 100,
                "discountType": 1,
                "discountAmount": 5,
                "quantity": 100,
                "trackQuantity": null,
                "_id": "67ab7f95b069adee90796420"
            }
        ],
        "ratingCount": 0,
        "ratingTotal": 0,
        "status": "publish",
        "createdAtString": "2025-02-11"
    },
    {
        "_id": "6794a7aac1cdc5080a78016f",
        "name": "Formal Shirt",
        "slug": "formal-shirt",
        "category": {
            "_id": "6783f76109a431b4d9fe7125",
            "name": "Men Fashion",
            "slug": "men-fashion"
        },
        "subCategory": {
            "_id": "6783fb7109a431b4d9fe7359",
            "name": "Jeans Pants",
            "slug": "jeans-pants"
        },
        "brand": {
            "_id": "67278c3fac3ec141b8526e5c",
            "name": "Test Brand",
            "slug": "test-brand"
        },
        "images": [
            "https://v2.api.bongodeshi.softlabit.com/api/upload/images/oip-7945.jpg"
        ],
        "salePrice": 1000,
        "discountType": 1,
        "discountAmount": 10,
        "variationList": [],
        "ratingCount": 0,
        "ratingTotal": 0,
        "status": "publish",
        "createdAtString": "2025-01-25"
    },
    {
        "_id": "6791de89833cfa012819200e",
        "name": "Angular Product 1",
        "slug": "angular-product-1",
        "category": {
            "_id": "6783f76109a431b4d9fe7125",
            "name": "Men Fashion",
            "slug": "men-fashion"
        },
        "subCategory": {
            "_id": "6783f95309a431b4d9fe7336",
            "name": "Pants",
            "slug": "pants"
        },
        "brand": {
            "_id": "67278c3fac3ec141b8526e5c",
            "name": "Test Brand",
            "slug": "test-brand"
        },
        "images": [
            "https://v2.api.bongodeshi.softlabit.com/api/upload/images/banner-1-6775.jpg"
        ],
        "salePrice": 200,
        "discountType": 2,
        "discountAmount": 20,
        "variationList": [],
        "ratingCount": 0,
        "ratingTotal": 0,
        "status": "publish",
        "createdAtString": "2025-01-23"
    }
]

const AllProducts = () => {
    const [selected, setSelectTab] = useState('All Products')
  return (
    <div>
        <AllProductsHeader selected={selected} setSelectTab={setSelectTab} />
       {selected === 'All Products' && <div className={styles.container}>
      <div className={styles.searchBar}>
      <CiSearch size={25}/>
        <input
          type="text"
          placeholder="Search product"
          className={styles.input}
        />
      </div>
    </div>}


         {selected === 'All Products' && 
        <div className={styles.pageTable}>
        <table>
        <tr className={styles.tableHeader}>
          <th className={styles.tableCheckbox}>
            {/* <mat-checkbox #matCheckbox (change)="onAllSelectChange($event)"></mat-checkbox> */}
          </th>
          <th>Image</th>
          <th>Name</th>
          <th>Code</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Unit</th>                    
          <th>Price</th>                    
          <th>Actions</th>
        </tr>     
        
        {products && products.map((data:any)=>
            <tr key={data._id}>            
      <td>
        <input id="vue-checkbox-list" className={styles.checkBox} type="checkbox" />
      </td>
      <td>

        <img src={data.images[0]} alt="image" className={styles.tableImage} />
      </td>
      <td>{data.subCategory ? data?.subCategory?.name : 'N/A'}</td>
      <td>{data.brand?.name}</td>
      <td>{data.brand?.name}</td>
      <td>{data.brand?.name}</td>
      <td>{data.brand?.name}</td>
      <td>{data.brand?.name}</td>
      <td>{data.brand?.name}</td>
      
            </tr>
        )  } 
        </table>
        </div>
        }
        {selected === 'Add Product' && <AddProduct />}        
        {/* {selected === 'Add Product' && <ProductForm2 />} */}
    </div>
  )
}

export default AllProducts;


const ProductForm2 = () => {
  // Initialize categories as empty array since we'll fetch them
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  const [product, setProduct] = useState({
    name: "",
    code: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    image: null,
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // If API fails, use the default categories as fallback
      setCategories([
        "Overview",
        "History",
        "Understanding Fake News",
        "Categories",
        "Spot Fake News",
        "Prevent Fake News",
        "Deepfakes",
        "ResourcesToggle DropdownExample"
      ]);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setProduct({ ...product, category: value });
    
    // Handle both cases - when categories are strings or objects
    const selected = Array.isArray(categories) 
      ? categories.find(c => typeof c === 'object' ? c.name === value : c === value)
      : null;
    
    setBrands(selected && selected.brands ? selected.brands : []);
  };

  const handleBrandChange = (e) => {
    setProduct({ ...product, brand: e.target.value });
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const res = await axios.post("/api/categories", { name: newCategory });
      setCategories([...categories, res.data]);
      setNewCategory("");
      setShowAddCategory(false);
    } catch (error) {
      // If API fails, add as simple string
      setCategories([...categories, newCategory]);
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand || !selectedCategory) return;
    try {
      await axios.post(`/api/categories/${selectedCategory}/brands`, { brand: newBrand });
      setBrands([...brands, newBrand]);
      setNewBrand("");
      setShowAddBrand(false);
    } catch (error) {
      // If API fails, just add to local state
      setBrands([...brands, newBrand]);
      setNewBrand("");
      setShowAddBrand(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });
    try {
      await axios.post("/api/products", formData);
      alert("Product added successfully!");
    } catch (error) {
      alert("Error adding product");
      console.error(error);
    }
  };

  // Helper function to get category name regardless of data structure
  const getCategoryName = (category) => {
    return typeof category === 'object' ? category.name : category;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Title"
            required
            value={product.name}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            name="code"
            placeholder="Item Code"
            required
            value={product.code}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {categories.length === 0 && (
          <button
            type="button"
            onClick={() => setShowAddCategory(true)}
            className="text-blue-500"
          >
            + Add Category
          </button>
        )}

        {showAddCategory && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
              className="border p-2 rounded"
            />
            <button type="button" onClick={handleAddCategory} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
          </div>
        )}

        <select
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option 
              key={typeof cat === 'object' ? cat._id : index} 
              value={getCategoryName(cat)}
            >
              {getCategoryName(cat)}
            </option>
          ))}
        </select>

        <div>
          <select
            name="brand"
            value={product.brand}
            onChange={handleBrandChange}
            required
            className="border p-2 w-full rounded"
            disabled={!selectedCategory}
          >
            <option value="">Select Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>

          {selectedCategory && (
            <button
              type="button"
              onClick={() => setShowAddBrand(true)}
              className="text-blue-500 mt-2"
            >
              + Add Brand
            </button>
          )}

          {showAddBrand && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                placeholder="New Brand"
                className="border p-2 rounded"
              />
              <button type="button" onClick={handleAddBrand} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            value={product.price}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={product.discount}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleInputChange}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          rows="3"
          placeholder="Product description"
          value={product.description}
          onChange={handleInputChange}
          className="border p-2 w-full rounded"
        ></textarea>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};



const ProductForm = () => {
    const [categories, setCategories] = useState([
        "Overview",
"History",
"Understanding Fake News",
"Categories",
"Spot Fake News",
"Prevent Fake News",
"Deepfakes",
"ResourcesToggle DropdownExample"
    ]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [brands, setBrands] = useState([]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [showAddBrand, setShowAddBrand] = useState(false);
    const [newBrand, setNewBrand] = useState("");
  
    const [product, setProduct] = useState({
      name: "",
      code: "",
      category: "",
      brand: "",
      price: "",
      discount: "",
      image: null,
      description: "",
    });
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    };
  
    const handleCategoryChange = (e) => {
      const value = e.target.value;
      setSelectedCategory(value);
      setProduct({ ...product, category: value });
      const selected = categories.find((c) => c.name === value);
      setBrands(selected ? selected.brands : []);
    };
  
    const handleBrandChange = (e) => {
      setProduct({ ...product, brand: e.target.value });
    };
  
    const handleAddCategory = async () => {
      if (!newCategory) return;
      const res = await axios.post("/api/categories", { name: newCategory });
      setCategories([...categories, res.data]);
      setNewCategory("");
      setShowAddCategory(false);
    };
  
    const handleAddBrand = async () => {
      if (!newBrand || !selectedCategory) return;
      await axios.post(`/api/categories/${selectedCategory}/brands`, { brand: newBrand });
      setBrands([...brands, newBrand]);
      setNewBrand("");
      setShowAddBrand(false);
    };
  
    const handleInputChange = (e) => {
      const { name, value, files } = e.target;
      setProduct({
        ...product,
        [name]: files ? files[0] : value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });
      await axios.post("/api/products", formData);
      alert("Product added successfully!");
    };
  
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Title"
              required
              value={product.name}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              name="code"
              placeholder="Item Code"
              required
              value={product.code}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
  
          {categories?.length === 0 && (
            <button
              type="button"
              onClick={() => setShowAddCategory(true)}
              className="text-blue-500"
            >
              + Add Category
            </button>
          )}
  
          {showAddCategory && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New Category"
                className="border p-2 rounded"
              />
              <button type="button" onClick={handleAddCategory} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
            </div>
          )}
  
          <select
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            required
            className="border p-2 w-full rounded"
          >
            <option value="">Select Category</option>
            {categories && categories.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
  
          <div>
            <select
              name="brand"
              value={product.brand}
              onChange={handleBrandChange}
              required
              className="border p-2 w-full rounded"
            >
              <option value="">Select Brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
  
            <button
              type="button"
              onClick={() => setShowAddBrand(true)}
              className="text-blue-500 mt-2"
            >
              + Add Brand
            </button>
  
            {showAddBrand && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  placeholder="New Brand"
                  className="border p-2 rounded"
                />
                <button type="button" onClick={handleAddBrand} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
              </div>
            )}
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              value={product.price}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
            <input
              type="number"
              name="discount"
              placeholder="Discount %"
              value={product.discount}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
  
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
  
          <textarea
            name="description"
            rows="3"
            placeholder="Product description"
            value={product.description}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          ></textarea>
  
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </form>
      </div>
    );
  };
  
//   export default ProductForm;