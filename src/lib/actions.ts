import { createSupabaseClient } from "./supabase";

export const signInWithGoogle = async () => {
  const supabase = createSupabaseClient();

  try {
    const manifest = chrome.runtime.getManifest();

    if (!manifest || !manifest.oauth2 || !manifest.oauth2.scopes)
      throw new Error("No manifest available");

    const url = new URL("https://accounts.google.com/o/oauth2/auth");

    url.searchParams.set("client_id", manifest.oauth2.client_id);
    url.searchParams.set("response_type", "id_token");
    url.searchParams.set("access_type", "offline");
    url.searchParams.set(
      "redirect_uri",
      `https://${chrome.runtime.id}.chromiumapp.org`
    );
    url.searchParams.set("scope", manifest.oauth2.scopes.join(" "));

    chrome.identity.launchWebAuthFlow(
      {
        url: url.href,
        interactive: true,
      },
      async (redirectedTo) => {
        if (chrome.runtime.lastError) {
          // auth was not successful
          console.error("Authentication failed:", chrome.runtime.lastError);
        } else {
          // auth was successful, extract the ID token from the redirectedTo URL
          if (redirectedTo) {
            const url = new URL(redirectedTo);
            const params = new URLSearchParams(url.hash);

            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: params.get("id_token") || "",
            });

            if (error) {
              console.error("Supabase login error:", error);
            } else {
              console.log("Login successfully:", data);
            }
          } else {
            // handle the case where redirectedTo is undefined
            throw new Error("Redirected URL is undefined");
          }
        }
      }
    );
  } catch (error) {
    console.error("Error during Google login:", error);
  }
};
