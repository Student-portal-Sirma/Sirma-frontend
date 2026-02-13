
import { http } from "../http";

export function getCourses() {
  return http("/api/courses?populate=thumbnail");
}

export function getCourseById(id) {
  return http(`/api/courses/${id}?populate=thumbnail`);
}
