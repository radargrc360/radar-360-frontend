type RiskLevel = "Baixo" | "Média" | "Alto";
type Probability = "Baixo" | "Média" | "Alto";

export default function RiskMatrix() {
  const impactos: RiskLevel[] = ["Baixo", "Média", "Alto"];
  const probabilidades: Probability[] = ["Alto", "Média", "Baixo"];

  const getColor = (impact: RiskLevel, probability: Probability) => {
    if (impact === "Alto" && probability === "Alto") return "bg-red-500";
    if (impact === "Média" || probability === "Média") return "bg-orange-400";
    return "bg-green-500";
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 w-full shadow-md shadow-dark/8 min-h-96">
      <div>
        <h2 className="text-lg font-semibold text-dark">Matriz de Risco</h2>
        <p className="text-gray-500 text-sm mt-1">
          Distribuição de riscos por probabilidade e impacto
        </p>
      </div>

      <div className="grid grid-cols-4 mt-10 mb-4">
        <div></div>
        {impactos.map((impact) => (
          <div
            key={impact}
            className="text-center text-gray-600 font-medium">
            {impact}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {probabilidades.map((prob) => (
          <div
            key={prob}
            className="grid grid-cols-4 items-center gap-4">
            <div className="text-gray-700 font-medium">{prob}</div>

            {impactos.map((impact) => {
              return (
                <button
                  key={impact}
                  className={`
                    h-14 rounded-xl flex items-center justify-center text-white 
                    font-semibold cursor-pointer transition
                    ${getColor(impact, prob)}
                  `}></button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
