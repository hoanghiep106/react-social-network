db = new Mongo().getDB('products');

db.products.remove({});

db.products.insert([
  {
    name: "Rofvape Abox",
    price: 1300,
    type: "fullkit",
    images: [
      {
        color: "Black",
        url: "http://ductin-leather.com/react-shop-web/public/images/fullkit/Abox-mini-black.png"
      },
      {
        color: "Silver",
        url: "http://ductin-leather.com/react-shop-web/public/images/fullkit/Abox-mini-black.png"
      }
    ]
  }
]);

db.issues.createIndex({ name: 1 });
db.issues.createIndex({ price: 1 });
db.issues.createIndex({ type: 1 });
