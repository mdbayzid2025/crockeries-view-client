import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useCreateShopInfoMutation, useGetShopInfoQuery, useUpdateShopInfoMutation } from "../features/orderService";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const {data, isLoading} = useGetShopInfoQuery();

  const [createShopInfo] = useCreateShopInfoMutation();
  const [updateShopInfoMutation] = useUpdateShopInfoMutation();

  // Fetch shop info
//   const getShopInfo = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await shopData().unwrap();
//       console.log("rrrr", response);
//       setShop(response);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [shopData]);

  // Create shop info
  const addShopInfo = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createShopInfo(data).unwrap();
      setShop(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [createShopInfo]);

  // Update shop info
  const updateShopInfo = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateShopInfoMutation(data).unwrap();
      setShop(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [updateShopInfoMutation]);

  useEffect(()=>{
    if(data){

    console.log("ddda", data[0]);
     setShop(data[0]);
  }
  },[data])
  

  return (
    <ShopContext.Provider
      value={{
          shop,
        loading,
        error,        
        addShopInfo,
        updateShopInfo,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
