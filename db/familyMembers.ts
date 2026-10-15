import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';
import { SCHEMA } from './schema';
import { FamilyMember, Alert } from './types';

let db: SQLiteDatabase | null = null;

function getDb(): SQLiteDatabase {
  if (!db) {
    db = openDatabaseSync('familysheed.db');
    db.execSync(SCHEMA);
  }
  return db;
}

interface MemberRow {
  id: string;
  name: string;
  relation: string;
  notificationToken: string | null;
}

interface AlertRow {
  id: string;
  scanId: string;
  senderId: string;
  timestamp: number;
  read: number;
}

function toFamilyMember(row: MemberRow): FamilyMember {
  return {
    id: row.id,
    name: row.name,
    relation: row.relation,
    notificationToken: row.notificationToken ?? undefined,
  };
}

function toAlert(row: AlertRow): Alert {
  return {
    id: row.id,
    scanId: row.scanId,
    senderId: row.senderId,
    timestamp: row.timestamp,
    read: row.read === 1,
  };
}

export async function initFamilyDb(): Promise<void> {
  getDb();
}

export async function addFamilyMember(member: FamilyMember): Promise<void> {
  getDb().runSync(
    'INSERT OR REPLACE INTO family_members (id, name, relation, notificationToken) VALUES (?, ?, ?, ?)',
    member.id,
    member.name,
    member.relation,
    member.notificationToken ?? null
  );
}

export async function getFamilyMembers(): Promise<FamilyMember[]> {
  const rows = getDb().getAllSync<MemberRow>(
    'SELECT * FROM family_members ORDER BY name'
  );
  return rows.map(toFamilyMember);
}

export async function removeFamilyMember(id: string): Promise<void> {
  getDb().runSync('DELETE FROM family_members WHERE id = ?', id);
}

export async function saveAlert(alert: Alert): Promise<void> {
  getDb().runSync(
    'INSERT OR REPLACE INTO alerts (id, scanId, senderId, timestamp, read) VALUES (?, ?, ?, ?, ?)',
    alert.id,
    alert.scanId,
    alert.senderId,
    alert.timestamp,
    alert.read ? 1 : 0
  );
}

export async function getAlerts(): Promise<Alert[]> {
  const rows = getDb().getAllSync<AlertRow>(
    'SELECT * FROM alerts ORDER BY timestamp DESC'
  );
  return rows.map(toAlert);
}

export async function markAlertRead(id: string): Promise<void> {
  getDb().runSync('UPDATE alerts SET read = 1 WHERE id = ?', id);
}
