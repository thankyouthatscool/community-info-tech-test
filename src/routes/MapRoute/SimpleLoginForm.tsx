import { Button, Card, TextField, Typography } from "@mui/material";
import { DataStore } from "aws-amplify";
import { Resolver, useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks";
import { User } from "../../models";
import { setIsLoggingIn, setUserId, setUsername } from "../../store";

const formResolver: Resolver<{ emailAddress: string }> = async (values) => {
  return {
    errors: !values.emailAddress
      ? {
          emailAddress: {
            message: "Email address is required",
            type: "required",
          },
        }
      : {},
    values: values.emailAddress ? values : {},
  };
};

export const SimpleLoginForm = () => {
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ emailAddress: string }>({
    resolver: formResolver,
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async ({ emailAddress }) => {
    localStorage.setItem("userEmail", emailAddress);

    try {
      const loginResponse = await DataStore.query(User, (u) =>
        u.email("eq", emailAddress)
      );

      if (loginResponse.length) {
        const { id, username } = loginResponse[0];
        dispatch(setUserId(id));
        dispatch(setUsername(username));
        dispatch(setIsLoggingIn(false));
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div>
      <Card elevation={9} style={{ marginTop: "0.5rem", padding: "1rem" }}>
        <form onSubmit={onSubmit}>
          <Typography style={{ margin: "1rem" }} variant="body1">
            There are no real users, just three different email addresses to
            demonstrate search and who is able to edit what:
            <li>user@email.com</li>
            <li>user1@email.com</li>
            <li>user2@email.com</li>
          </Typography>
          <TextField
            {...register("emailAddress")}
            error={!!errors.emailAddress}
            fullWidth
            helperText={errors.emailAddress?.message}
            label="Email Address"
            type="email"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "1rem",
            }}
          >
            <Button
              color="warning"
              onClick={() => {
                dispatch(setIsLoggingIn(false));
              }}
              style={{ marginRight: "1rem" }}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit" variant="contained">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
