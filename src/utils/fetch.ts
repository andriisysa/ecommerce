'use server';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3010';

const request = async <T>(
  path: string,
  options?: RequestInit
): Promise<T | undefined> => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': String(process.env.X_API_KEY),
      },
      ...(options ? options : {}),
    });

    if (!res.ok) return undefined;

    return res.json();
  } catch (error) {
    console.log('fetch error ===>', path, error);
    return undefined;
  }
};

export const fetchOptions = (duration = 12 * 60 * 60): RequestInit => ({
  next: {
    revalidate: duration,
  },
});

export default request;
