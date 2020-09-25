import React, { useState, useEffect } from "react";
import {
  Stack,
  Button,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../constants/regex";
import { useRouter } from "next/router";
import CustomFormControl from "../CustomFormControl";

interface LoginFormProps {
  loginHandler: (email: string, password: string) => any;
  returnRoute?: string;
}

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  loginHandler,
  returnRoute,
}) => {
  const { register, handleSubmit, errors } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [returnUrl, setReturnUrl] = useState("/");
  const router = useRouter();

  useEffect(() => {
    if (returnRoute) {
      setReturnUrl(returnRoute);
    }
  }, [returnRoute]);

  const withLoading = async (fn: Function) => {
    try {
      setLoading(true);
      await fn();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const afterLogin = () => {
    router.replace(returnUrl, { pathname: returnUrl });
  };

  const onSubmit = (data: FormValues) => {
    console.log("==========\nFORM DATA\n============", data);
    withLoading(
      () => loginHandler(data.email, data.password)
    ).then(() => {
      afterLogin();
    })
      .catch((err) => {
        setFormError(err.message ?? "There was an error.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <CustomFormControl
          isRequired
          inputProps={{
            name: "email",
            type: "email",
            placeholder: "Email",
            "aria-label": "Email",
          }}
          iconProps={{ name: "email", color: "blue.600" }}
          ref={register({
            required: true,
            pattern: emailRegex,
          })}
        />
        <CustomFormControl
          isRequired
          inputProps={{
            name: "password",
            type: "password",
            placeholder: "Password",
            "aria-label": "Password",
          }}
          iconProps={{ name: "lock", color: "blue.600" }}
          ref={register({
            required: true,
            minLength: 8,
          })}
        />
        <Button
          type="submit"
          variant="solid"
          variantColor="blue"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
          _active={{ boxShadow: "lg" }}
          isLoading={loading}
        >
          Login
        </Button>
        {formError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{formError}</AlertTitle>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setFormError(null)}
            />
          </Alert>
        )}
        <FormHelperText textAlign="center">Welcome to Shop</FormHelperText>
      </Stack>
    </form>
  );
};
