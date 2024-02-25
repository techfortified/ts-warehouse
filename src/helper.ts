import { Product } from "./interfaces";


//this solution works too 
// export function calculateBestGrouping(products: Product[]): string[] {
//   const combinations: { combination: string[], totalUnique: number, totalDistance: number }[] = [];
  
//   function generateCombinations(index: number, currentCombination: string[], totalDistance: number): void {
//     if (index === products.length) {
//       combinations.push({ 
//         combination: [...currentCombination], 
//         totalUnique: new Set(currentCombination).size, 
//         totalDistance
//       });
//       return;
//     }
//     for (const warehouse of products[index].warehouses) {
//       generateCombinations(index + 1, [...currentCombination, warehouse.warehouseId], totalDistance + warehouse.distanceToCustomer);
//     }
//   }

//   generateCombinations(0, [], 0);

//   combinations.sort((a, b) => {
//     if (a.totalUnique !== b.totalUnique) {
//       return a.totalUnique - b.totalUnique;
//     } else {
//       return a.totalDistance - b.totalDistance;
//     }
//   });

//   console.log(combinations)

//   return combinations[0].combination;

//   // return combinations;

// }

// this solution is more optimized than the above solution
export function calculateBestGrouping(products: Product[]): string[] {
  const memo: Map<string, { totalUnique: number, totalDistance: number }> = new Map();

  function generateCombinations(index: number, currentCombination: string[], totalDistance: number): void {
      const key = currentCombination.join('-');
      if (memo.has(key)) {
          const memoized = memo.get(key);
          if (memoized && memoized.totalDistance <= totalDistance) return; // Pruning
      }

      if (index === products.length) {
          const uniqueWarehouses = new Set(currentCombination).size;
          const combinationData = { totalUnique: uniqueWarehouses, totalDistance };
          memo.set(key, combinationData);
          return;
      }
      for (const warehouse of products[index].warehouses) {
          generateCombinations(index + 1, [...currentCombination, warehouse.warehouseId], totalDistance + warehouse.distanceToCustomer);
      }
  }

  generateCombinations(0, [], 0);

  let bestCombination: { combination: string[], totalUnique: number, totalDistance: number } = {
      combination: [],
      totalUnique: Number.MAX_SAFE_INTEGER,
      totalDistance: Number.MAX_SAFE_INTEGER
  };

  memo.forEach((data, combination) => {
      if (data.totalUnique < bestCombination.totalUnique ||
          (data.totalUnique === bestCombination.totalUnique && data.totalDistance < bestCombination.totalDistance)) {
          bestCombination = { combination: combination.split('-'), ...data };
      }
  });

  return bestCombination.combination;
}
