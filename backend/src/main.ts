import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

class CustomIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: true,  // Hier können Sie die erlaubten Origins angeben. "true" erlaubt allen.
        methods: ["GET", "POST"],  // Erlaubte HTTP-Methoden
        // Fügen Sie weitere CORS-Optionen nach Bedarf hinzu.
      },
    });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS für normale HTTP-Anfragen aktivieren
  app.enableCors();

  // Verwenden des benutzerdefinierten Adapters
  app.useWebSocketAdapter(new CustomIoAdapter(app));

  await app.listen(3000);
}
bootstrap();
