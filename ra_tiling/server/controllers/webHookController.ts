import syncDriveToS3 from "../services/syncDriveToS3.ts";
import {Request, Response} from "express";

export async function syncWithDrive(req: Request, res: Response) {
    try {
        await syncDriveToS3();
        res.status(200).send("Sync begin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error syncing with drive");
    }
}
