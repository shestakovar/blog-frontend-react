export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  last_login: string | null;
  email: string;
  date_joined: string;
  avatar: string | null;
}

export interface IPost {
  id: number;
  author: string;
  author_id: number;
  comment_count: number;
  title: string;
  content: string;
  created: string;
}

export interface IComment {
  id: number;
  author: string;
  author_id: number;
  content: string;
  created: string;
  origin: number;
}
