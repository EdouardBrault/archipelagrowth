
// Utilitaire partagé pour la validation des emails personnels
export const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 
  'yahoo.com', 
  'hotmail.com', 
  'outlook.com', 
  'live.com', 
  'msn.com', 
  'aol.com', 
  'icloud.com', 
  'me.com'
];

export const isPersonalEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return PERSONAL_EMAIL_DOMAINS.includes(domain);
};
