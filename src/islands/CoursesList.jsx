import { mockCourses } from "@/data/mockCourses";
import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function CoursesList(){
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return mockCourses;
        return mockCourses.filter((c) => 
        (c.title + " " + c.description + " " + c.level).toLowerCase().includes(q)
    );
    }, [query]);

    return (
        <div className="space-y-6">
            {/* Top bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <p className="text-sm text-muted-foreground">
                        Browse available courses (demo data)
                    </p>
                </div>

                <div className="flex gap-2 w-full sm:w-96">
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

            { /* Grid */}
            {filtered.length === 0 ? (
                <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                    No courses found. Try a different search.
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((course) => (
                        <Card key={course.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <p className="text-xs text-muted-foreground">
                                    {course.level} • {course.lessonsCount} lessons
                                </p>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col gap-4">
                                <p className="text-sm text-muted-foreground">
                                    {course.description}
                                </p>

                                <div className="mt-auto flex gap-2">
                                    <Button
                                        type="button"
                                        onClick={() => alert(`Open course: ${course.title} (demo)`)}
                                    >
                                    Open
                                    </Button>

                                    <Button 
                                        type="button"
                                        variant="outline"
                                        onClick={() => alert(`Enroll: ${course.title} (demo)`)}
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