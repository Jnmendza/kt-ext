import { GoogleSigninButton } from "@/components/GoogleSignInButton";
import "../global.css";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

export const Popup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const supabase = createSupabaseClient();

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await chrome.storage.local.get("session");
      if (session) {
        const { error } = await supabase.auth.setSession(session);
        if (!error) setIsLoggedIn(true);
      }
    };
    checkSession();
  }, [supabase.auth]);
  return (
    <div className='text-5xl p-10 font-extrabold'>
      <div>KickTab Extension</div>
      {isLoggedIn ? <p>You are logged in</p> : <GoogleSigninButton />}
    </div>
  );
};
