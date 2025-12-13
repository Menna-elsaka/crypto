type AlgorithmPhase = 'input' | 'init' | 'rounds' | 'final';

type Props = {
  phase: AlgorithmPhase;
};

export function AlgorithmProgress({ phase }: Props) {
  const steps: { key: AlgorithmPhase; label: string }[] = [
    { key: 'input', label: 'Input' },
    { key: 'init', label: 'Initialization' },
    { key: 'rounds', label: 'Rounds' },
    { key: 'final', label: 'Final Hash' },
  ];

  return (
    <div className="flex justify-between items-center gap-2 p-3 rounded-xl bg-slate-900 border border-purple-500">
      {steps.map((step, index) => {
        const isActive = phase === step.key;
        const isCompleted =
          steps.findIndex((s) => s.key === phase) >
          steps.findIndex((s) => s.key === step.key);

        return (
          <div
            key={step.key}
            className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all
              ${
                isActive
                  ? 'bg-purple-600 text-white scale-105'
                  : isCompleted
                  ? 'bg-green-600/70 text-white'
                  : 'bg-slate-700 text-gray-300'
              }
            `}
          >
            <div>{index + 1}</div>
            <div>{step.label}</div>
          </div>
        );
      })}
    </div>
  );
}
