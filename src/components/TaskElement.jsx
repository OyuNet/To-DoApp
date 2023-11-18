import React from "react";
import { IconButton } from "@mui/material";
import { Delete, Done, Edit } from "@mui/icons-material";

export default function TaskElement({ taskName, taskDesc, onComplete, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md m-4">
      <h3 className="text-lg font-semibold m-2">{taskName}</h3>
      <p className="text-gray-600">{taskDesc}</p>
      <div className="flex justify-end m-2">
        <IconButton color="success" aria-label="tamamlandı" onClick={onComplete}>
          <Done />
        </IconButton>
        <IconButton color="warning" aria-label="düzenle" onClick={onEdit}>
          <Edit />
        </IconButton>
        <IconButton color="error" aria-label="sil" onClick={onDelete}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
}
