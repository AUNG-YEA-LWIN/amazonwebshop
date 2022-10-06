const Products = require('./models/productsSchema');
const proudctsdata = require('./constant/productsdata');

const DefaultData = async () => {
    try{

        await Products.deleteMany({});

        const storeData = await Products.insertMany(proudctsdata);
        // console.log(storeData);

    }catch (err) {
        console.log("error" + err.message);
    }
}

module.exports = DefaultData;