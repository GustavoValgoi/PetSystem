import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const PetshopID = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException('Usuário não encontrado na requisição!');
    }

    if (!request.user.petshopId) {
      throw new NotFoundException('Usuário não criou um Petshop ainda!');
    }

    const petshopId: string = request.user.petshopId;

    return petshopId;
  },
);
