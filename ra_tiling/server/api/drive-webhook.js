import express from "express";
import syncDriveToS3 from "../services/syncDriveToS3";
const app = express();
app.use(express.json());

// POST handler for Google Drive notifications
app.post('/api/drive-webhook', async (req, res) => {
    try {
        await syncDriveToS3();
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/drive-webhook', (req, res) => {
    res.status(200).send('OK');
});

module.exports = app;