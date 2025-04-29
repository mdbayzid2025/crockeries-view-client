import React, { useEffect, useState } from 'react'
import styles from '../../theme/exports/_table.module.css' 
import selfStyle from './AllCustomer.module.css';
import img from '../../assets/profile.jpg'
import { CiSearch } from 'react-icons/ci'
import { useGetCategoriesQuery } from '../../app/features/categorySlice';
import { useGetCustomersQuery } from '../../app/features/customerService';



const AllCustomer = () => { 
 const {data: result, isLoading, isError, error, refetch } = useGetCustomersQuery()
 const {data: categories, isLoading:loading  } = useGetCategoriesQuery();
 


 if (isLoading) return <div>Loading...</div>;
 if (isError) {
    console.log('eeee',error?.message )
    return <div>Error: {error?.message}</div>
};   
 
 if(categories){
    console.log('cccc', categories)
 }


  return (
    <div>      

      <div className={selfStyle.container}>
      <div className={selfStyle.searchBar}>
      <CiSearch size={25}/>
        <input
          type="text"
          placeholder="Search product"
          className={selfStyle.input}
        />
      </div>     

    <div className={styles.pageTable}>
      {result?.data?.length  ? 
        <table>
        <tr className={styles.tableHeader}>
          <th className={styles.tableCheckbox}>
            {/* <mat-checkbox #matCheckbox (change)="onAllSelectChange($event)"></mat-checkbox> */}
          </th>
          <th>Photo</th>
  <th>Party Code</th>
  <th>Name</th>
  <th>Mobile</th>
  <th>Address</th>
  <th>District</th>    
  <th>Trade License</th>          
  <th>Actions</th>
        </tr>     
        
        {result?.data && result?.data.map((data:any)=>
            <tr key={data._id}>            
      <td>
        <input id="vue-checkbox-list" className={styles.checkBox} type="checkbox" />
      </td>
      <td>

        <img src={data?.photo ?? img} alt="image" className={styles.tableImage} />
      </td>
      <td>{data.code}</td>      
      <td>{data.name}</td>
      <td>{data.mobile}</td>
      <td>{data.address}</td>
      <td>{data.district}</td>
      <td>{data.trade_license}</td>      
      <td>
        Print
        </td>      
            </tr>
        )  } 
        </table>: 
        <div> Nothing Here</div> }
        </div>
    </div>

     
     
      </div>
  )
}

export default AllCustomer