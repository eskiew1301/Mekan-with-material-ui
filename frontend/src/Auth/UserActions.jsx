import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import React from 'react';

const UserActions = ({ params, onDelete }) => {
  const { id } = params.row;

  return (
    <Box>
      <Tooltip title="Delete this user" sx={{color: 'red'}}>
        <IconButton onClick={() => onDelete(id)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UserActions;
