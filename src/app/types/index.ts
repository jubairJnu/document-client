export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  body: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  summary?: string;
}

export interface CreateArticleRequest {
  title: string;
  body: string;
  tags: string[];
}

export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  id: string;
}

export interface SearchFilters {
  keyword?: string;
  tags?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}
