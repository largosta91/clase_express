import express from 'express';

// Creamos una app de Express 
const app = express();

app.use(express.json());// habilita para que nuestro servidor pueda recibir  solicitudes en formato JSON

const products=[
      {
      title: "Laptop Dell",
      price: 950000,
      id: 1
    },
          {
      title: "celular iphone 16",
      price: 1500000,
      id: 2
    },
          {
      title: "lavabajillas LG",
      price: 1300000,
      id: 3
    },
          {
      title: "Robot aspiradora samsung",
      price: 750000,
      id: 4
    }
]
// Creamos una función que nos permita obtener (TODOS) los productos
const getallProducts = () => {
  return products;
}
//Creamos una función que nos permita obtener (UN) producto por su id
const getProductById = (product_id) => {
  const product_found = products.find(product => product.id === parseInt(product_id));
  return product_found;
}

// Definimos que metodo HTTP vamos a utilizar para responder la petición.
app.get('/products', (request, response) => {
  const products = getallProducts();
    response.json({
      message:"producto obtenido correctamente",
      data: {
        products: products
      }

    })
})
//product_id es un parametro que sirve para que el cliente nos indique que producto quiere obtener
app.get('/products/:product_id', (request, response) => { 

  const product_id = request.params.product_id;

  // Llamamos a la función que nos permite obtener (UN) producto por su id
  const product_found = getProductById(product_id);
  if (product_found) {
    response.json({
      message: "Producto encontrado correctamente",
      data: {
        product: product_found
      }
    });
  } else {
    response.status(404).json({
      message: "Producto no encontrado"
    });
  }

})


// Dedicamos  un puerto de ejecución a nuestra aplicación
app.listen(8090, () => {
  console.log('Servidor esuchando puerto' + 8090);
});



//si el cliente nos quiciera agregar un producto a la lista de prodcutos 
/*app.post('/products', (request, response) => {
  const product_title = request.body.title; // Asumiendo que el cuerpo de la solicitud contiene el nuevo producto
  const product_price = request.body.price; // Asumiendo que el cuerpo de la solicitud contiene el precio del nuevo producto
  const newProduct = {
    title: product_name,
    price: product_price,
    id: products.length + 1 // Asignamos un nuevo ID basado en la longitud actual del array ya existente
  };
  // Agregamos el nuevo producto al array de productos ya existente al inicio de nuestra app
  products.push(newProduct);
  response.status(201).json({
    message: "Producto agregado correctamente",
    data: {
      product: getallProducts()
    }
  });
}); */


//metodos de http visto y por ver en clase
// GET: Obtener datos (recuperar información)
// POST: Enviar datos (crear un nuevo recurso)
// PUT: Actualizar datos (modificar un recurso existente)
// DELETE: Eliminar datos (borrar un recurso existente).

