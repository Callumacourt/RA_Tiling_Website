import express from "express";
import syncDriveToS3 from "../services/syncDriveToS3";
const app = express();
app.use(express.json());

/**
 * WebHook calls sync with drive
 */
app.post('/api/drive-webhook', async (req, res) => {
    console.log('Webhook hit');
    res.send('api called');
    try {
        await syncDriveToS3();
        console.log('Sync complete');
    } catch (error) {
        console.error('Sync failed:', error);
    }
});

app.get('/api/drive-webhook', (req, res) => {
    res.status(200).send('OK');
});

module.exports = app;