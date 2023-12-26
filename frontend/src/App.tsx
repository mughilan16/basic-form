import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import "./App.css";
import { useMainOptions, useSubOptions } from "./services/queries";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

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
  const { register, formState, setValue, watch, control } =
    useForm<FormInputType>();
  useEffect(() => {
    if (formState.touchedFields.mainOptions) {
      setValue("subOptions", "");
    }
  }, [formState, setValue]);

  const { data: subOptions, isFetched: isSubOptionsLoaded } = useSubOptions(
    watch("mainOptions"),
  );
  console.log(watch("mainOptions"));
  if (mainOptionFetchError) {
    return <>Error</>;
  }
  if (isPending) {
    return <>Loading</>;
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
          render={({ field }) => {
            const { onChange, value } = field;
            return (
              <Autocomplete
                //onChange={onMainOptionChange}
                options={mainOptions}
                onChange={(_, newValue) => {
                  setValue("subOptions", "")
                  onChange(newValue)
                }}
                value={value}
                //value={mainSelected}
                renderInput={(params) => (
                  <TextField {...params} value={params} label="Main option" />
                )}
                disabled={!isSubOptionsLoaded}
              ></Autocomplete>
            );
          }}
        ></Controller>
        <Autocomplete
          disabled={!isSubOptionsLoaded}
          loading={isSubOptionsLoaded}
          //value={subSelected}
          options={subOptions ? subOptions : []}
          //onChange={onSubOptionChange}
          {...register("subOptions")}
          renderInput={(params) => (
            <TextField {...params} value={params} label="Sub option" />
          )}
        ></Autocomplete>
        <Button>Submit</Button>
      </FormControl>
    </Container>
  );
}

export default App;
