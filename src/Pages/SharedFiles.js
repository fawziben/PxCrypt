import React from "react";
import MainPageTabs from "../Components/MainPageTabs";
import SharedFilesTable from "../Components/SharedFilesTable";
import SignUpForm from "../Components/SignupForm/SignupForm";
import ReceivedFilesTable from "../Components/ReceivedFilesTable";
import SingleTab from "../Components/SingleTab";

export default function SharedFiles() {
  return (
    <div
      style={{ marginTop: "100px", padding: 0, width: "100%" }}
      className="overflow-y-hidden"
    >
      <SingleTab title="Received">
        <ReceivedFilesTable />
      </SingleTab>
    </div>
  );
}
