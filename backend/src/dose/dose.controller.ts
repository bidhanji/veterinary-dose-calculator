import { Controller, Get, Post, HttpException, HttpStatus } from "@nestjs/common"
import type { DoseService } from "./dose.service"
import type { CalculateDoseDto } from "./dto/calculate-dose.dto"
import type { DoseCalculationResult } from "./interfaces/dose-calculation.interface"

@Controller()
export class DoseController {
  constructor(private readonly doseService: DoseService) {}

  @Get("drugs")
  async getDrugs() {
    try {
      return await this.doseService.getDrugsAndSpecies()
    } catch (error) {
      throw new HttpException("Failed to load drug data", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("dose/calculate")
  async calculateDose(calculateDoseDto: CalculateDoseDto): Promise<DoseCalculationResult> {
    try {
      return await this.doseService.calculateDose(calculateDoseDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException("Failed to calculate dose", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
