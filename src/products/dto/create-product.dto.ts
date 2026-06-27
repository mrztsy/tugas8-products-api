import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama produk tidak boleh kosong' })
  name: string;

  @IsNumber()
  @Min(0, { message: 'Harga tidak boleh kurang dari 0' })
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Stock tidak boleh kurang dari 0' })
  stock?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
