export interface Product {
    id: string;
    warehouses: WarehouseDistance[];
  }
  
  export interface WarehouseDistance {
    warehouseId: string;
    distanceToCustomer: number;
  }