import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
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
  email: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
}