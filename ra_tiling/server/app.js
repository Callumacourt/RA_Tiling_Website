import express from "express";
import { syncWithDrive } from "./controllers/webHookController.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/api/drive-webhook", syncWithDrive);

app.get('/', (req, res) => {
    res.send('Get request to home')
})

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server running on port ${PORT}`);
});
