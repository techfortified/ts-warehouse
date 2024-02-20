interface Product {
    id: string;
    warehouses: WarehouseDistance[];
  }
  
  interface WarehouseDistance {
    warehouseId: string;
    distanceToCustomer: number;
  }
  
  type BestGrouping = {
    productId: string;
    warehouseId: string;
    distanceToCustomer: number;
  };
  
  export function calculateBestGrouping(products: Product[]): BestGrouping[] {
    const warehouseCounts: Record<string, number> = {}; // Track warehouse usage count
    const bestWarehouses: Record<string, BestGrouping> = {}; // Store best warehouse per product
  
    for (const product of products) {
      let minDistance = Infinity;
      let bestWarehouse: BestGrouping | null = null;
  
      for (const warehouse of product.warehouses) {
        const warehouseId = warehouse.warehouseId;
        const distance = warehouse.distanceToCustomer;
  
        warehouseCounts[warehouseId] = (warehouseCounts[warehouseId] || 0) + 1;
  
        if (
          distance < minDistance ||
          (distance === minDistance && Object.keys(bestWarehouses).length < Object.keys(warehouseCounts).length)
        ) {
          minDistance = distance;
          bestWarehouse = {
            productId: product.id,
            warehouseId,
            distanceToCustomer: distance,
          };
        }
      }
  
      if (bestWarehouse) {
        bestWarehouses[product.id] = bestWarehouse;
      }
    }

    console.log(bestWarehouses)
  
    return Object.values(bestWarehouses).sort((a, b) => (a.distanceToCustomer - b.distanceToCustomer));
  }
  
  // Example usage
//   const products: Product[] = [
//     {
//       id: "product1",
//       warehouses: [
//         { warehouseId: "warehouseA", distanceToCustomer: 10 },
//         { warehouseId: "warehouseB", distanceToCustomer: 8 },
//         { warehouseId: "warehouseC", distanceToCustomer: 15 },
//       ],
//     },
//     {
//       id: "product2",
//       warehouses: [
//         { warehouseId: "warehouseA", distanceToCustomer: 12 },
//         { warehouseId: "warehouseC", distanceToCustomer: 20 },
//       ],
//     },
//     {
//       id: "product3",
//       warehouses: [
//         { warehouseId: "warehouseB", distanceToCustomer: 5 },
//         { warehouseId: "warehouseC", distanceToCustomer: 18 },
//       ],
//     },
//   ];
  
//   const bestGrouping = calculateBestGrouping(products);
//   console.log(bestGrouping);
  