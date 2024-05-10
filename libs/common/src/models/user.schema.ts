import { AbstractDocument } from '@app/common';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class UserDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
