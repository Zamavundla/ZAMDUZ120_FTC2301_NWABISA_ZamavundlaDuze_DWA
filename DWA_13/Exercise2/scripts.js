const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  
  // 1. Use forEach to console log each product name to the console.
  products.forEach(product => {
    console.log(product.product);
  });
  
  // 2. Use filter to filter out products that have a name longer than 5 characters.
  const filteredProducts = products.filter(product => product.product.length <= 5);
  console.log(filteredProducts);
  
  // 3. Using both filter and map, convert all prices that are strings to numbers,
  // remove all products from the array that do not have prices, and calculate the combined price.
  const combinedPrice = products
    .filter(product => product.price !== '' && !isNaN(product.price))
    .map(product => Number(product.price))
    .reduce((total, price) => total + price, 0);
  console.log(combinedPrice);
  
  // 4. Use reduce to concatenate all product names to create a string.
  const concatenatedNames = products.reduce((str, product, index) => {
    if (index === 0) {
      return product.product;
    } else {
      return `${str}, ${product.product}`;
    }
  }, '');
  console.log(concatenatedNames);
  
  // 5. Use reduce to calculate both the highest and lowest-priced items.
  const priceStats = products.reduce((stats, product) => {
    if (stats.highest === null || product.price > stats.highest.price) {
      stats.highest = product;
    }
    if (stats.lowest === null || product.price < stats.lowest.price) {
      stats.lowest = product;
    }
    return stats;
  }, { highest: null, lowest: null });
  console.log(`Highest: ${priceStats.highest.product}. Lowest: ${priceStats.lowest.product}`);
  
  // 6. Using only Object.entries and reduce, recreate the object with the exact same values,
  // but change the object keys 'product' to 'name' and 'price' to 'cost'.
  const transformedObject = Object.entries(products).reduce((obj, [key, value]) => {
    obj[key] = { name: value.product, cost: value.price };
    return obj;
  }, {});
  console.log(transformedObject);
  