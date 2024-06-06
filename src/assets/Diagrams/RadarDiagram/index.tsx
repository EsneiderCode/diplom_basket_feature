import React, { useRef, useEffect, useState } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import "./radardiagram.scss";
import { Action, Team } from "../../Interfaces";

interface RadarDiagramProps {
  actionsFirstTeam: Action[];
  actionsSecondTeam: Action[];
  teams: Team[];
}

export const RadarDiagram: React.FC<RadarDiagramProps> = ({
  actionsFirstTeam,
  actionsSecondTeam,
  teams,
}) => {
  const [diagramDataTeamA, setDiagramDataTeamA] = useState<{
    fb: number;
    sb: number;
    sc: number;
    so: number;
    po: number;
    zo: number;
  }>({
    fb: 0,
    sb: 0,
    sc: 0,
    so: 0,
    po: 0,
    zo: 0,
  });

  const [diagramDataTeamB, setDiagramDataTeamB] = useState<{
    fb: number;
    sb: number;
    sc: number;
    so: number;
    po: number;
    zo: number;
  }>({
    fb: 0,
    sb: 0,
    sc: 0,
    so: 0,
    po: 0,
    zo: 0,
  });

  useEffect(() => {
    const initializeData = () => ({
      fb: 0,
      sb: 0,
      sc: 0,
      so: 0,
      po: 0,
      zo: 0,
    });

    const processActions = (
      actions: Action[],
      data: {
        fb: number;
        sb: number;
        sc: number;
        so: number;
        po: number;
        zo: number;
      }
    ) => {
      actions.forEach((action) => {
        switch (action.attackType) {
          case "QUICK_BREAKAWAY":
            data.fb++;
            break;
          case "EARLY_ATTACK":
            data.sb++;
            break;
          case "SECOND_CHANCE_ATTACK":
            data.sc++;
            break;
          case "POSITIONAL_ATTACK":
            data.so++;
            break;
          case "BREAKING_PRESSURE":
            data.po++;
            break;
          case "BREAKING_ZONE":
            data.zo++;
            break;
          default:
            break;
        }
      });
    };

    if (actionsFirstTeam) {
      const dataTeamA = initializeData();
      processActions(actionsFirstTeam, dataTeamA);
      setDiagramDataTeamA(dataTeamA);
    }

    if (actionsSecondTeam) {
      const dataTeamB = initializeData();
      processActions(actionsSecondTeam, dataTeamB);
      setDiagramDataTeamB(dataTeamB);
    }
  }, [actionsFirstTeam, actionsSecondTeam]);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const labels = [
    "Нападение против зоны",
    "Быстрый отрыв",
    "Позиционное нападение",
    "Атака второго шанса",
    "Раннее Нападение",
    "Нападение против прессинга",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: teams[0].name,
        data: [
          diagramDataTeamA.zo,
          diagramDataTeamA.fb,
          diagramDataTeamA.po,
          diagramDataTeamA.sc,
          diagramDataTeamA.sb,
          diagramDataTeamA.so,
        ],
        backgroundColor: "transparent",
        borderColor: "#ef8034",
        borderWidth: 2,
      },
      {
        label: teams[1].name,
        data: [
          diagramDataTeamB.zo,
          diagramDataTeamB.fb,
          diagramDataTeamB.po,
          diagramDataTeamB.sc,
          diagramDataTeamB.sb,
          diagramDataTeamB.so,
        ],
        backgroundColor: "transparent",
        borderColor: "#acaab7",
        borderWidth: 2,
      },
    ],
  };

  console.log(data);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        const config: ChartConfiguration<"radar"> = {
          type: "radar",
          data: data,
          options: {
            scales: {
              r: {
                angleLines: {
                  display: true,
                },
                pointLabels: {
                  font: {
                    size: 12,
                    weight: "bold",
                  },
                },
              },
            },
            elements: {
              line: {
                borderCapStyle: "round",
              },
            },
          },
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [diagramDataTeamA, diagramDataTeamB]);

  return (
    <>
      <section className={"global__section"}>
        <h3 className="title">Статистики по типам атаки</h3>
        <div className={"diagram__container"}>
          <canvas ref={chartRef} width="400" height="200" />
        </div>
      </section>
    </>
  );
};

export default RadarDiagram;
