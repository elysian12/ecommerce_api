const Product = require('../models/Product')



const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            "message": error,
        });
    }
}
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({
                status: "Success",
                message: `No Product Found by id : ${req.params.id}`
            });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllProducts = async (req, res) => {
    const qNew = req.query.new;
    const qCategoty = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);

        } else if (qCategoty) {
            products = await Product.find({
                categories: {
                    $in: [qCategoty],
                },
            });

        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);

    }
}


module.exports = { createProduct, getProduct, getAllProducts }