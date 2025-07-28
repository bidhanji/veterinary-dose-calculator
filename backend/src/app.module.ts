import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DoseModule } from "./dose/dose.module"

@Module({
  imports: [DoseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
