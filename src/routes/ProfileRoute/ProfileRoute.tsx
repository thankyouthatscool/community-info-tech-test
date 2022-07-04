import { Button, Card, TextField } from "@mui/material";
import { DataStore } from "aws-amplify";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks";
import { User } from "../../models";
import { setUserId, setUsername } from "../../store";
import { ContentWrapper } from "./Styled";

interface LoginFormData {
  email: string;
}

export const ProfileRoute = () => {
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormData>();

  const handleLogin = handleSubmit(async ({ email }) => {
    localStorage.setItem("userEmail", email);

    try {
      const loginResponse = await DataStore.query(User, (u) =>
        u.email("eq", email)
      );

      if (loginResponse.length) {
        const { id, username } = loginResponse[0];
        dispatch(setUserId(id));
        dispatch(setUsername(username));
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <ContentWrapper>
      <Card style={{ padding: "0.5rem" }}>
        <form onSubmit={handleLogin}>
          <TextField
            {...register("email")}
            error={!!errors.email}
            fullWidth
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
            <Button type="submit" variant="contained">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </ContentWrapper>
  );
};
