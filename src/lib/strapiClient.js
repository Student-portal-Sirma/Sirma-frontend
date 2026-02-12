
const BASE_URL = import.meta.env.PUBLIC_STRAPI_URL;

function getToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("jwt");
}

export async function strapiFetch(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.error?.message || data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

// Auth

export function login(identifier, password) {
  return strapiFetch("/api/auth/local", {
    method: "POST",
    body: { identifier, password },
  });
}

export function register(username, email, password) {
  return strapiFetch("/api/auth/local/register", {
    method: "POST",
    body: { username, email, password },
  });
}

// Courses
export function getCourses(query = "") {
  return strapiFetch(`/api/courses${query}`);
}
