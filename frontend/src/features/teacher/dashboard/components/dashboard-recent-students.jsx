import { useGetRecentStudents } from "../queries/use-get-recent-students";

const RecentStudents = () => {
  const { data: students = [], isLoading } = useGetRecentStudents(5);

  return (
    <div className="border border-black/10 bg-white p-5 sm:p-6 transition-all hover:border-black">
      <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
        Recent Students
      </h2>

      {isLoading ? (
        <div className="mt-8 space-y-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-black/5 pb-4 last:border-b-0"
            >
              <div className="h-10 w-10 animate-pulse bg-black/5" />
              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse bg-black/5" />
                <div className="h-3 w-20 animate-pulse bg-black/5" />
              </div>
            </div>
          ))}
        </div>
      ) : students.length === 0 ? (
        <div className="mt-8 flex h-40 items-center justify-center text-sm text-black/40">
          No students enrolled yet.
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {students.map((student) => {
            const initial = (student.name || "S")[0].toUpperCase();

            return (
              <div
                key={student.id}
                className="flex flex-col gap-3 border-b border-black/5 pb-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  {student.avatar ? (
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-10 w-10 border border-black/10 object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center bg-black text-sm font-medium text-white">
                      {initial}
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-black">{student.name}</h3>
                    <p className="text-xs text-black/40">
                      {student.courseTitle
                        ? `Enrolled in ${student.courseTitle}`
                        : "Joined recently"}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-medium text-black/35 sm:text-right">
                  {student.enrolledAt
                    ? new Date(student.enrolledAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Recent"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentStudents;

