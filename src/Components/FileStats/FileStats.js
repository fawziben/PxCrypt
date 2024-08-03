import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import LinearProgress from "@mui/material/LinearProgress";
import "./FileStats.css";
import { Stack } from "@mui/material";
import ProgressComponent from "../ProgressComponent/ProgressComponent";
import { axiosInstance } from "../../AxiosInstance";

Chart.register(ArcElement);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function FileStats() {
  const [results, setResults] = useState([]);
  const [ufiles, setUfiles] = useState([]);
  const [data, setData] = useState([]);
  const [gap, setGap] = useState(window.innerWidth <= 1200 ? "1vw" : "4vw");
  const [width, setWidth] = useState(window.innerWidth <= 1200 ? "81%" : "85%");

  async function getUploadedFiles() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get(`files/stats/uploaded`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setUfiles(response.data);
      }
    } catch (e) {
      alert(e);
    }
  }

  const countFileTypes = (data, setRes) => {
    const fileCounts = data.reduce((acc, file) => {
      let ext = file.path.split(".").slice(-2, -1)[0];
      if (acc[ext]) {
        acc[ext] += 1;
      } else {
        acc[ext] = 1;
      }
      return acc;
    }, {});

    const resultsArray = Object.keys(fileCounts).map((ext) => ({
      ext: ext,
      count: fileCounts[ext],
    }));
    setRes(resultsArray);
  };

  const countUFileTypes = (data, setRes) => {
    const fileCounts = data.reduce((acc, file) => {
      let ext = file.name.split(".").slice(-2, -1)[0]; // Utilisation de file.name
      if (acc[ext]) {
        acc[ext] += 1;
      } else {
        acc[ext] = 1;
      }
      return acc;
    }, {});

    const resultsArray = Object.keys(fileCounts).map((ext) => ({
      ext: ext,
      count: fileCounts[ext],
    }));
    setRes(resultsArray);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    const dataString = localStorage.getItem(`fileData_${userId}`);
    const data = JSON.parse(dataString);
    getUploadedFiles();
    const handleResize = () => {
      setGap(window.innerWidth <= 1200 ? "1vw" : "4vw");
      setWidth(window.innerWidth <= 1200 ? "81%" : "85%");
    };
    countFileTypes(data, setResults);
    console.log(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    countUFileTypes(ufiles, setData); // Appel de la fonction après la mise à jour de ufiles
  }, [ufiles]);

  const getBackgroundColor = (index) => {
    const colors = [
      "rgba(43, 63, 229, 0.8)",
      "rgba(250, 192, 19, 0.8)",
      "rgba(253, 135, 135, 0.8)",
      "rgba(35, 135, 135, 0.8)",
      "rgba(100, 100, 100, 0.8)",
    ];
    return index < 4 ? colors[index] : colors[4];
  };

  return (
    <div className="App" style={{ gap }}>
      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: [
              ...results.slice(0, 4).map((result) => result.ext),
              "Others",
            ],
            datasets: [
              {
                label: "Count",
                data: results.map((result) => result.count),
                backgroundColor: results.map((result, index) =>
                  getBackgroundColor(index)
                ),
                borderColor: results.map((result, index) =>
                  getBackgroundColor(index)
                ),
              },
            ],
          }}
          options={{
            cutout: "70%",
            plugins: {
              title: {
                text: "Repartition des fichiers cryptes",
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    let label = results[tooltipItem.dataIndex].ext || "";
                    if (label) {
                      label += ": ";
                    }
                    label += Math.round(tooltipItem.raw);
                    label += " files";
                    return label;
                  },
                },
              },
            },
          }}
        />
        <div className="centered">
          {results.reduce((total, result) => total + result.count, 0)} Files
        </div>
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: data.map((result, index) =>
              index < 4 ? result.ext : "Others"
            ),
            datasets: [
              {
                label: "Count",
                data: data.map((result) => result.count),
                backgroundColor: data.map((result, index) =>
                  getBackgroundColor(index)
                ),
                borderColor: data.map((result, index) =>
                  getBackgroundColor(index)
                ),
              },
            ],
          }}
          options={{
            cutout: "70%",
            plugins: {
              title: {
                text: "Repartition des fichiers cryptes sur le serveur",
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    let label = data[tooltipItem.dataIndex].ext || "";
                    if (label) {
                      label += ": ";
                    }
                    label += Math.round(tooltipItem.raw);
                    label += " files";
                    return label;
                  },
                },
              },
            },
          }}
        />
        <div className="centered">
          {data.reduce((total, result) => total + result.count, 0)} Files
        </div>
      </div>
      <div className="dataCard revenueCard" style={{ width }}>
        <ProgressComponent usedStorage={33.2} totalStorage={100} />
      </div>
    </div>
  );
}
