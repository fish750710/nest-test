import { Injectable, BadRequestException } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

// 自定义验证管道
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    const object = plainToInstance(metatype, value);
    // const object = plainToClass(metatype, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessages = this.formatErrors(errors);
      throw new BadRequestException(errorMessages);
    }
    return value;
  }

  private toValidate(metaType: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors
      .map((err) => {
        return Object.values(err.constraints).join(', ');
      })
      .join('; ');
  }
}
