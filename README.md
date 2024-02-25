# Project [Read info](https://docs.google.com/document/d/1Ga2KoEPs_xa5k_CflNmJ4ptfM9Ebt9pqVs4weciF9eM)

### PROBLEM DESCRIPTION:

Assume the following 2 interfaces:

```ts 

interface Product {
  id: string;
  warehouses: WarehouseDistance[]
}
interface WarehouseDistance {
  warehouseId: string;
  distanceToCustomer: number;
}

```

Write a function, calculateBestGrouping, which takes an array of Products and returns an equal length array of WarehouseDistances.

This problem involves finding the best grouping of products based on certain criteria. Let's break it down:

1. **Input:** The function `calculateBestGrouping` takes an array of `Product` objects as input. Each `Product` object seems to have information about its warehouses.

2. **Objective**: The objective is to determine the best grouping of warehouses for the products. The "best" grouping is defined based:
   Routes: all warehouses to be visited
   Total Unique Warehouses:  unique warehouses.
   Total Distance to Customer: sum of distance across all products.

E.g 

```ts 
const groupings = [{routes: [A,B,C], totalUnique: 3, totalDistance: 12}, {routes: [A,B,B], totalUnique: 2, totalDistance: 20}]

```
3. Conditions:
The function must select the best warehouse for each product, according to this criteria:
It must use as few different warehouses as possible (if one grouping would have 3 different warehouses and the other one 2, the latter would be selected)
Out of the fewest warehouse options, select the one with the smallest distanceToConsumer summed across all products.

Sample
E.g if you have [A,B,C] with a total distance of 12, unique warehouses of 3 and [A,B,B] with a total distance of 20, unique warehouses of 2, [A,B,B] will be the answer as this requires only visiting just two warehouses to get the products.


Some examples (across the next 3 pages):


```ts

interface Product {
 id: string;
 warehouses: WarehouseDistance[]
}
interface WarehouseDistance {
 warehouseId: string;
 distanceToCustomer: number;
}
const calculateBestGrouping = (groupings: Product[]) => {
 throw "Not implemented"
}
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
calculateBestGrouping(firstGrouping); // Should return: ["A", "B", "B"], totalDistance = 19
calculateBestGrouping(secondGrouping); // Should return ["A", "B", "B"], totalDistance = 27
calculateBestGrouping(thirdGrouping); // Should return: ["B", "C", "B", "C"], totalDistance = 42

```



### SOLUTION DESCRIPTION

Let's break down the solution provided:

1. **Function Signature**:
    - `calculateBestGrouping(products: Product[]): string[]`: This function takes an array of `Product` objects and returns an array of strings representing the best grouping of warehouses for the products.

2. **Memoization Setup**:
    - `const memo: Map<string, { totalUnique: number, totalDistance: number }> = new Map();`: This initializes a map (`memo`) to store memoized combinations. The keys are strings representing combinations, and the values are objects containing the total unique warehouses and total distance.

3. **Combination Generation Function**:
    - `generateCombinations(index: number, currentCombination: string[], totalDistance: number): void`: This is a recursive function that generates combinations of warehouses for the products.
    - `const key = currentCombination.join('-');`: This creates a string key representing the current combination by joining the warehouse IDs with a hyphen.
    - `if (memo.has(key)) { ... }`: This checks if the combination has already been memoized. If it has, and if the memoized total distance is less than or equal to the current total distance, it skips further exploration of this combination (pruning).
    - `if (index === products.length) { ... }`: If all products have been processed, it calculates the total unique warehouses and stores the combination data in the memo.
    - It recursively explores combinations by iterating through warehouses for the current product and advancing to the next product.

4. **Combination Generation Invocation**:
    - `generateCombinations(0, [], 0);`: This initiates the combination generation process starting with the first product, an empty combination, and zero total distance.

5. **Finding the Best Combination**:
    - `let bestCombination: { combination: string[], totalUnique: number, totalDistance: number }`: This initializes an object to store the best combination found.
    - `memo.forEach((data, combination) => { ... }`: This iterates through the memoized combinations to find the best combination based on the defined criteria (total unique warehouses and total distance).
    - It updates `bestCombination` if a combination with fewer unique warehouses or a shorter total distance is found.

6. **Return**:
    - `return bestCombination.combination;`: This returns the warehouse IDs of the best combination found.

Overall, the solution efficiently explores combinations using recursion, employs memoization to avoid redundant calculations, prunes suboptimal branches, and finds the best combination based on specified criteria.