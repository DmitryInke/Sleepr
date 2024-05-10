import { Field, InputType } from '@nestjs/graphql';
import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CardMessage } from '../types';

export class CardDto implements CardMessage {
  @IsString()
  @IsNotEmpty()
  @Field()
  cvc: string;

  @IsNumber()
  @Min(1, { message: 'Expiration month must be at least 1' })
  @Max(12, { message: 'Expiration month cannot be greater than 12' })
  expMonth: number;

  @IsNumber()
  @Min(new Date().getFullYear(), {
    message: 'Expiration year cannot be in the past',
  })
  @Max(new Date().getFullYear() + 10, {
    message: 'Expiration year is too far in the future',
  })
  expYear: number;
  @IsCreditCard()
  @Field()
  number: string;
}
