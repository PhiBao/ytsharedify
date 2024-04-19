// Define the interface for a user
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Define the interface for a video
export interface Video {
  id: number;
  title: string;
  url: string;
  sharedBy: User;
}

// Define the interface for the response from the backend API when registering a user
export interface RegisterResponse {
  success: boolean;
  message: string;
}

// Define the interface for the response from the backend API when logging in
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}

// Define the interface for the response from the backend API when fetching the list of shared videos
export interface VideoListResponse {
  success: boolean;
  message: string;
  videos: Video[];
}