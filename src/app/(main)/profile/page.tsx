import { userApis } from "@/apis/gateways/user-apis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Camera, CheckCircle2 } from "lucide-react";
import { cookies } from "next/headers";
import ProfileForm from "./components/profile-form";
import ProfileLinkService from "./components/profile-link-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";


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
          <ProfileLinkService user={user} />
        </div>
      </div>
      {/* Courses and Badges */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Courses in progress (2)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent cursor-pointer">
                  <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    📚
                  </div>
                  <div className="flex-1">
                    <h4>Basic JavaScript Programming</h4>
                    <p className="text-muted-foreground">45% completed</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent cursor-pointer">
                  <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    📚
                  </div>
                  <div className="flex-1">
                    <h4>React for Beginners</h4>
                    <p className="text-muted-foreground">30% completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed courses (2)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="h-16 w-16 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h4>HTML and CSS from Basic to Advanced</h4>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="h-16 w-16 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h4>Introduction to Programming</h4>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Badges (3/5)</CardTitle>
              <CardDescription>Complete challenges to earn badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border p-6 text-center bg-primary/5 border-primary/20">
                  <div className="mb-3 text-4xl">🔥</div>
                  <h4>7-Day Streak</h4>
                  <p className="text-muted-foreground">Complete lessons 7 days in a row</p>
                  <Badge variant="secondary" className="mt-3 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Earned
                  </Badge>
                </div>

                <div className="rounded-lg border p-6 text-center bg-primary/5 border-primary/20">
                  <div className="mb-3 text-4xl">🚀</div>
                  <h4>Outstanding Newcomer</h4>
                  <p className="text-muted-foreground">Complete your first course</p>
                  <Badge variant="secondary" className="mt-3 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Earned
                  </Badge>
                </div>

                <div className="rounded-lg border p-6 text-center bg-primary/5 border-primary/20">
                  <div className="mb-3 text-4xl">⭐</div>
                  <h4>Bright Star</h4>
                  <p className="text-muted-foreground">Get a perfect score on a test</p>
                  <Badge variant="secondary" className="mt-3 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Earned
                  </Badge>
                </div>

                <div className="rounded-lg border p-6 text-center opacity-50">
                  <div className="mb-3 text-4xl">🏆</div>
                  <h4>Master</h4>
                  <p className="text-muted-foreground">Complete 5 courses</p>
                </div>

                <div className="rounded-lg border p-6 text-center opacity-50">
                  <div className="mb-3 text-4xl">💎</div>
                  <h4>Diamond</h4>
                  <p className="text-muted-foreground">Learn for 30 consecutive days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile