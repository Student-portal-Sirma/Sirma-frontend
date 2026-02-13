
import { STRAPI_URL } from "./config";
import { getToken } from "./token";

export async function http(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${STRAPI_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      data?.error?.message ||
      data?.message ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}
