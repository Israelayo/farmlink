import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to FarmLink");
});

app.use("/api/products", productRoutes);
app.listen(5000, () => {
  console.log("server success");
});
