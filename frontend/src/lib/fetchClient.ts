type FetchClientOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

/**
 * Centralized fetch wrapper with JWT token and error handling.
 * Always uses the API Gateway base URL.
 */
export async function fetchClient<T>(
  url: string,
  options: FetchClientOptions = {}
): Promise<T> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    method: options.method || 'GET',
    headers,
    credentials: 'include',
    body:
      options.body && typeof options.body === 'object'
        ? JSON.stringify(options.body)
        : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

// ✅ Helper methods
export function getClient<T>(url: string): Promise<T> {
  return fetchClient<T>(url, { method: 'GET' });
}

export function postClient<T>(url: string, body: unknown): Promise<T> {
  return fetchClient<T>(url, { method: 'POST', body });
}

export function putClient<T>(url: string, body: unknown): Promise<T> {
  return fetchClient<T>(url, { method: 'PUT', body });
}

export function patchClient<T>(url: string, body: unknown): Promise<T> {
  return fetchClient<T>(url, { method: 'PATCH', body });
}

export function deleteClient<T>(url: string, body?: unknown): Promise<T> {
  return fetchClient<T>(url, {
    method: 'DELETE',
    ...(body ? { body } : {}),
  });
}
