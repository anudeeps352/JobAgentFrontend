interface Props {
  gaps: string[];
}

export default function CriticalGaps({ gaps }: Props) {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-sm font-semibold text-red-400">Critical Gaps</h3>

      {gaps.length > 0 ? (
        <ul className="space-y-3">
          {gaps.map((gap) => (
            <li key={gap} className="text-sm text-zinc-400">
              - {gap}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-500">
          No major gaps were detected for this resume.
        </p>
      )}
    </div>
  );
}
