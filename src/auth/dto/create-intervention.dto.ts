import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateInterventionDto {
  @IsNotEmpty()
  description: string;

  @IsNumber()
  deviceId: number;

  @IsArray()
  sparePartIds: number[];
}
