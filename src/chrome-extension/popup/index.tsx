import { GoogleSigninButton } from "@/components/GoogleSignInButton";
import "../global.css";

export const Popup = () => {
  return (
    <div className='text-5xl p-10 font-extrabold'>
      <div>KickTab Extension</div>
      <GoogleSigninButton />
    </div>
  );
};
