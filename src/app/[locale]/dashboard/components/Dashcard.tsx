export interface DashcardProps {
  icon: React.ReactNode;
  title: string;
  statNumber?: string | number;
  warnText?: string;
  description?: { text?: string; number?: string };
}

export default function Dashcard({
  icon,
  title,
  statNumber,
  warnText,
  description,
}: DashcardProps) {
  return (
    <div className="hover:scale-105 transition-all duration-300 bg-light border border-gray-200 rounded-2xl p-5 w-full flex flex-col items-start justify-start h-42 gap-3 shadow-md shadow-dark/8">
      <div className="flex items-center gap-2 text-gray-500">
        {icon} {title}
      </div>

      {statNumber ? (
        <span className="text-2xl font-semibold text-dark">{statNumber}</span>
      ) : (
        <span className="bg-green-200 text-green-800 px-2 rounded-lg w-fit text-sm font-medium">
          {warnText}
        </span>
      )}

      <div className="flex items-baseline gap-2">
        {description?.number && (
          <span className="text-green-700 text-sm font-medium">
            {description?.number}
          </span>
        )}

        <span className="text-gray-400">{description?.text}</span>
      </div>
    </div>
  );
}
