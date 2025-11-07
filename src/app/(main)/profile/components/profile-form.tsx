'use client'
import { userApis } from "@/apis/gateways/user-apis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { UpdateUserSchema, UpdateUserType } from "@/schemaValidations/user.schema";
import { useAuthStore } from "@/stores/auth-store";
import { User } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ProfileFormProps = {
  user: User;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    accessToken,
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<UpdateUserType>({
    mode: "onChange",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      phone: user.phone,
      gender: user.gender,
      description: user.description,
    }
  });

  const watchedGender = watch("gender");

  const updateUserMutation = useMutation({
    mutationFn: (data: {
      accessToken: string;
      data: UpdateUserType;
    }) => userApis.updateUserProfile(data),
    onSuccess: (res) => {
      console.log("User profile updated successfully: ", res);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      router.refresh();
    },
    onError: (error) => {
      console.error("Error updating user profile: ", error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Update profile error: ', error);
          toast.error(res.message || "Failed to update profile");
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const handleSave = handleSubmit((data: UpdateUserType) => {
    updateUserMutation.mutate({
      accessToken: accessToken,
      data: data,
    });
  });

  const handleCancel = () => {
    // Reset form to original values
    reset({
      phone: user.phone,
      gender: user.gender,
      description: user.description,
    });
    setIsEditing(false);
  };

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
            <Button variant="outline" onClick={handleCancel} disabled={updateUserMutation.isPending}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={user.username}
            disabled={true}
            className="bg-input-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={user.email}
            disabled={true}
            className="bg-input-background"
          />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          {isEditing ? (
            <RadioGroup
              defaultValue={watchedGender}
              className="flex space-x-4"
              onValueChange={(value) => setValue("gender", value as UpdateUserType['gender'])}
              disabled={updateUserMutation.isPending}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          ) : (
            <div className="pt-2">
              <Badge
                variant="outline"
                className={`${watchedGender === "male"
                  ? "bg-blue-100 text-blue-800"
                  : watchedGender === "female"
                    ? "bg-pink-100 text-pink-800"
                    : "bg-gray-100 text-gray-800"
                  }`}
              >
                {watchedGender === "male" || watchedGender === "female"
                  ? watchedGender
                  : "Not Set"}
              </Badge>
            </div>
          )}
          {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            {...register("phone")}
            id="phone"
            disabled={!isEditing || updateUserMutation.isPending}
            className="bg-input-background"
            placeholder="Enter your phone number!"
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            disabled={!isEditing || updateUserMutation.isPending}
            className="bg-input-background"
            rows={3}
            placeholder="Write something about you!"
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileForm;