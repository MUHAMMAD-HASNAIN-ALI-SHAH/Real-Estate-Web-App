import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Signup from "./Signup";
import useAuthStore from "../store/auth";

const Signin = ({ onClose }: { onClose: any }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(false);
  const { signin } = useAuthStore();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  if (signup) {
    return <Signup onClose={close} />;
  }

  const handleSignin = async (values: any) => {
    const { username, email, password } = values;
    const formData = { username, email, password };
    await signin(formData);
    onClose();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="w-full"
        onSubmit={form.onSubmit((values) => handleSignin(values))}
      >
        <TextInput
          label="Email"
          placeholder="Your email"
          withAsterisk
          {...form.getInputProps("email")}
        />

        <PasswordInput
          mt="md"
          label="Password"
          placeholder="Password"
          withAsterisk
          visible={showPassword}
          onVisibilityChange={setShowPassword}
          {...form.getInputProps("password")}
        />

        <div className="flex justify-between items-center mt-4">
          <p>
            No Account{" "}
            <span
              onClick={() => setSignup(true)}
              className="text-blue-500 cursor-pointer"
            >
              Signup
            </span>
          </p>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
