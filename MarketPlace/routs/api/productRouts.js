const express = require("express");
const { body, validationResult } = require("express-validator");
const authencateToken = require("../../middleware/auth");
const Product = require("../../models/Product.js");
const File = require("../../models/File.js");
const productRoute = express.Router();

productRoute.get("/", authencateToken, async (req, res) => {
  try {
    const id = req.user.id;
    // const products = await Product.find({ userId: id });

    const aggregator = [];

    // aggregator.push({
    //   // $match: {
    //   //   name: "iPhone"
    //   // },
    //   // $sort: {
    //   //   createdAt: 1,
    //   // }
    // });

    aggregator.push({
      $lookup: {
        from: "files",
        localField: "fileId",
        foreignField: "_id",
        as: "files",
      },
    });

    aggregator.push({
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "Product Owner"
      }
    });

    const products = await Product.aggregate(aggregator);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

productRoute.post(
  "/add",
  [authencateToken, [body("name", "Product Name is required").notEmpty()]],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      // console.log(req?.user?.type);

      if (req?.user?.type != "admin") {
        return res
          .status(400)
          .json({ message: "You are not allowed to add any products." });
      }

      const id = req.user.id;
      const productObj = {
        name: req.body.name,
        desc: req?.body?.desc ?? "",
        madeIn: req?.body?.madeIn ?? "",
        price: req?.body?.price ?? 0,
        expireAt: new Date(),
        fileId: req?.body?.fileId ?? "",
        userId: id,
      };

      // console.log(productObj);
      const product = new Product(productObj);

      await product.save();
      if (product?.fileId) {
        const productWithFIle = await Product.findById(product._id)
          .populate(["fileId", "userId"])
          .exec();
        res.status(200).json(productWithFIle);
      }
      //   res.status(200).json({ message: "Successfully created product" });
    } catch (error) {
      res.status(500).json({ message: "Error creating product" });
    }
  }
);

productRoute.put("/:id", authencateToken, async (req, res) => {
  try {
    if (req?.user?.type != "admin") {
      return res.status(500).json({ message: "your are not admin" });
    }
    const id = req.params.id;
    const userId = req.user.id;

    const body = req.body;

    const product = await Product.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong happened" });
  }
});

productRoute.get("/:id", authencateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong happened" });
  }
});

productRoute.delete("/:id", authencateToken, async (req, res) => {
  try {
    if (req?.user?.type != "admin") {
      return res.status(500).json({ message: "your are not admin" });
    }

    const id = req.params.id;
    const userId = req.user.id;

    const product = await Product.findByIdAndDelete({
      _id: id,
    });

    if (product) {
      const fileId = product.fileId;
      console.log(fileId);
      if (fileId) {
        await File.findByIdAndDelete({ _id: fileId });
        console.log("file deleted");
      }
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong happened" });
  }
});

module.exports = productRoute;
