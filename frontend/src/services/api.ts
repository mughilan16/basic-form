import axios from "axios"

const URL = "http://localhost:3001"
const axiosInstance = axios.create({baseURL: URL})

type getOptionResponse = {
    options: Array<string>
}

type selectedOptions = {
  mainOptions: string,
  subOptions: string
}

export const getMainOptions = async () => {
    return (await axiosInstance.get<getOptionResponse>("/main-options")).data.options
}

export const getSubOptions = async (item: string) => {
    if (item === "") {
        return new Array<string>
    }
    return (await axiosInstance.post<getOptionResponse>("/sub-options", {selected: item})).data.options
}

export const submit = async (options: selectedOptions) => {
  return (await axiosInstance.post("/submit", options))
}
