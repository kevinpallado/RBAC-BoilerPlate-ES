import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  // mainNav: [
  //   {
  //     title: "Documentation",
  //     href: "/docs",
  //   },
  //   {
  //     title: "Support",
  //     href: "/support",
  //     disabled: true,
  //   },
  // ],
  profileNav: [
    {
      title: "Personal Background",
      href: route('students.profile'),
      icon: "receipt",
      slug: "my_profile",
      pathKey: "students.profile"
    },
    {
      title: "Family Background",
      href: route('students.profile.family'),
      icon: "receipt",
      slug: "my_profile",
      pathKey: "students.profile.family"
    },
    {
      title: "Security",
      href: route('students.enrollment.index'),
      icon: "receipt",
      slug: "security",
      pathKey: "students.enrollment.*"
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "post",
      slug: "dashboard",
      pathKey: "dashboard"
    },
    {
      title: "Assessment & Billing",
      href: route('students.assessment-billing.index'),
      icon: "receipt",
      slug: "assessment_and_billing",
      pathKey: "students.assessment-billing.*"
    },
    {
      title: "Enrollment",
      href: route('students.enrollment.index'),
      icon: "bookMarked",
      slug: "enrollment",
      pathKey: "students.enrollment.*"
    },
    {
      title: "Evaluation",
      href: route('students.evaluation.index'),
      icon: "pencilRuler",
      slug: "evaluation",
      pathKey: "students.evaluation.*"
    },
    {
      title: "Grades",
      href: route('students.grades.index'),
      icon: "star",
      slug: "grades",
      pathKey: "students.grades.*"
    },
    {
      title: "Subjects Enrolled",
      href: route('students.subjects-enrolled.index'),
      icon: "laptop",
      slug: "subjects_enrolled",
      pathKey: "students.subjects-enrolled.*"
    },
    {
      title: "User Group",
      href: route('system-settings.user-group.index'),
      icon: "userSquare",
      slug: "user_group",
      pathKey: "system-settings.user-group.*"
    },
    {
      title: "Users",
      href: route('system-settings.users.index'),
      icon: "user",
      slug: "users",
      pathKey: "system-settings.users.*"
    },
  ],
}
