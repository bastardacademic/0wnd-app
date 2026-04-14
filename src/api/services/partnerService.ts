import axios from "axios";

export type PartnerRole = "dom" | "sub";
export type PartnershipStatus = "pending" | "accepted" | "rejected" | "dissolved";

export interface UserSearchResult {
  _id: string;
  username: string;
  role: string;
}

export interface Partnership {
  _id: string;
  initiator: { _id: string; username: string };
  recipient: { _id: string; username: string };
  initiatorRole: PartnerRole;
  status: PartnershipStatus;
  createdAt: string;
}

export async function searchUsers(query: string): Promise<UserSearchResult[]> {
  const res = await axios.get(`/api/partners/search?q=${encodeURIComponent(query)}`);
  return Array.isArray(res.data) ? res.data : [];
}

export async function sendLinkRequest(initiatorId: string, recipientId: string, initiatorRole: PartnerRole): Promise<Partnership> {
  const res = await axios.post("/api/partners/request", { initiatorId, recipientId, initiatorRole });
  return res.data;
}

export async function getPartnerships(userId: string): Promise<Partnership[]> {
  const res = await axios.get(`/api/partners/${userId}`);
  return Array.isArray(res.data) ? res.data : [];
}

export async function updatePartnershipStatus(partnershipId: string, status: PartnershipStatus): Promise<Partnership> {
  const res = await axios.patch(`/api/partners/${partnershipId}`, { status });
  return res.data;
}
