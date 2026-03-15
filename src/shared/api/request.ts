const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5700';

export async function request<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status === 204) return null as T;

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data as T;
}
