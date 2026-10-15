export type Verdict = 'safe' | 'suspicious' | 'scam';

export interface ScanResult {
  id: string;
  timestamp: number;
  inputText: string;
  inputType: string;
  verdict: Verdict;
  confidence: number;
  riskIndicators: string[];
  explanation: string;
  scamType: string;
  language: string;
  sharedWithFamily?: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  notificationToken?: string;
}

export interface Alert {
  id: string;
  scanId: string;
  senderId: string;
  timestamp: number;
  read: boolean;
}
