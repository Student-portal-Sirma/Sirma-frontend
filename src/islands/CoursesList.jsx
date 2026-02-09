
import { useEffect, useMemo, useState } from "react";
import { getCourses } from "@/lib/strapiClient";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function normalizeCourse(item) {
  
  const a = item?.attributes || {};
  const thumbUrl =
    a?.thumbnail?.data?.attributes?.url
      ? `${import.meta.env.PUBLIC_STRAPI_URL}${a.thumbnail.data.attributes.url}`
      : null;

  return {
    id: item?.id,
    title: a?.title ?? "Untitled",
    description: a?.description ?? "",
    level: a?.level ?? null,
    lessonsCount: a?.lessonsCount ?? null,
    thumbnailUrl: thumbUrl,
  };
}

export default function CoursesList() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setError(null);
    setLoading(true);

    try {
      const res = await getCourses(); 
      const normalized = Array.isArray(res?.data)
        ? res.data.map(normalizeCourse)
        : [];
      setCourses(normalized);
    } catch (err) {
      setError(err?.message || "Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;

    return courses.filter((c) =>
      `${c.title} ${c.description} ${c.level || ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [courses, query]);

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-sm text-muted-foreground">
            Browse available courses (Strapi).
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-[28rem]">
          <Input
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant="outline"
            type="button"
            onClick={() => setQuery("")}
            disabled={!query}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          Loading courses...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border p-6 space-y-3">
          <p className="text-sm text-red-500">{error}</p>
          <Button type="button" onClick={load}>
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          No courses found. Try a different search.
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Card key={course.id} className="flex flex-col overflow-hidden">
              {course.thumbnailUrl && (
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              )}

              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {course.level ? `${course.level} • ` : ""}
                  {course.lessonsCount != null
                    ? `${course.lessonsCount} lessons`
                    : "Course"}
                </p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {course.description}
                </p>

                <div className="mt-auto flex gap-2">
                  <Button
                    type="button"
                    onClick={() =>
                      alert(`Open course: ${course.title} (demo)`)
                    }
                  >
                    Open
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      alert(`Enroll: ${course.title} (demo)`)
                    }
                  >
                    Enroll
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
