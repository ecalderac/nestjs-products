// Archivo dto para definir los datos que se manejan entre la app del cliente y servidor
export class CreateProductDTO {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  readonly createdAt: Date;
}
