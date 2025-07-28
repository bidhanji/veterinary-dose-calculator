import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  getHello(): string {
    return "Veterinary Drug Dose Calculator API is running!"
  }
}
