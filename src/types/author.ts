export interface Author {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export const getAuthorFullName = (author: Author): string => {
  return `${author.first_name} ${author.last_name}`;
};
