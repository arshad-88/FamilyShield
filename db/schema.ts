export const SCHEMA = `
CREATE TABLE IF NOT EXISTS scans (
  id TEXT PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  inputText TEXT NOT NULL,
  inputType TEXT NOT NULL,
  verdict TEXT NOT NULL,
  confidence INTEGER NOT NULL,
  riskIndicators TEXT NOT NULL,
  explanation TEXT NOT NULL,
  scamType TEXT NOT NULL,
  language TEXT NOT NULL,
  sharedWithFamily INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS family_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  notificationToken TEXT
);
CREATE TABLE IF NOT EXISTS alerts (
  id TEXT PRIMARY KEY,
  scanId TEXT NOT NULL,
  senderId TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  read INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (scanId) REFERENCES scans(id)
);
`;
