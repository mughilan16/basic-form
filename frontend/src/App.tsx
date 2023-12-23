import { Autocomplete, Container, TextField } from "@mui/material";
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
    <Container sx={{display: "flex", width: "100%", flexDirection: "column", gap: "10px"}}>
      <Autocomplete
        onChange={onMainOptionChange}
        options={mainOptions}
        //{...register("")}
        value={mainSelected}
        renderInput={(params) => (
          <TextField {...params} value={params} label="main-option" />
        )}
        disabled={!isSubOptionsLoaded}
      ></Autocomplete>
      {subOptions && (
        <Autocomplete
          disabled={mainSelected === "" || !isSubOptionsLoaded}
          loading={isSubOptionsLoaded}
          value={subSelected}
          options={subOptions}
          renderInput={(params) => (
            <TextField {...params} value={params} label="sub-option" />
          )}
        ></Autocomplete>
      )}
    </Container>
  );
}

export default App;
