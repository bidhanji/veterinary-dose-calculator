import { Injectable, type OnModuleInit, HttpException, HttpStatus } from "@nestjs/common"
import * as fs from "fs"
import * as path from "path"
import * as csv from "csv-parser"
import type { CalculateDoseDto } from "./dto/calculate-dose.dto"
import type { DrugData } from "./interfaces/drug-data.interface"
import type { DoseCalculationResult } from "./interfaces/dose-calculation.interface"

@Injectable()
export class DoseService implements OnModuleInit {
  private drugData: DrugData[] = []

  async onModuleInit() {
    await this.loadDrugData()
  }

  private async loadDrugData(): Promise<void> {
    const csvPath = path.join(__dirname, "..", "data", "drug_data.csv")

    return new Promise((resolve, reject) => {
      const results: DrugData[] = []

      fs.createReadStream(csvPath)
        .pipe(csv())
        .on("data", (data) => {
          results.push({
            drug_name: data.drug_name,
            species: data.species,
            dose_rate_mg_per_kg: Number.parseFloat(data.dose_rate_mg_per_kg),
            concentration_mg_per_ml: Number.parseFloat(data.concentration_mg_per_ml),
          })
        })
        .on("end", () => {
          this.drugData = results
          console.log(`Loaded ${results.length} drug records`)
          resolve()
        })
        .on("error", (error) => {
          console.error("Error loading drug data:", error)
          reject(error)
        })
    })
  }

  async getDrugsAndSpecies() {
    const drugs = [...new Set(this.drugData.map((item) => item.drug_name))].sort()
    const species = [...new Set(this.drugData.map((item) => item.species))].sort()

    return {
      drugs,
      species,
    }
  }

  async calculateDose(calculateDoseDto: CalculateDoseDto): Promise<DoseCalculationResult> {
    const { species, drug, weight } = calculateDoseDto

    // Validate weight
    if (weight <= 0) {
      throw new HttpException("Weight must be a positive number", HttpStatus.BAD_REQUEST)
    }

    // Find the drug-species combination
    const drugInfo = this.drugData.find((item) => item.drug_name === drug && item.species === species)

    if (!drugInfo) {
      throw new HttpException(`Drug "${drug}" not found for species "${species}"`, HttpStatus.NOT_FOUND)
    }

    // Calculate dose
    const totalDoseMg = drugInfo.dose_rate_mg_per_kg * weight
    const volumeMl = totalDoseMg / drugInfo.concentration_mg_per_ml

    return {
      drug_info: {
        drug_name: drugInfo.drug_name,
        species: drugInfo.species,
        dose_rate_mg_per_kg: drugInfo.dose_rate_mg_per_kg,
        concentration_mg_per_ml: drugInfo.concentration_mg_per_ml,
      },
      animal_weight_kg: weight,
      total_dose_mg: Math.round(totalDoseMg * 100) / 100, // Round to 2 decimal places
      volume_to_administer_ml: Math.round(volumeMl * 100) / 100, // Round to 2 decimal places
    }
  }
}
