import { Player, Status } from "../../Interfaces";
import { useState } from "react";
import { CardItem } from "./CardItem";
import "./containercards.scss";
interface Props {
  players: Player[];
  status: Status;
  isDragging: boolean;
  handleUpdateList: (id: number, status: Status) => void;
  handleDragging: (dragging: boolean) => void;
  type: string;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContainerCards = ({
  players = [],
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
  type,
  setButtonDisabled,
}: Props) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleUpdateList(+e.dataTransfer.getData("text"), status);
    handleDragging(false);
    setMessageSetFivePlayers(false);
    setTimeout(() => {
      checkListFirstFive();
    }, 100);
  };

  const checkListFirstFive = () => {
    let firstPlayersLength = 0;
    players.forEach((player: Player) => {
      if (player.status === "firstFive") {
        firstPlayersLength++;
      }
    });
    firstPlayersLength === 5
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();
  const [messageSetFivePlayers, setMessageSetFivePlayers] =
    useState<boolean>(true);
  return (
    <div
      className={
        type === "firstFive"
          ? `layout-cards-firstFive ${isDragging ? "layout-dragging" : ""}`
          : `layout-cards ${isDragging ? "layout-dragging" : ""}`
      }
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {messageSetFivePlayers === true && type === "firstFive" && (
        <p className="instruction-description">
          Перетащите пальцем игроков вниз
        </p>
      )}
      {players.map(
        (player: Player) =>
          status === player.status && (
            <CardItem
              data={player}
              key={player.id}
              handleDragging={handleDragging}
            />
          )
      )}
    </div>
  );
};
