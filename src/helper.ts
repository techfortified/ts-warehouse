import { Product } from "./interfaces";

export function calculateBestGrouping(products: Product[]): string[] {
  const combinations: { combination: string[], totalUnique: number, totalDistance: number }[] = [];
  
  function generateCombinations(index: number, currentCombination: string[], totalDistance: number): void {
    if (index === products.length) {
      combinations.push({ 
        combination: [...currentCombination], 
        totalUnique: new Set(currentCombination).size, 
        totalDistance
      });
      return;
    }
    for (const warehouse of products[index].warehouses) {
      generateCombinations(index + 1, [...currentCombination, warehouse.warehouseId], totalDistance + warehouse.distanceToCustomer);
    }
  }

  generateCombinations(0, [], 0);

  combinations.sort((a, b) => {
    if (a.totalUnique !== b.totalUnique) {
      return a.totalUnique - b.totalUnique;
    } else {
      return a.totalDistance - b.totalDistance;
    }
  });

  return combinations[0].combination;

  // return combinations;

}

