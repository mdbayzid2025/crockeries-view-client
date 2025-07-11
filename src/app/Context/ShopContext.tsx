import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  useCreateShopInfoMutation,
  useGetShopInfoQuery,
  useUpdateShopInfoMutation,
} from "../features/orderService";



// 👉 Define the context type
type ShopContextType = {
  shop: any | null;
  loading: boolean;
  error: any;
  token: boolean;
  setToken: React.Dispatch<React.SetStateAction<boolean>>;
  addShopInfo: (data: any) => Promise<void>;
  updateShopInfo: (data: any) => Promise<void>;
};

// 👉 Create context with null default value
const ShopContext = createContext<ShopContextType | null>(null);

// 👉 Provider props type
interface ShopProviderProps {
  children: ReactNode;
}

// 👉 ShopProvider component
export const ShopProvider = ({ children }: ShopProviderProps) => {
  const [shop, setShop] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [token, setToken] = useState(false);

  const { data } = useGetShopInfoQuery(null);
  const [createShopInfo] = useCreateShopInfoMutation();
  const [updateShopInfoMutation] = useUpdateShopInfoMutation();

  // Create shop info
  const addShopInfo = useCallback(
    async (data: any) => {
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
    },
    [createShopInfo]
  );

  // Update shop info
  const updateShopInfo = useCallback(
    async (data: any) => {
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
    },
    [updateShopInfoMutation]
  );

  // Set shop data when fetched
  useEffect(() => {
    if (data && data.length > 0) {
      setShop(data[0]);
    }
  }, [data]);

  return (
    <ShopContext.Provider
      value={{
        shop,
        loading,
        error,
        token,
        setToken,
        addShopInfo,
        updateShopInfo,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// 👉 useShop hook with error fallback
export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
