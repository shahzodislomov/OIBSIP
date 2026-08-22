import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || "An error occurred while processing the request.";
    }
    return "An unexpected error occurred.";
}