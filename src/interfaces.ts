export interface Product {
    id: string;
    warehouses: WarehouseDistance[];
  }
  
  export interface WarehouseDistance {
    warehouseId: string;
    distanceToCustomer: number;
  }
  
  export interface WarehouseGrouping {
    warehouseId: string;
    totalDistance: number;
  }