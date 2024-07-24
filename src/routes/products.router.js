import { Router } from "express";
const router = Router();
import { ProductManager } from "../controllers/productManager.js";

const manager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const productsList = await manager.getProducts();
        res.json(productsList);
    } catch (error) {
        console.error("Error fetching product list:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await manager.getProductById(parseInt(id));
        if(!product) {
            res.send("Product not found"); 
        } else {
            res.json(product); 
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res)=>{
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const newProduct = await manager.addProduct(title, description, price, thumbnail, code, stock);
        res.json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.put("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid);
    try {
        const product = await manager.getProductById(parseInt(id));
        if(!product) {
            res.send("Product not found"); 
        } else {
            let productToUpdate = req.body
            const updated = await manager.updateProduct(id, productToUpdate);
            res.json(updated); 
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:pid", async (req, res)=>{
    let id = parseInt(req.params.pid);
    try {
        const product = await manager.getProductById(parseInt(id));
        if(!product) {
            res.send("Product not found"); 
        } else {
            await manager.deleteProduct(id);
            res.json(product); 
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
})

export default router; 