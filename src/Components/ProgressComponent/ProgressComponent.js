import React from "react";
import "./ProgressComponent.css"; // Assurez-vous d'avoir le fichier CSS approprié

const ProgressComponent = ({ usedStorage, totalStorage }) => {
  const percentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="progress-container">
      <div className="progress-label">Remaining upload storage</div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="progress-value">{`${usedStorage} / ${totalStorage} GB`}</span>
      </div>
    </div>
  );
};

export default ProgressComponent;
