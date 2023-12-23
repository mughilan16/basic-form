import { Autocomplete, TextField } from "@mui/material";
import "./App.css";
import { useMainOptions, useSubOptions } from "./services/queries";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();
  const {
    data: mainOptions,
    error: mainOptionFetchError,
    isPending,
  } = useMainOptions();

  const [selected, setSelected] = useState("");
  const onMainOptionChange = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) {
      return;
    }
    setSelected(value);
    //queryClient.invalidateQueries({ queryKey: ["sub-options"] });
  };

  let { data: subOptions, isPending: isSubOptionsPending } =
    useSubOptions(selected);
  if (mainOptionFetchError) {
    return <>Error</>;
  }
  if (isPending) {
    return <>Loading</>;
  }

  return (
    <>
      <Autocomplete
        onChange={onMainOptionChange}
        options={mainOptions}
        renderInput={(params) => (
          <TextField {...params} value={params} label="main-option" />
        )}
        disabled={isSubOptionsPending}
      ></Autocomplete>
      {subOptions && (
        <Autocomplete
          disabled={selected === "" || isSubOptionsPending}
          options={subOptions}
          renderInput={(params) => (
            <TextField {...params} value={params} label="sub-option" />
          )}
        ></Autocomplete>
      )}
    </>
  );
}

export default App;
