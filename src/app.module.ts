import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, UserModule, StoreModule, ColorModule, CategoryModule]
})
export class AppModule {}
