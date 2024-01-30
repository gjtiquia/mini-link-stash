import express from "express"
import cors from "cors";
import { env } from "./env";

const app = express();
const PORT = env.PORT;

// Global Middleware
app.use(cors()); //! Allows from all origins
// app.use(express.json());

// Set Routes
// app.use("/login", loginRouter);

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
