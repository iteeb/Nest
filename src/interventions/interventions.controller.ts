import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../enums/role.enum';
import { CreateInterventionDto } from '../auth/dto/create-intervention.dto';

@Controller('interventions')
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TECH)
  @Post()
  create(@Body() dto: CreateInterventionDto, @Request() req) {
    return this.interventionsService.create(dto, req.user);
  }
}
