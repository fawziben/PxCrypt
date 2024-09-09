import React, { useEffect, useState } from "react";
import "./ProgressComponent.css"; // Assurez-vous d'avoir le fichier CSS approprié
import { axiosInstance } from "../../AxiosInstance";
import { convertSize } from "../../utilities/utilisties";

async function getRemainingStorage(setUsedStorage, setTotalStorage) {
  try {
    let accessToken = localStorage.getItem("token");

    const response = await axiosInstance.get(`users/storage`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data);
      setUsedStorage(response.data.total_used);
      setTotalStorage(response.data.total_storage);
    }
  } catch (e) {
    alert(e);
  }
}

const ProgressComponent = () => {
  const [usedStorage, setUsedStorage] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);

  useEffect(() => {
    getRemainingStorage(setUsedStorage, setTotalStorage);
  }, []);
  const percentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="progress-container">
      <div className="progress-label">Remaining upload storage</div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="progress-value">{`${convertSize(
          usedStorage
        )} / ${convertSize(totalStorage)}`}</span>
      </div>
    </div>
  );
};

export default ProgressComponent;
