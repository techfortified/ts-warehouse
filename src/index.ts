import { calculateBestGrouping } from "./helper";
import { Product } from "./interfaces";


const firstGrouping: Product[] = [
  {
    id: "1",
    warehouses: [{warehouseId: "A", distanceToCustomer: 5}, { warehouseId: "C", distanceToCustomer: 10 }]
  },
  {
    id: "2",
    warehouses: [{warehouseId: "B", distanceToCustomer: 7}, { warehouseId: "C", distanceToCustomer: 10 }]
  },
  {
    id: "3",
    warehouses: [{warehouseId: "B", distanceToCustomer: 7}]
  }
 ]


 const secondGrouping: Product[] = [
  {
    id: "1",
    warehouses: [{warehouseId: "A", distanceToCustomer: 5}, { warehouseId: "C", distanceToCustomer: 10 }]
  },
  {
    id: "2",
    warehouses: [{warehouseId: "B", distanceToCustomer: 11}, { warehouseId: "C", distanceToCustomer: 10 }]
  },
  {
    id: "3",
    warehouses: [{warehouseId: "B", distanceToCustomer: 11}]
  }
 ]


 const thirdGrouping: Product[] = [
  {
    id: "1",
    warehouses: [{warehouseId: "A", distanceToCustomer: 5}, { warehouseId: "B", distanceToCustomer: 11 }]
  },
  {
    id: "2",
    warehouses: [{warehouseId: "B", distanceToCustomer: 11}, { warehouseId: "C", distanceToCustomer: 10 }]
  },
  {
    id: "3",
    warehouses: [{warehouseId: "B", distanceToCustomer: 11}]
  },
  {
    id: "4",
    warehouses: [{warehouseId: "C", distanceToCustomer: 10}]
  }
 ]


const bestGrouping = calculateBestGrouping(firstGrouping);
// const bestGrouping = calculateBestGrouping(secondGrouping);
// const bestGrouping = calculateBestGrouping(thirdGrouping);

console.log(bestGrouping);
