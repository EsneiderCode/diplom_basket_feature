import { ContainerCards } from "./ContainerCards";
import { Players } from "./Players";
import { Status, Player } from "../../Interfaces";
import { useState } from "react";

const typesPlayer: Status[] = ["bench", "firstFive"];

interface Props {
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DragAndDrop = (props: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<Player[]>(Players);

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleUpdateList = (id: number, status: Status) => {
    let card = listItems.find((item) => item.id === id);

    if (card && card.status !== status) {
      card.status = status;

      setListItems((prev) => [card!, ...prev.filter((item) => item.id !== id)]);
    }
  };

  return (
    <div className="grid">
      <ContainerCards
        items={listItems}
        status={typesPlayer[0]}
        key={typesPlayer[0]}
        isDragging={isDragging}
        handleDragging={handleDragging}
        handleUpdateList={handleUpdateList}
        type="bench"
        setButtonDisabled={props.setButtonDisabled}
      />
      <hr className="hr-popup" />
      <ContainerCards
        items={listItems}
        status={typesPlayer[1]}
        key={typesPlayer[1]}
        isDragging={isDragging}
        handleDragging={handleDragging}
        handleUpdateList={handleUpdateList}
        type="firstFive"
        setButtonDisabled={props.setButtonDisabled}
      />
    </div>
  );
};
