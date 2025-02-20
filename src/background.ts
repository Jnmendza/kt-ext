import { createSupabaseClient } from "./lib/supabase";
const supabase = createSupabaseClient();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("TAB::", { tabId, tab });
  if (changeInfo.url?.startsWith(chrome.identity.getRedirectURL())) {
    finishUserOAuth(changeInfo.url);
  }
});

async function finishUserOAuth(url: string | URL) {
  try {
    console.log("Handling user OAuth callback...");

    // Extract tokens from the URL hash
    const hashMap: { [key: string]: string } = new URL(url).hash
      .slice(1)
      .split("&")
      .reduce((acc: { [key: string]: string }, part) => {
        const [key, value] = part.split("=");
        acc[key] = value;
        return acc;
      }, {});

    const { access_token, refresh_token } = hashMap;
    if (!access_token || !refresh_token) {
      throw new Error("No Supabase tokens found in URL hash");
    }

    // Set the session in Supabase
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;

    // Save the session to local storage
    await chrome.storage.local.set({ session: data.session });

    // Redirect to a success page
    // chrome.tabs.update(tabId, { url: "https://myapp.com/user-login-success/" });

    console.log("Finished handling user OAuth callback");
  } catch (error) {
    console.error("Error during OAuth callback:", error);
  }
}
