import { join } from 'path';
import { Category } from './category/category.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/admin.model';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CourseModule } from './course/course.module';
import { Course } from './course/course.model';
import { CategoryModule } from './category/category.module';
import { CadetModule } from './cadet/cadet.module';
import { Cadet } from './cadet/cadet.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [Admin, Course, Category, Cadet],
      autoLoadModels: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),

    AdminModule,
    CourseModule,
    CategoryModule,
    CadetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
