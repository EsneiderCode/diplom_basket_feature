import { ContainerCards } from "./ContainerCards";
import { Status, Player } from "../../Interfaces";
import { useEffect, useState } from "react";
import axios from "axios";

const typesPlayer: Status[] = ["bench", "firstFive"];
interface Props {
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  firstTeamId?: number;
  secondTeamId?: number;
  firstPlayers: Player[];
  setFirstPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  secondPlayers: Player[];
  setSecondPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

export const DragAndDrop = (props: Props) => {
  const {
    setButtonDisabled,
    firstTeamId,
    secondTeamId,
    firstPlayers,
    setFirstPlayers,
    secondPlayers,
    setSecondPlayers,
  } = props;
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const getPlayers = async (teamId: number) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/teams/${teamId}`
        );
        if (res.status === 200) {
          const playersWithStatus = res.data.map((player: Player) => {
            player.status = "bench";
            return player;
          });
          firstTeamId
            ? setFirstPlayers(playersWithStatus)
            : setSecondPlayers(playersWithStatus);
        } else {
          console.log(res);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    if (firstTeamId) getPlayers(firstTeamId);
    if (secondTeamId) getPlayers(secondTeamId);
  }, [firstTeamId, secondTeamId, setFirstPlayers, setSecondPlayers]);

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleUpdateList = (id: number, status: Status) => {
    let card: any = [];
    if (firstTeamId != null) {
      card = firstPlayers.find((player) => player.id === id);
      if (card && card.status !== status) {
        card.status = status;
        setFirstPlayers((prev) => [
          card!,
          ...prev.filter((player) => player.id !== id),
        ]);
      }
    } else {
      card = secondPlayers.find((player) => player.id === id);
      if (card && card.status !== status) {
        card.status = status;
        setSecondPlayers((prev) => [
          card!,
          ...prev.filter((player) => player.id !== id),
        ]);
      }
    }
  };

  if (firstPlayers !== null || secondPlayers !== null) {
    return (
      <div className="grid">
        <ContainerCards
          players={firstTeamId != null ? firstPlayers : secondPlayers}
          status={typesPlayer[0]}
          key={typesPlayer[0]}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
          type="bench"
          setButtonDisabled={setButtonDisabled}
        />
        <hr className="hr-popup" />
        <ContainerCards
          players={firstTeamId != null ? firstPlayers : secondPlayers}
          status={typesPlayer[1]}
          key={typesPlayer[1]}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
          type="firstFive"
          setButtonDisabled={setButtonDisabled}
        />
      </div>
    );
  } else {
    return null;
  }
};
