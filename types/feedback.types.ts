 
export interface Review {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
  likes: number;
  webShow: boolean;
  createdAt: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
  date: string;
}

export interface Feedback {
  _id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
  likes: number;
  webShow: boolean;
  createdAt: string;
}