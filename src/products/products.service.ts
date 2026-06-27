import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // POST /products
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  // GET /products
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // GET /products/search?q=keyword
  async search(keyword: string): Promise<Product[]> {
    if (!keyword || keyword.trim() === '') {
      throw new BadRequestException('Query pencarian (q) tidak boleh kosong');
    }

    return this.productModel
      .find({
        name: { $regex: keyword, $options: 'i' }, // case-insensitive search
      })
      .exec();
  }

  // GET /products/:id
  async findOne(id: string): Promise<Product> {
    this.validateObjectId(id);

    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
    }
    return product;
  }

  // PUT /products/:id
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    this.validateObjectId(id);

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true, // mengembalikan dokumen setelah diupdate
        runValidators: true, // tetap menjalankan validasi schema
      })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
    }
    return updatedProduct;
  }

  // DELETE /products/:id
  async remove(id: string): Promise<{ message: string }> {
    this.validateObjectId(id);

    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
    }
    return { message: `Produk dengan ID ${id} berhasil dihapus` };
  }

  // Helper validasi format ObjectId MongoDB -> Bad Request (400)
  private validateObjectId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID "${id}" bukan format ObjectId yang valid`);
    }
  }
}
