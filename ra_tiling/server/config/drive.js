import { google } from 'googleapis';

const KEYFILEPATH = "../../service-account.json"
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export const drive = google.drive({ version: "v3", auth });
