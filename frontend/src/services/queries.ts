import { useQuery } from "@tanstack/react-query"
import { getMainOptions, getSubOptions } from "./api"

export function useMainOptions() {
    return useQuery({
        queryKey: ["main-options"],
        queryFn: getMainOptions,
    })
}

export function useSubOptions(item: string) {
    return useQuery({
        queryKey: ["sub-options"],
        queryFn: () => getSubOptions(item),
    })
}