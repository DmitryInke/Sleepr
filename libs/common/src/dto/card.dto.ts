import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  @Min(1, { message: 'Expiration month must be at least 1' })
  @Max(12, { message: 'Expiration month cannot be greater than 12' })
  exp_month: number;

  @IsNumber()
  @Min(new Date().getFullYear(), {
    message: 'Expiration year cannot be in the past',
  })
  @Max(new Date().getFullYear() + 10, {
    message: 'Expiration year is too far in the future',
  })
  exp_year: number;

  @IsCreditCard()
  number: string;
}
