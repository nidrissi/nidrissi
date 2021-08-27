export default interface ClientPrincipal {
  userId: string;
  identityProvider: string;
  userDetails: string;
  userRoles: string[];
}

export function formatClient(client: ClientPrincipal): string {
  return `${client.userDetails} @ ${client.identityProvider} - ${client.userId}`;
}
