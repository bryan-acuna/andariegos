import type { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabase";
import type { AuthContextType } from "../types/auth.types";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //get active session get app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    //listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };
  const signOut = () => {
    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
