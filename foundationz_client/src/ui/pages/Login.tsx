import {
  Box,
  Button,
  Card,
  Form,
  FormField,
  Notification,
  TextInput,
} from "grommet";
import React from "react";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../constants/strings/regex";
import { useLoginMutation } from "../../generated/graphql";
import { useNavigate } from "react-router";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [query, { error, loading, reset }] = useLoginMutation();
  const nav = useNavigate();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await query({
        variables: {
          email,
          password,
        },
      });
      nav("/");
    } catch (e) {
      console.log("Welp GG");
    }
  });

  return (
    <Box pad={"xlarge"}>
      <Card background="brand" pad={"xlarge"}>
        <Form onSubmit={onSubmit}>
          <FormField
            htmlFor="email"
            label="email"
            name={"email"}
            error={errors?.email?.message}
          >
            <TextInput
              type={"email"}
              {...register("email", {
                required: "Please enter an email",
                pattern: {
                  value: emailRegex,
                  message: "Entered value does not match email format.",
                },
              })}
            />
          </FormField>
          <FormField
            htmlFor="email"
            label="password"
            error={errors?.password?.message}
          >
            <TextInput
              type={"password"}
              {...register("password", {
                required: "Please enter a password.",
              })}
            />
          </FormField>
          <Box direction="row" gap="medium" pad={"medium"}>
            <Button
              type="submit"
              primary
              size={"large"}
              label="Submit"
              disabled={loading}
            />
          </Box>
        </Form>
      </Card>

      {error && (
        <Notification
          toast
          status={"critical"}
          title={"Error"}
          message="Incorrect email or password."
          onClose={() => reset()}
        />
      )}
    </Box>
  );
};
