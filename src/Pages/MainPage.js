import React, { useState } from "react";
import MainPageTabs from "../Components/MainPageTabs";
import LocalFilesTable from "../Components/LocalFilesTable";
import FoldersTable from "../Components/FoldersTable";
import KeyFab from "../Components/KeyFab";

export default function MainPage() {
  return (
    <div
      style={{ marginTop: "100px", padding: 0, width: "100%" }}
      className="overflow-y-hidden"
    >
      <MainPageTabs title1="Files" title2="Folders">
        <LocalFilesTable />
        <FoldersTable />
      </MainPageTabs>
      <KeyFab></KeyFab>
    </div>
  );
}
