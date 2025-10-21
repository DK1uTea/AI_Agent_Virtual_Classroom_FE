import { userApis } from "@/apis/gateways/user-apis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Camera } from "lucide-react";
import { cookies } from "next/headers";
import ProfileForm from "./components/profile-form";


const Profile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';

  console.log("accessToken in profile page: ", accessToken);

  const getUserProfile = async () => {
    try {
      const res = await userApis.getUserProfile({
        accessToken: accessToken
      });
      console.log("res user profile: ", res);
      return res;
    } catch (error) {
      console.error('Error fetching user profile: ', error);

    }
  }
  const user = await getUserProfile();

  if (!user) {
    return <div>Error loading user profile.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1>Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile and achievements here.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={user.username} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle>{user.username}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Courses attended</span>
                <span>10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Courses completed</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current streak</span>
                <span className="flex items-center gap-1">
                  🔥 7 days
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileForm user={user} />
        </div>
      </div>

    </div>
  );
}

export default Profile