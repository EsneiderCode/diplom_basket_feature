import React, { useRef, useEffect } from "react";
import Chart, { ChartConfiguration, RadialLinearScale } from "chart.js/auto";
import "./diagram.scss";
const Diagram: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const config: ChartConfiguration<"radar"> = {
          type: "radar",
          data: data,
          options: {
            elements: {
              line: {
                borderCapStyle: "round",
              },
            },
          },
        };
        new Chart(ctx, config);
      }
    }
  }, []);

  const labels = [
    "Нападание против зоны",
    "Быстрый отрыв",
    "Позиционное нападение",
    "Атака второго шанса",
    "Раннее нападание",
    "Нападание против прессинга",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: [18, 10, 20, 13, 15, 12],
        backgroundColor: "transparent",
        borderColor: "#acaab7",
        borderWidth: 2,
      },
      {
        label: "",
        data: [15, 12, 7, 18, 3, 6],
        backgroundColor: "transparent",
        borderColor: "#ef8034",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <section className={"global__section"}>
        <div className={"diagram__container"}>
          <canvas ref={chartRef} width="400" height="200" />
        </div>
      </section>
    </>
  );
};

export default Diagram;
