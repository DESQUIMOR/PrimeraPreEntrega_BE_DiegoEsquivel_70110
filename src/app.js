import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();
const PORT = 3030;

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
