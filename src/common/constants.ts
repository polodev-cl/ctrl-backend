export const EXCEL_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

// Validation messages
export const LENGTH_FIELD = (nombre: string, min: number, max?: number) => `Campo ${ nombre } debe tener al menos ${ min } caracteres${ max ? ` y no más de ${ max } caracteres.` : '.' }`;
export const IS_STRING = (nombre: string) => `El campo ${ nombre } debe ser un texto.`;
export const IS_NUMBER = (nombre: string) => `El campo ${ nombre } debe ser un número.`;
export const IS_DATE = (nombre: string) => `El campo ${ nombre } debe ser una fecha.`;
export const IS_BOOLEAN = (nombre: string) => `El campo ${ nombre } debe ser un valor booleano.`;
export const IS_URL = (nombre: string) => `El campo ${ nombre } debe ser una URL.`;
export const MIN_VALUE = (min: number) => `Campo debe ser mayor o igual a ${ min }.`;
export const MAX_VALUE = (max: number) => `Campo debe ser menor o igual a ${ max }.`;
export const INVALID_EMAIL = (email: string) => `El email ${ email } no es válido.`;
