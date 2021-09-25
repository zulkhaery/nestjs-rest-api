import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    MongooseModule.forRoot(process.env.MONGODB_SRV),
  ],
})
export class AppModule {}
