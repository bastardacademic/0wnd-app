export interface ConsentLog {
  id: string;
  userId: string;
  partnerId: string;
  eventType: "linked" | "rule_changed" | "safeword_triggered";
  details: string;
  timestamp: string;
}
