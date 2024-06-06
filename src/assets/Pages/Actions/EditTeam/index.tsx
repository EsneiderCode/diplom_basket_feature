import React, { useState } from "react";
import "./editteam.scss";

const EditTeam = ({
  isOpen,
  onClose,
  onUpdate,
  newTeamName,
  setNewTeamName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (newName: string) => void;
  newTeamName: string;
  setNewTeamName: (newName: string) => void;
}) => {
  const handleSave = () => {
    onUpdate(newTeamName);
    onClose();
    setNewTeamName("");
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Изменить название команды</h2>
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
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

export default EditTeam;
