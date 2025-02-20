import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/actions";

export const GoogleSigninButton: React.FC = () => {
  return (
    <Button type='button' variant='outline' onClick={signInWithGoogle}>
      <img
        src='https://authjs.dev/img/providers/google.svg'
        alt='Google-logo'
        width={20}
        height={20}
        className='mr-2'
      />{" "}
      Sign in with Google
    </Button>
  );
};
