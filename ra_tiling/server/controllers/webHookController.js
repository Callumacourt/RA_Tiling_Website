import syncDriveToS3 from "../services/syncDriveToS3.tsx";

export async function syncWithDrive(req, res) {
    try {
        await syncDriveToS3();
        res.status(200).send("Sync begin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error syncing with drive");
    }
}
