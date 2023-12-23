import { Autocomplete, Button, Container, FormControl, FormControlLabel, FormLabel, TextField } from "@mui/material";
import "./App.css";
import { useMainOptions, useSubOptions } from "./services/queries";
import { useState } from "react";

function App() {
  const {
    data: mainOptions,
    error: mainOptionFetchError,
    isPending,
  } = useMainOptions();

  const [mainSelected, setMainSelected] = useState("");
  const [subSelected, setSubSelected] = useState("")
  const onMainOptionChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) {
      return;
    }
    setSubSelected("")
    setMainSelected(value);
  };

  const onSubOptionChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) {
      return;
    }
    setSubSelected(value)
  };
  const { data: subOptions, isFetched: isSubOptionsLoaded } =
    useSubOptions(mainSelected);
  if (mainOptionFetchError) {
    return <>Error</>;
  }
  if (isPending) {
    return <>Loading</>;
  }
  console.log(isSubOptionsLoaded);

  return (
  <Container sx={{display: "flex", width: "75%", height: "80vh",flexDirection:  "column", justifyContent:"center"}}>
    <FormControl sx={{display: "flex", flexDirection:"column", gap: "10px"}}>
      <FormLabel sx={{color: "#222", fontSize: "1.5rem", fontWeight: "500"}}>Basic Form</FormLabel>
      <Autocomplete
        onChange={onMainOptionChange}
        options={mainOptions}
        //{...register("")}
        value={mainSelected}
        renderInput={(params) => (
          <TextField {...params} value={params} label="Main option" />
        )}
        disabled={!isSubOptionsLoaded}
      ></Autocomplete>
      {subOptions && (
        <Autocomplete
          disabled={mainSelected === "" || !isSubOptionsLoaded}
          loading={isSubOptionsLoaded}
          value={subSelected}
          options={subOptions}
          onChange={onSubOptionChange}
          renderInput={(params) => (
            <TextField {...params} value={params} label="Sub option" />
          )}
        ></Autocomplete>
      )}
      <Button>Submit</Button>
    </FormControl>
  </Container>
  );
}

export default App;
