export type Role = "learner" | "manager" | "admin";
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  group: string;
};
export type Lesson = { id: string; title: string; path: string };
export type Progress = {
  id: string;
  userId: string;
  courseId: string;
  status: "not-started" | "in-progress" | "completed";
  percent: number;
  score: number | null;
  seconds: number;
  dueDate?: string;
  assigned?: boolean;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  lessons: Record<string, { status: string; cmi: Record<string, string> }>;
};
export type Course = {
  id: string;
  title: string;
  description: string;
  format: "html" | "scorm12" | "scorm2004";
  minutes: number;
  icon: "heart" | "idea" | "spark";
  published: boolean;
  lessons: Lesson[];
  createdAt: string;
  enrolment: Progress | null;
};
export type Report = {
  people: User[];
  courses: Course[];
  enrolments: Progress[];
};
export type Launch = {
  token: string;
  url: string;
  lesson: Lesson;
  enrolment: Progress;
};
export const formatName = (format: Course["format"]) =>
  ({ html: "HTML", scorm12: "SCORM 1.2", scorm2004: "SCORM 2004" })[format];
export const statusName = (status?: Progress["status"]) =>
  status === "completed"
    ? "Completed"
    : status === "in-progress"
      ? "In progress"
      : "Not started";
