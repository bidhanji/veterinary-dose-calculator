import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend connection
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3001)
  console.log("Veterinary Dose Calculator Backend running on http://localhost:3001")
}
bootstrap()
