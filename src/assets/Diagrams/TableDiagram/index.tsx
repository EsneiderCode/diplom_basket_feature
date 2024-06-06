import react, { useEffect, useState } from "react";
import "./table.scss";
import { Action, ActionTableDiagramI, PlayerTeam } from "../../Interfaces";
import * as XLSX from "xlsx";
const TableDiagram = ({ actions }: { actions: Action[] }) => {
  const [teamActionsFormated, setTeamActionsFormated] = useState<
    ActionTableDiagramI[]
  >([]);

  const generateExcel = () => {
    const data = teamActionsFormated.map((action, index) => ({
      "№": action.index,
      Тайм: action.quater,
      "Тип начала атаки": action.typeOfPossession,
      Владение: action.possessions.map((player) => player.number).join(", "),
      "На площадке": action.playersOnField
        .map((player) => player.number)
        .join(", "),
      "Тип времени": action.timeType,
      Время: action.time,
      "Тип атаки": action.attackType,
      "Способ завершения": action.playType,
      Зона: action.zone,
      Ассист: action.assist,
      Фол: action.foulType,
      Забитые: action.foulResult,
      Потеря: action.lossType,
      Попадание: action.shotResult,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "team_actions.xlsx");
  };

  useEffect(() => {
    if (actions.length > 0) {
      setTeamActionsFormated(
        actions.map((action: Action, index: number) => {
          return {
            index,
            quater: action.quater || "",
            playersOnField: action.playersOnField || "",
            typeOfPossession: action.typeOfPossession || "",
            possessions: action.possessions,
            timeType: action.timeType || "",
            time: action.time || "",
            attackType: action.attackType || "",
            playType: action.playType || "",
            zone: action.zone || "",
            assist: action.assist || "",
            foulType: action.foulType || "",
            foulResult: action.foulResult || "",
            lossType: action.lossType || "",
            shotResult: action.shotResult || "",
          };
        })
      );
    }
  }, [actions]);

  const buttonStyle = {
    backgroundColor: "#f0a500",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, transform 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#d48800",
    transform: "scale(1.05)",
  };

  const [hover, setHover] = useState(false);

  return (
    <>
      <div className={"global__container"}>
        <h3 className="title">Общие статистики</h3>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Тайм</th>
              <th>Тип начала атаки</th>
              <th>Владение</th>
              <th>На площадке</th>
              <th>Тип времени</th>
              <th>Время</th>
              <th>Тип атаки</th>
              <th>Способ завершения</th>
              <th>Зона</th>
              <th>Ассист</th>
              <th>Фол</th>
              <th>Забитые</th>
              <th>Потеря</th>
              <th>Попадание</th>
            </tr>
          </thead>
          <tbody>
            {teamActionsFormated.map((action) => {
              return (
                <tr key={action.index}>
                  <td>{action.index}</td>
                  <td>{action.quater}</td>
                  <td>{action.typeOfPossession}</td>
                  <td className="td_large">
                    {action.possessions.map((player) => {
                      return (
                        <>
                          <td key={player.id}>{player.number}</td>
                        </>
                      );
                    })}
                  </td>
                  <td className="td_large">
                    {action.playersOnField.map((player) => {
                      return (
                        <>
                          <td key={player.id}>{player.number}</td>
                        </>
                      );
                    })}
                  </td>
                  <td>{action.timeType}</td>
                  <td>{action.time}</td>
                  <td>{action.attackType}</td>
                  <td>{action.playType}</td>
                  <td>{action.zone}</td>
                  <td>{action.assist}</td>
                  <td>{action.foulType}</td>
                  <td>{action.foulResult}</td>
                  <td>{action.lossType}</td>
                  <td>{action.shotResult}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        style={{ ...buttonStyle, ...(hover ? buttonHoverStyle : {}) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={generateExcel}
      >
        Скачать таблицу
      </button>
    </>
  );
};

export default TableDiagram;
