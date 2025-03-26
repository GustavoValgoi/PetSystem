import { Variation_Image } from '@prisma/client';

export class ImageEntity implements Variation_Image {
  id: string;
  image: string;
  variationId: string;
  createdAt: Date;
  updatedAt: Date;
}
