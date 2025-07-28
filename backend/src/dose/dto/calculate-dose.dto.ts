import { IsString, IsNumber, IsPositive, IsNotEmpty } from "class-validator"

export class CalculateDoseDto {
  @IsString()
  @IsNotEmpty()
  species: string

  @IsString()
  @IsNotEmpty()
  drug: string

  @IsNumber()
  @IsPositive()
  weight: number
}
