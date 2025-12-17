import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { SparePart } from './spare-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartsModule {}
