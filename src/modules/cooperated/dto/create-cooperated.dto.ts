import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, Max, Min, Validate, isNumber } from "class-validator";
import { IsNotExist } from "../../../utils/validators/is-not-exists.validator";
import { lowerCaseTransformer } from "../../../utils/transformers/lower-case.transformer";
import { IsValidCpfOrCnpj } from "../../../utils/validators/is-document.validator";
import { OrganizationEntity } from "src/modules/organization/entities/organization.entity";

export class CreateCooperatedDto {
  @ApiProperty({ example: "test1@example.com" })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ["Cooperated"], {
    message: "emailAlreadyExists",
  })
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: "Morgan" })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: "Stark" })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ example: "+5511995039284" })
  @IsNotEmpty()
  @IsPhoneNumber("BR")
  phone: string | null;

  @ApiProperty({ example: "44444444444" })
  @IsNotEmpty()
  @IsValidCpfOrCnpj()
  document: string | null;

  @ApiProperty({ example: "44444444444" })
  @IsNotEmpty()
  organization: OrganizationEntity;
}
