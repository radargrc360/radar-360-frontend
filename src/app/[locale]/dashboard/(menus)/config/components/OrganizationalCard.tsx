export function OrganizationalCard({
  title,
  description,
  children,
  icon,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        {icon}
        <span>
          <h1 className="text-lg font-medium">{title}</h1>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </span>
      </div>

      <hr className="w-full border border-gray-200" />

      <div className="space-y-2">{children}</div>
    </div>
  );
}