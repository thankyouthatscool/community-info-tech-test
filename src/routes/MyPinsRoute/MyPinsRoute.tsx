import { DataStore } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import { Pin } from "../../models";
import { ContentWrapper } from "./Styled";

export const MyPinsRoute = () => {
  const [userPins, setUserPins] = useState<Pin[]>([]);

  const { userId, username } = useAppSelector(({ user }) => user);

  const initialLoadRef = useRef<boolean>(false);

  const navigate = useNavigate();

  const handleLoadUserPins = async () => {
    try {
      if (userId && username) {
        const userPinsResponse = await DataStore.query(Pin, (p) =>
          p.username("eq", username)
        );

        setUserPins(() => userPinsResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!initialLoadRef.current && userId && username) {
      initialLoadRef.current = true;
      handleLoadUserPins();
    }
  }, [initialLoadRef, userId, username]);

  useEffect(() => {
    if (!userId && !username) {
      navigate("/");
    }
  }, [userId, username]);

  return (
    <ContentWrapper>
      {userPins.map((pin) => (
        <div>{pin.title}</div>
      ))}
    </ContentWrapper>
  );
};
