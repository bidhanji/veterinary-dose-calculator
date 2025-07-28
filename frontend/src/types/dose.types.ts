export interface DoseCalculationRequest {
  species: string
  drug: string
  weight: number
}

export interface DrugInfo {
  drug_name: string
  species: string
  dose_rate_mg_per_kg: number
  concentration_mg_per_ml: number
}

export interface DoseCalculationResult {
  drug_info: DrugInfo
  animal_weight_kg: number
  total_dose_mg: number
  volume_to_administer_ml: number
}
