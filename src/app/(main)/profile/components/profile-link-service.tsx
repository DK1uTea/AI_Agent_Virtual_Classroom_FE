'use client'
import GoogleIcon from "@/assets/icon/google-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user-types";
import { CheckCircle2, LinkIcon } from "lucide-react";

type ProfileLinkServiceProps = {
  user: User;
}

const ProfileLinkService = ({ user }: ProfileLinkServiceProps) => {

  const handleLinkAccount = (service: string) => {
    // Logic to link the account with the specified service
    console.log(`Linking account with ${service}`);
  }

  if (!user) return (<div>Loading...</div>);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts Link</CardTitle>
        <CardDescription>
          Connect with other services for easier login
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <GoogleIcon />
            </div>
            <div>
              <p>Google</p>
              <p className="text-muted-foreground">
                {user.linkedAccounts?.google ? 'Connected' : 'Not Connected'}
              </p>
            </div>
          </div>
          {user.linkedAccounts?.google ? (
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Connected
            </Badge>
          ) : (
            <Button variant="outline" size="sm" onClick={() => handleLinkAccount('google')}>
              <LinkIcon className="mr-2 h-4 w-4" />
              Link
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileLinkService;