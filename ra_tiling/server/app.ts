import express from "express";
import { syncWithDrive } from "./controllers/webHookController";
import { fetchGalleryController } from "./controllers/fetchGalleryController";

const app = express();
app.use(express.json());

const PORT = 3001; 

app.post("/api/drive-webhook", syncWithDrive);

app.get('/', (req, res) => {
    res.send('Get request to home');
});

app.get('/fetch-gallery', fetchGalleryController);

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server running on port ${PORT}`);
});