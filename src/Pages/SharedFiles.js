import React, { useEffect, useState } from "react";
import ReceivedFilesTable from "../Components/ReceivedFilesTable";
import SingleTab from "../Components/SingleTab";
import { axiosInstance } from "../AxiosInstance";
import Message from "../Components/Message";

export default function SharedFiles({ searchVal }) {
  return (
    <div
      style={{ marginTop: "100px", padding: 0, width: "100%" }}
      className="overflow-y-hidden"
    >
      <SingleTab title="Received">
        <ReceivedFilesTable searchVal={searchVal} />
      </SingleTab>
    </div>
  );
}
