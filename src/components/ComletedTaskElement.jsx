import React from "react";
import { IconButton } from "@mui/material";
import { Delete, Undo } from "@mui/icons-material";

export default function CompletedTaskElement({ taskName, taskDesc, onDelete, onUndo }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md m-4">
      <h3 className="text-lg font-semibold m-2">{taskName}</h3>
      <p className="text-gray-600">{taskDesc}</p>
      <div className="flex justify-end m-2">
        <IconButton color="warning" aria-label="tamamlanmamış" onClick={onUndo}>
          <Undo />
        </IconButton>
        <IconButton color="error" aria-label="sil" onClick={onDelete}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
}
