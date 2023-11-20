const products = [
    { id: "1", name: "Zapatos", img: "url-img", price: 1800, category: "calzados", description: "Zapatos marrones", stock: 100 },
    { id: "2", name: "Botas", img: "url-img", price: 2000, category: "calzados", description: "Botas de cuero", stock: 100 },
    { id: "3", name: "Ojotas", img: "url-img", price: 500, category: "calzados", description: "Havaianas", stock: 100 },
    { id: "4", name: "Zapatillas", img: "url-img", price: 1500, category: "calzados", description: "Par de Zapas", stock: 100 },
    { id: "5", name: "Remera", img: "url-img", price: 100, category: "Indumentria", description: "Remera Negra", stock: 100 },
    { id: "6", name: "Camisa", img: "url-img", price: 500, category: "Indumentria", description: "Camisa blanca", stock: 100 },
    { id: "7", name: "Pantalón", img: "url-img", price: 1000, category: "Indumentria", description: "Pantalón de vestir", stock: 100 },
  ];
    
  export const getProducts = () => {
    return new Promise((resolve, reject) => {
      
      if (products.length > 0) {
        setTimeout(() => {
          resolve(products);
        }, 2000);
      } else {
        reject("No hay productos");
      }
    });
  };

  export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
      
      if (products.length > 0) {
        const product = products.find( p => p.id === id);
        
        setTimeout(() => {
          if(!product) {
            reject(`No se encuentra el productos con el id ${id}`)
          }
          resolve(product);
        }, 2000);
      } else {
        reject("No hay productos");
      }
    });
  };  
    