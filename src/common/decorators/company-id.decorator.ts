import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserCompanyType = { empId: number; prestador: boolean; };

export const UserCompany = createParamDecorator(
  (_, context: ExecutionContext): { empId: number, prestador: boolean } | undefined => {
    const headers = context.switchToHttp().getRequest()?.headers;
    const empId = headers?.empid as number;
    const prestador = headers?.prestador;

    if (!empId || !prestador) return undefined;

    return {empId: Number(empId), prestador: prestador === 'true'};
  },
);
