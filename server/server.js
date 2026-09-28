import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import farmRoutes from "./routes/farmRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to FarmLink");
});

app.use("/api/products", productRoutes);
app.use("/api/farms", farmRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
