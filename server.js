const express = require('express');
const MongoClient = require('mongodb').MongoClient;

let app = express();
let db;

/*MongoClient.connect('mongodb://localhost/products').then(connection => {
  db = connection;
  app.listen(8080, () => {
    console.log('App started on port 8080');
  });
}).catch(error => {
  console.log('ERROR:', error);
});

app.get('/products', (req, res) => {
  db.collection('products').find().toArray().then(issues => {
    const metadata = { total_count: products.length };
    res.json({ _metadata: metadata, records: issues })
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});*/

app.use(express.static('public'));

app.listen(5000, function() {
  console.log("Server is running on port 5000");
})
