import axios from "axios"
import type { DoseCalculationRequest, DoseCalculationResult } from "../types/dose.types"

const API_BASE_URL = "http://localhost:3001"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getDrugsAndSpecies = async () => {
  const response = await api.get("/drugs")
  return response.data
}

export const calculateDose = async (request: DoseCalculationRequest): Promise<DoseCalculationResult> => {
  const response = await api.post("/dose/calculate", request)
  return response.data
}
