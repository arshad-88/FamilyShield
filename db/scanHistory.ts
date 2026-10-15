import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';
import { SCHEMA } from './schema';
import { ScanResult } from './types';

let db: SQLiteDatabase | null = null;

function getDb(): SQLiteDatabase {
  if (!db) {
    db = openDatabaseSync('familysheed.db');
    db.execSync(SCHEMA);
  }
  return db;
}

/**
 * Ensure the database is initialized and the schema exists.
 * Idempotent — safe to call on every app start.
 */
export async function initDb(): Promise<void> {
  getDb();
}

interface ScanRow {
  id: string;
  timestamp: number;
  inputText: string;
  inputType: string;
  verdict: string;
  confidence: number;
  riskIndicators: string;
  explanation: string;
  scamType: string;
  language: string;
  sharedWithFamily: number;
}

function toScanResult(row: ScanRow): ScanResult {
  return {
    id: row.id,
    timestamp: row.timestamp,
    inputText: row.inputText,
    inputType: row.inputType,
    verdict: row.verdict as ScanResult['verdict'],
    confidence: row.confidence,
    riskIndicators: JSON.parse(row.riskIndicators || '[]'),
    explanation: row.explanation,
    scamType: row.scamType,
    language: row.language,
    sharedWithFamily: row.sharedWithFamily === 1,
  };
}

export async function getScanById(id: string): Promise<ScanResult | null> {
  const row = getDb().getFirstSync<ScanRow>(
    'SELECT * FROM scans WHERE id = ?',
    id
  );
  return row ? toScanResult(row) : null;
}

export async function saveScan(scan: ScanResult): Promise<void> {
  getDb().runSync(
    `INSERT OR REPLACE INTO scans
      (id, timestamp, inputText, inputType, verdict, confidence, riskIndicators, explanation, scamType, language, sharedWithFamily)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    scan.id,
    scan.timestamp,
    scan.inputText,
    scan.inputType,
    scan.verdict,
    scan.confidence,
    JSON.stringify(scan.riskIndicators),
    scan.explanation,
    scan.scamType,
    scan.language,
    scan.sharedWithFamily ? 1 : 0
  );
}

export async function getRecentScans(limit: number): Promise<ScanResult[]> {
  const rows = getDb().getAllSync<ScanRow>(
    'SELECT * FROM scans ORDER BY timestamp DESC LIMIT ?',
    limit
  );
  return rows.map(toScanResult);
}
