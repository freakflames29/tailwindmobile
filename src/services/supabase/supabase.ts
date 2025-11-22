import "react-native-url-polyfill/auto";

import { createClient, SupportedStorage } from "@supabase/supabase-js";
import { mmkvStorage } from "../../Adapter/Storage/StorageController";
const supabaseUrl = "https://hmervwutdnwpnteyagtj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZXJ2d3V0ZG53cG50ZXlhZ3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTg0ODYsImV4cCI6MjA3OTMzNDQ4Nn0.HSsQEjaVaGJ602WEQCIaptxATDfIZT7Vx4DqjhohdS0";

// Create a dedicated MMKV instance for Supabase auth
// const mmkv = new MMKV({ id: 'supabase-auth' })

// Adapt MMKV to Supabase's storage interface
const storage: SupportedStorage = {
  setItem: (key: string, value: string) => {
    mmkvStorage.set(key, value);
  },
  getItem: (key: string) => {
    const v = mmkvStorage.getString(key);
    return v ?? null;
  },
  removeItem: (key: string) => {
    mmkvStorage.remove(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
