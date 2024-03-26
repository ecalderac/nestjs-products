import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'; // Importa mongoose
import { NAME_DB } from './constants/constant';

@Module({
  imports: [MongooseModule.forRoot(NAME_DB), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const uri = NAME_DB;
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    connection.on('error', (err) => {
      console.error('Error connecting to MongoDB:', err);
    });

    mongoose.connect(uri);
  }
}
