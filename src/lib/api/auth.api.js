
import { http } from "../http";

export function register({ username, email, password }) {
  return http("/api/auth/local/register", {
    method: "POST",
    body: { username, email, password },
  });
}

export function login({ identifier, password }) {
  return http("/api/auth/local", {
    method: "POST",
    body: { identifier, password },
  });
}

export function me() {
  return http("/api/users/me", { auth: true });
}
