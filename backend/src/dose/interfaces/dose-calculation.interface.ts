export interface DoseCalculationResult {
  drug_info: {
    drug_name: string
    species: string
    dose_rate_mg_per_kg: number
    concentration_mg_per_ml: number
  }
  animal_weight_kg: number
  total_dose_mg: number
  volume_to_administer_ml: number
}
