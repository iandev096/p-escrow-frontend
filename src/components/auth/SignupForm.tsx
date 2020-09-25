import React, { useState, useEffect } from "react";
import {
  Stack,
  Button,
  FormHelperText,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { emailRegex } from "../../constants/regex";
import CustomFormControl from "../CustomFormControl";

interface SignupFormProps {
  signupHandler: (email: string, password: string, fullName: string) => any;
  returnRoute?: string;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const SignupForm: React.FC<SignupFormProps> = ({
  signupHandler,
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

  const afterSignup = () => {
    router.replace(returnUrl, { pathname: returnUrl });
  };

  const onSubmit = (data: FormValues) => {
    console.log("==========\nFORM DATA\n============", data);
    withLoading(() =>
      signupHandler(
        data.email,
        data.password,
        data.firstName + " " + data.lastName
      )
    )
      .then(() => {
        afterSignup();
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
            name: "firstName",
            type: "name",
            placeholder: "First name",
            "aria-label": "First name",
          }}
          iconProps={{ name: "info", color: "blue.600" }}
          ref={register({
            required: true,
          })}
        />
        <CustomFormControl
          isRequired
          inputProps={{
            name: "lastName",
            type: "name",
            placeholder: "Last name",
            "aria-label": "Last name",
          }}
          iconProps={{ name: "info", color: "blue.600" }}
          ref={register({
            required: true,
          })}
        />
        <Divider borderColor="gray.300" />
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
          boxShadow="sm"
          variant="solid"
          variantColor="blue"
          _hover={{ boxShadow: "md" }}
          _active={{ boxShadow: "lg" }}
          isLoading={loading}
        >
          Sign up!
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
        <FormHelperText textAlign="center">
          We keep your details secured.
        </FormHelperText>
      </Stack>
    </form>
  );
};
