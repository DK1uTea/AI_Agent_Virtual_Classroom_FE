'use client'

import GoogleIcon from "@/assets/icon/google-icon";
import { Button } from "@/components/ui/button";

type LoginGoogleProps = {
  text: string;
}
const LoginGoogle = ({
  text
}: LoginGoogleProps) => {

  return (
    <Button variant={"outline"} className="w-full" type="button">
      <GoogleIcon />
      {text}
    </Button>
  );
}

export default LoginGoogle