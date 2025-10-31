import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {RoleEnum} from "@app/common/enums/role.enum";

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;

  @IsBoolean()
  @IsNotEmpty()
  allowShowInfo: boolean;

  @IsString()
  @IsOptional()
  profession?: string;
}