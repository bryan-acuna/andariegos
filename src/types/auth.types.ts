import type {
  AuthError,
  Session,
  User,
  AuthResponse,
} from "@supabase/supabase-js";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
}
