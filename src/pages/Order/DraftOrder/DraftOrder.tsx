import React, { useEffect, useState } from 'react'
import styles from './DraftOrder.module.css'
import { CiSearch } from 'react-icons/ci'
import useOrderSummary from '../../../hooks/useOrderSummary'

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

const DraftOrder = () => {
     const [orders, setOrders] = useState([])
        const [items, setItems]= useState([])
    
        const storedItem = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : []
    
        useEffect(()=>{
    
            if(storedItem){
                setItems(storedItem?.items);
                setOrders([storedItem])
            }
        },[])

        const summary = useOrderSummary(items);

        console.log('sssss', summary);

  return (
    <div>
<div className={styles.container}>
      <div className={styles.searchBar}>
      <CiSearch size={25}/>
        <input
          type="text"
          placeholder="Search by Order Number.."
          className={styles.input}
        />
      </div>
    </div>

{orders && orders.map((order, index)=> 
<div key={index}>
<div className={styles.orderHeader}>
<div className={styles.leftContant}>
    <p className={styles.customer}>{order?.customer_name} <span>({order?.customer_code})</span></p>
    <p>{order?.mobile}</p>
    <p>{order?.address}, {order?.district}</p>    
</div>

<div className={styles.rightContant}>
<a href="/invoice/1234" className={styles.printButton}>Print</a>

<h3>Order No : 1111  </h3>


<div className={styles.statusContainer}>
<p className={styles.status}>Status: <span>Rough Order</span></p>

<select name="" id="">
    <option disabled selected value="change">Change</option>
    <option value="rough">Rough</option> 
    <option value="ladger">Ladger</option>
</select>

</div>
<p>Order Date: 14 Fab 2025</p>
</div>    
  </div>
<div className={styles.pageTable}>
        <table>
        <tr className={styles.tableHeader}>
          <th className={styles.tableCheckbox}>
            Image
          </th>
          <th>Name</th>
          <th>Code</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Unit</th>
          <th>price</th>                    
          <th>Discount</th>                    
          <th>Amuont</th>                    
        </tr>     
        
        {items && items.map((data:any)=>
            <tr key={data._id}>                  
      <td>

        <img src="src\assets\profile.jpg" alt="image" className={styles.tableImage} />
      </td>      
      <td>{data?.name}</td>
      <td>{data?.code}</td>
      <td>{data?.category}</td>
      <td>{data?.brand}</td>
      <td>{data?.unit}</td>
      <td>{data?.price}</td>
      <td>{data?.discount}</td>
      <td>{data?.amount}</td>      
      </tr>)} 
      <tr>
        <td colSpan={9}>
{/* -------- Sub Total ---------- */}

<div className={styles.wrapper}>
            <div className={styles.itemRow}>
                <p className={styles.label}>Subtotal</p>
                <p className={styles.value}>{summary?.subTotal}</p>
            </div>            
            <div className={styles.itemRow}>
                <p className={styles.label}>Discount</p>
                <p className={styles.value}>{summary?.totalDiscount}</p>
            </div>
            <div className={styles.totalContainer}>
                <p className={styles.totalLabel}>Net Total</p>
                <p className={styles.totalValue}>{summary?.netTotal}</p>
            </div>
        </div>
        </td>
      </tr>
        </table>
        
        </div> 
</div>
)}
    </div>
  )
}

export default DraftOrder