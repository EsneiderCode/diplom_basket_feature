import React, { useState } from "react";
import "./editplayer.scss";

const EditPlayer = ({
  isOpen,
  onClose,
  onUpdate,
  newPlayerName,
  setNewPlayerName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (newName: string) => void;
  newPlayerName: string;
  setNewPlayerName: (newName: string) => void;
}) => {
  const handleSave = () => {
    onUpdate(newPlayerName);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Изменить имя игрока</h2>
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
            />
            <div className="button-container">
              <button onClick={handleSave}>Сохранить</button>
              <button onClick={onClose}>Отменить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPlayer;
