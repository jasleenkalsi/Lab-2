import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import validateOrigin from "./middleware/validateOrigin.js";
import validateApiKey from "./middleware/validateApiKey.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";


dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cors());
app.use(validateOrigin);
app.use(validateApiKey);

app.get("/", (_req, res) => {
  res.send("Employee/Role API running 🚀");
});

app.use("/api/employees", employeeRoutes);
app.use("/api/roles", roleRoutes);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
