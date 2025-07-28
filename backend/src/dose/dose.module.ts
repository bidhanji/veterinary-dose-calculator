import { Module } from "@nestjs/common"
import { DoseController } from "./dose.controller"
import { DoseService } from "./dose.service"

@Module({
  controllers: [DoseController],
  providers: [DoseService],
})
export class DoseModule {}
