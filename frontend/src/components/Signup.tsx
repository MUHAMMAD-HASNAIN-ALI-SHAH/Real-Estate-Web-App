import { TextInput, PasswordInput, Checkbox, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Signin from "./Signin";
import useAuthStore from "../store/auth";

const Signup = ({ onClose }: { onClose: any }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signin, setSignin] = useState(false);
  const { signup } = useAuthStore();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },

    validate: {
      username: (value) =>
        value.length >= 3 ? null : "Username must be greater than 3 characters",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
      terms: (value) => (value ? null : "You must accept the terms"),
    },
  });

  if (signin) {
    return <Signin onClose={onClose} />;
  }

  const handleSignup = async (values: any) => {
    const { username, email, password } = values;
    const formData = { username, email, password };
    await signup(formData);
    onClose();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="w-full"
        onSubmit={form.onSubmit((values) => handleSignup(values))}
      >
        <TextInput
          label="Username"
          placeholder="Your username"
          withAsterisk
          {...form.getInputProps("username")}
        />

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

        <PasswordInput
          mt="md"
          label="Confirm Password"
          placeholder="Confirm password"
          withAsterisk
          visible={showConfirm}
          onVisibilityChange={setShowConfirm}
          {...form.getInputProps("confirmPassword")}
        />

        <Checkbox
          mt="md"
          label="I agree to sell my soul and privacy to this corporation"
          {...form.getInputProps("terms", { type: "checkbox" })}
        />

        <div className="flex justify-between items-center mt-4">
          <p>
            Have an account?{" "}
            <span
              onClick={() => setSignin(true)}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
