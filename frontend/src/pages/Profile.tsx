import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuthStore from "../store/auth";
import { useEffect } from "react";

const Profile = () => {
  const { user, updateProfile, mobile, getProfile } = useAuthStore();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      mobile: "",
    },

    validate: {
      mobile: (value: string) =>
        value && value.length < 11
          ? "Mobile number must be greater or equal to 11 digits"
          : null,
    },
  });

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (user) {
      form.setValues({
        username: user.username,
        email: user.email,
        mobile: mobile ? mobile.toString() : "",
      });
    }
  }, [user, mobile]);

  const handleProfile = async (values: any) => {
    const { mobile } = values;
    await updateProfile({ mobile });
  };

  return (
    <div className="h-[70vh] flex items-center justify-center">
      <form
        onSubmit={form.onSubmit((values) => handleProfile(values))}
        className="w-[50%] flex flex-col justify-center gap-4"
      >
        <h1 className="text-3xl font-bold">Profile</h1>
        <TextInput
          label="Username"
          placeholder="Your Username"
          withAsterisk
          {...form.getInputProps("username")}
          disabled
          className="focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <TextInput
          label="Email"
          placeholder="Your email"
          withAsterisk
          {...form.getInputProps("email")}
          disabled
          className="focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <TextInput
          label="Mobile Number"
          placeholder="Your mobile"
          withAsterisk
          {...form.getInputProps("mobile")}
          className="focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <Button type="submit" className="bg-red-500">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default Profile;
