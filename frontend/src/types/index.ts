// Define the interface for a user
export interface User {
  id: number;
  username: string;
}

export interface Video {
  id: number;
  embed_url: string;
  title: string;
  description: string;
  user: User;
}
