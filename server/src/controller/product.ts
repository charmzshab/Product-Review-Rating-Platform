import { Request, Response } from "express";
import { addProduct, getProducts, searchProducts } from "../service/product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await getProducts();
    res.status(200).json(result);
  } catch (e: any) {
    res.status(500).json({ message: "Error getting products: ", e });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json({ message: "Product added successfully", product });
  } catch (e: any) {
    res.status(500).json({ message: "Error adding a product: ", e });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    console.log(query);
    const products = await searchProducts(query);
    if (products.length === 0)
      res.status(404).json({ message: `No results for: ${query}` });
    res.status(200).json(products);
  } catch (e: any) {
    res.status(500).json({ message: `${e}` });
  }
};
