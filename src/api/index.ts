import { z } from 'zod';

import { apiUrl } from './constants';
import { apiResponseSchema } from './schemas/response';

export const post = async <T>(path: string, data: any, schema?: z.ZodType<T> | null, bearer?: string) => {
  try {
    const url = new URL(path, apiUrl);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(bearer && { Authorization: bearer }),
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      throw new Error(result.message);
    }

    const apiParsed = apiResponseSchema.parse(result);

    if (schema && apiParsed.result) {
      return schema.parse(apiParsed.result);
    }

    return apiParsed.result as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid API response format');
    }
    throw error;
  }
};

export const get = async <T>(path: string, schema?: z.ZodType<T> | null, bearer?: string) => {
  try {
    const url = new URL(path, apiUrl);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(bearer && { Authorization: bearer }),
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    const apiParsed = apiResponseSchema.parse(result);

    if (schema && apiParsed.result) {
      return schema.parse(apiParsed.result);
    }

    return apiParsed.result as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid API response format');
    }
    throw error;
  }
};
