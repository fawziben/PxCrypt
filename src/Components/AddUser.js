import React, { useState } from "react";
import AddGroupDialog from "./AddGroupDialog";
import { Box, Fab } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
const AddUser = () => {
  return (
    <Box sx={{ position: "absolute", bottom: "10px", right: "22px" }}>
      <Fab color="primary" aria-label="add">
        <PersonAddAltIcon />
      </Fab>
    </Box>
  );
};

export default AddUser;
