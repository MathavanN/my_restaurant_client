import { fetchStockTypesAsync } from "features/stockType/stockTypeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StockItemList from "./StockItemList";

const StockItem = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchStockTypesAsync())
  }, [dispatch])
  
  return (
    <>
      <StockItemList />
    </>
  );
};

export default StockItem;
