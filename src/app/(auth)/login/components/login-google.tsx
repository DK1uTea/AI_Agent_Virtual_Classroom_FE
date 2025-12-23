'use client';

import envConfig from "@/config/config";
import GoogleIcon from "@/assets/icon/google-icon";
import { Button } from "@/components/ui/button";

type LoginGoogleProps = {
  text: string;
}
const LoginGoogle = ({
  text
}: LoginGoogleProps) => {

  return (
    <Button
      variant={"outline"}
      className="w-full"
      type="button"
      onClick={() => {
        window.location.href = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/oauth2/authorization/google`
      }}
    >
      <GoogleIcon />
      {text}
    </Button>
  );
}

export default LoginGoogle