const express = require('express')
const app = express()
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')
const amazon = require('amazon-product-api')  //requireing amazon api library.
const router = express.Router()
//const fs = require('fs')


app.use((req, res, next) => {  // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// fs.readFile('cart.json', (err, data) => {
//     if (data) {
//         cart = JSON.parse(data)
//     }
// })

// app.get('/getcart', (req, res) => {
//     res.send(cart)
// })

// app.post('/postcart', (req, res) => {
//     // console.log(res)
//     let newItem = req.body
//     cart = newItem
//     fs.writeFile('cart.json', JSON.stringify(cart))
//     res.json({ success: true })
// })


var client = amazon.createClient({
    awsId: "AKIAJE3K4IVF6OV4VKPQ",
    awsSecret: "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",
    awsTag: "2018030a-20",
    locale: 'CA',
});


//FEATURED ITEMS 

app.get('/featuredData', (req, res) => {
    req.query.searchIndex
    client.itemSearch({
        searchIndex: 'Grocery',
        responseGroup: 'ItemAttributes,Images,Offers',
        keywords: 'fair trade, eco',
        domain: 'webservices.amazon.ca',
    }).then(function (results) {
        res.json(results);
    }).catch(function (err) {
        console.log(err);
    });
})

app.get('/searchData', (req, res) => {
    console.log(req.query.keyword)
    let userInput = req.query.keyword
    req.query.searchIndex
    client.itemSearch({
        searchIndex: 'All',
        responseGroup: 'ItemAttributes,Images,Offers',
        // keywords: ('fair trade, eco'+ ', ' + userInput),
        keywords: userInput.split(' ').join(', '),
        //IncludeReviewSummary: true,
        domain: 'webservices.amazon.ca'
    }).then(function (results) {
        res.json(results);
    }).catch(function (err) {
        console.log(err);
    });
})



//Display by Category

app.get('/products/:category', (req, res) => {
    const category = req.params.category
    let result = []
    console.log(category)
    switch (category) {
        case 'baby':
            result =
                client.itemSearch({
                    searchIndex: 'Baby',
                    responseGroup: 'ItemAttributes,Images,Offers',
                    keywords: 'organic',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'beauty':
            result =
                client.itemSearch({
                    searchIndex: 'Beauty',
                    responseGroup: 'ItemAttributes,Images,Offers',
                    keywords: 'organic makeup',
                    IncludeReviewSummary: true,
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'health':
            result =
                client.itemSearch({
                    searchIndex: 'HealthPersonalCare',
                    responseGroup: 'ItemAttributes,Images,Offers',
                    keywords: 'organic, supplement',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'grocery':
            result =
                client.itemSearch({
                    searchIndex: 'Grocery',
                    responseGroup: 'ItemAttributes,Images,Offers',
                    keywords: 'organic, food',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'kitchen':
            result =
                client.itemSearch({
                    searchIndex: 'Kitchen',
                    responseGroup: 'ItemAttributes,Images,Offers',
                    keywords: 'eco friendly',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'pets':
            result =
                client.itemSearch({
                    searchIndex: 'PetSupplies',
                    responseGroup: 'ItemAttributes,Images,Offers',
                    keywords: 'organic, eco',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
            default:
            console.log('Error, Page does not exist')
    }
})








app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`)
})