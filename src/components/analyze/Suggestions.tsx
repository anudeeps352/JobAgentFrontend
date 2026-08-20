interface Props {
  suggestions: string[];
}

export default function Suggestions({ suggestions }: Props) {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-sm font-semibold text-yellow-400">
        Optimization Suggestions
      </h3>

      {suggestions.length > 0 ? (
        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <div
              key={`${index}-${item}`}
              className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
            >
              <span className="mr-3 text-yellow-400">
                {(index + 1).toString().padStart(2, '0')}.
              </span>

              {item}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          No optimization suggestions were returned.
        </p>
      )}
    </div>
  );
}
