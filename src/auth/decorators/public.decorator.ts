import { SetMetadata } from '@nestjs/common';

// this decorator will expose the end points without access token
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
