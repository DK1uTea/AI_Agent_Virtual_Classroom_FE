import { userApis } from "@/apis/gateways/user-apis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { UpdateUserSchema, UpdateUserType } from "@/shemaValidations/user.schema";
import { useAuthStore } from "@/stores/auth-store";
import { User } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

type ProfileFormProps = {
  user: User;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));
  const router = useRouter();


  const updateUserMutation = useMutation({
    mutationFn: (data: {
      accessToken: string;
      data: UpdateUserType;
    }) => userApis.updateUserProfile(data),
    onSuccess: (res) => {
      console.log("User profile updated successfully: ", res);
      router.refresh();
    },
    onError: (error) => {
      console.error("Error updating user profile: ", error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Update profile error: ', error);
          toast.error(res.message);
        });
      }
    },
  });

  const handleSave = () => {
    handleSubmit((data: UpdateUserType) => {
      console.log("Saved data: ", data);
      updateUserMutation.mutate({
        accessToken: accessToken,
        data: data,
      });
      setIsEditing(false);
    })();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset
  } = useForm<UpdateUserType>({
    mode: "onChange",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      description: user.description,
    }
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Profile Information</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Tên</Label>
          <Input
            {...register("username")}
            id="username"
            disabled={!isEditing}
            className="bg-input-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            disabled={!isEditing}
            className="bg-input-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input
            {...register("gender")}
            id="gender"
            disabled={!isEditing}
            className="bg-input-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            {...register("phone")}
            id="phone"
            disabled={!isEditing}
            className="bg-input-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            disabled={!isEditing}
            className="bg-input-background"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileForm;