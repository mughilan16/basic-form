import {
  Autocomplete,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import "./App.css";
import { useMainOptions, useSubOptions } from "./services/queries";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { submit } from "./services/api";

function App() {
  const {
    data: mainOptions,
    error: mainOptionFetchError,
    isPending,
  } = useMainOptions();
  type FormInputType = {
    mainOptions: string;
    subOptions: string;
  };
  const { formState, setValue, watch, control, handleSubmit } =
    useForm<FormInputType>();
  useEffect(() => {
    if (formState.touchedFields.mainOptions) {
      setValue("subOptions", "");
    }
  }, [formState, setValue]);

  const { data: subOptions, isFetched: isSubOptionsLoaded } = useSubOptions(
    watch("mainOptions"),
  );
  const onSubmit: SubmitHandler<FormInputType> = (data) => submit(data);
  if (mainOptionFetchError) {
    return <>Error</>;
  }
  if (isPending) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <Container
      sx={{
        display: "flex",
        width: "80%",
        height: "80vh",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <FormLabel sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
          Basic Form
        </FormLabel>
        <Controller
          name="mainOptions"
          control={control}
          rules={{required: true}}
          render={({ field, formState }) => {
            const { onChange, value } = field;
            const { errors } = formState;
            return (
              <Autocomplete
                options={mainOptions}
                onChange={(_, newValue) => {
                  setValue("subOptions", "");
                  onChange(newValue);
                }}
                value={value ? value : ""}
                renderInput={(params) => (
                  <TextField {...params} value={params} label="Main option" error={!!errors.mainOptions} />
                )}
                disabled={!isSubOptionsLoaded}
              ></Autocomplete>
            );
          }}
        ></Controller>
        <Controller
          name="subOptions"
          control={control}
          rules={{required: true}}
          render={({ field, formState }) => {
            const { onChange, value } = field;
            const { errors } = formState;
            return (
              <Autocomplete
                disabled={watch("mainOptions") === undefined}
                loading={isSubOptionsLoaded}
                value={value ? value : ""}
                options={subOptions ? subOptions : []}
                onChange={(_, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} value={params} label="Sub option" error={!!errors.subOptions}  />
                )}
              ></Autocomplete>
            );
          }}
        ></Controller>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </FormControl>
    </Container>
  );
}

export default App;
