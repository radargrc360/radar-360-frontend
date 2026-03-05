interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = (currentStep / 5) * 100;

  return (
    <div className="flex w-full gap-2 items-center">
      <p className="text-gray-500 max-w-48 w-full">Processo da configuração:</p>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-full rounded-full bg-dark transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
