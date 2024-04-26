import react from "react";
import { PlayerTeam } from "../../Interfaces";
import "../../Pages/Teams/teams.scss";
import "../../Pages/Teams/teams.scss";
const DeletePlayer = ({
  confirmDelete,
  player,
}: {
  confirmDelete: ({ player }: { player: PlayerTeam }) => void;
  player: PlayerTeam;
}) => {
  return (
    <div
      className="option-game delete-game"
      onClick={() => {
        confirmDelete({ player });
      }}
    >
      <svg
        width="30"
        height="29"
        viewBox="0 0 30 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.6936 16.7944L26.2079 28.3086L28.3292 26.1873L16.815 14.6731L29.1634 2.32466L27.0421 0.20334L14.6936 12.5518L2.49037 0.348494L0.369052 2.46981L12.5723 14.6731L1.20327 26.0421L3.32459 28.1635L14.6936 16.7944Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default DeletePlayer;
