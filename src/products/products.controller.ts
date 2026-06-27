import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // POST /products -> Menambah produk baru
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // GET /products/search?q=keyword -> Mencari produk
  // NOTE: route ini WAJIB didefinisikan di atas @Get(':id'),
  // agar "search" tidak dianggap sebagai value :id
  @Get('search')
  search(@Query('q') keyword: string) {
    return this.productsService.search(keyword);
  }

  // GET /products -> Mendapatkan semua produk
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET /products/:id -> Mendapatkan produk berdasarkan ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // PUT /products/:id -> Mengupdate produk
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  // DELETE /products/:id -> Menghapus produk
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
