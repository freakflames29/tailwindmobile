import { supabase } from "./supabase";

// sigin in with email and password
export const signInWithPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

// signout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
