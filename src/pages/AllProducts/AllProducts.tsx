import React, { useState } from 'react'

import styles from './AllProducts.module.css'
import AllProductsHeader from './AllProductsHeader'
import AddProduct from '../../components/AddProduct/AddProduct'

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
        
         {selected === 'All Products' && 
        <div className={styles.pageTable}>
        <table>
        <tr className={styles.tableHeader}>
          <th className={styles.tableCheckbox}>
            {/* <mat-checkbox #matCheckbox (change)="onAllSelectChange($event)"></mat-checkbox> */}
          </th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Brand</th>
          
          
          <th>Sale Price</th>          
          <th>Status</th>
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
    </div>
  )
}

export default AllProducts