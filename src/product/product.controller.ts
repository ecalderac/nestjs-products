import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';

//DTO
import { CreateProductDTO } from './dto/product.dto';
//SERVICE
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      code: 200,
      message: 'OK - Product Succesfully Created',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    res.status(HttpStatus.OK).json({
      code: 200,
      message: 'OK - Products Get',
      products,
    });
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') idProduct) {
    const product = await this.productService.getProduct(idProduct);
    if (!product) throw new NotFoundException('Product Does not exist');
    res.status(HttpStatus.OK).json({
      code: 200,
      message: 'OK - Product Get',
      product,
    });
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') idProduct) {
    const productDeleted = await this.productService.deleteProduct(idProduct);
    if (!productDeleted) throw new NotFoundException('Product Does not exist');
    res.status(HttpStatus.OK).json({
      code: 200,
      message: 'OK - Product Deleted',
      productDeleted,
    });
  }

  @Put('/update/:productID')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('productID') idProduct,
  ) {
    const updateProduct = await this.productService.updateProduct(
      idProduct,
      createProductDTO,
    );
    if (!updateProduct) throw new NotFoundException('Product Does not exist');
    res.status(HttpStatus.OK).json({
      code: 200,
      message: 'OK - Product Updated Successfully',
      updateProduct,
    });
  }
}
