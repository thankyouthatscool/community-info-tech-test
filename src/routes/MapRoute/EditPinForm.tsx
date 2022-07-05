import { Button, TextField } from "@mui/material";
import { DataStore } from "aws-amplify";
import { Dispatch, SetStateAction, useState } from "react";
import { Resolver, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { Pin } from "../../models";
import {
  removeDetailedMarker,
  removeUserMarker,
  setSelectedPinCoordinates,
  updateDetailedMarker,
} from "../../store";

interface EditPinFormProps {
  onCancelCallback: Dispatch<SetStateAction<boolean>>;
}

interface EditPinFormInputsProps {
  description: string;
  title: string;
}

const formResolver: Resolver<EditPinFormInputsProps> = async (values) => {
  return {
    errors: !values.title
      ? {
          title: {
            message: "Please enter title for the pin",
            type: "required",
          },
        }
      : {},
    values: values.title ? values : {},
  };
};

export const EditPinForm = ({ onCancelCallback }: EditPinFormProps) => {
  const dispatch = useAppDispatch();
  const { selectedPinCoordinates, userMarkersDetailed } = useAppSelector(
    ({ map }) => map
  );

  const [selectedDetails] = useState<any>(
    userMarkersDetailed.find(
      (pin) =>
        pin.lat === selectedPinCoordinates?.lat() &&
        pin.lng === selectedPinCoordinates?.lng()
    )
  );

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<EditPinFormInputsProps>({
    defaultValues: {
      description: selectedDetails.description,
      title: selectedDetails.title,
    },
    resolver: formResolver,
    reValidateMode: "onChange",
  });

  const handleDelete = async () => {
    try {
      const pinToDelete = await DataStore.query(Pin, selectedDetails.id);

      const deletedPin = await DataStore.delete(pinToDelete!);

      const deletedPinCoordinates = new google.maps.LatLng(
        deletedPin.lat,
        deletedPin.lng
      );

      dispatch(removeUserMarker(deletedPinCoordinates));
      dispatch(removeDetailedMarker(deletedPin.id));
      dispatch(setSelectedPinCoordinates(null));

      onCancelCallback(() => false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = handleSubmit(async (data) => {
    try {
      const latestPinData = await DataStore.query(Pin, selectedDetails.id);

      const updateResult = await DataStore.save(
        Pin.copyOf(latestPinData!, (updated) => {
          updated.title = data.title;
          updated.description = data.description;
        })
      );

      dispatch(
        updateDetailedMarker({
          description: updateResult.description,
          id: updateResult.id,
          title: updateResult.title,
        })
      );

      onCancelCallback(() => false);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <form onSubmit={handleUpdate} style={{ marginTop: "1rem" }}>
      <TextField
        {...register("title")}
        error={!!errors.title}
        fullWidth
        helperText={errors.title?.message}
        label="title"
        type="text"
      />
      <TextField
        {...register("description")}
        error={!!errors.description}
        fullWidth
        helperText={errors.description?.message}
        label="description"
        multiline
        rows={3}
        style={{ marginTop: "1rem" }}
        type="text"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <div>
          <Button
            color="error"
            onClick={handleDelete}
            style={{ marginRight: "0.5rem" }}
            variant="contained"
          >
            Delete
          </Button>
        </div>
        <div>
          <Button
            color="warning"
            onClick={() => {
              onCancelCallback(() => false);
            }}
            style={{ marginRight: "0.5rem" }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
