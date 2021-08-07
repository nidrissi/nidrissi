export interface ClientPrincipal {
  userId: string;
  identityProvider: string;
  userDetails: string;
  userRoles: string[];
}

export function formatClient({
  userId,
  userDetails,
  identityProvider,
}: ClientPrincipal): string {
  return `Provider: ${identityProvider} - Details: ${userDetails} - ID: ${userId}`;
}
