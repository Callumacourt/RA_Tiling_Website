import express from "express";
import { syncWithDrive } from "./controllers/webHookController";
import { fetchGalleryController } from "./controllers/fetchGalleryController";
import { contactController } from "./controllers/contactController";

const app = express();
app.use(express.json());

const PORT = 3001; 

app.post("/api/drive-webhook", syncWithDrive);

app.get('/', (req, res) => {
    res.send('Get request to home');
});

app.get('/fetch-gallery', fetchGalleryController);

app.post('/contactForm', contactController);

const server = app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server running on port ${PORT}`);
});

server.requestTimeout = 10000;