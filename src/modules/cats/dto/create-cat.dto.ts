import { IsString, IsInt, IsNotEmpty } from 'class-validator'; // 類驗證器
import { Type } from 'class-transformer'; // 轉換器

export class CreateCatDto {
  // readonly name: string;
  // readonly age: number;
  // readonly breed: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty({ message: 'name 不能為空' })
  name: string;

  @Type(() => Number) // 輸入值轉換為數字，返回一樣原本型別
  @IsInt({ message: 'age 必須為數字' })
  age: number;

  @Type(() => String)
  @IsString()
  breed: string;
}
