import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import LinearProgress from "@mui/material/LinearProgress";

import "./FileStats.css";

import sourceData from "../data/sourceData.json";
import { Stack } from "@mui/material";

Chart.register(ArcElement);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function FileStats() {
  const [results, setResults] = useState([]);

  const [gap, setGap] = useState(window.innerWidth <= 1200 ? "1vw" : "4vw");
  const [width, setWidth] = useState(window.innerWidth <= 1200 ? "81%" : "85%");

  const countFileTypes = (data) => {
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
    setResults(resultsArray);
  };

  useEffect(() => {
    const dataString = sessionStorage.getItem("fileData");
    const data = JSON.parse(dataString);
    const handleResize = () => {
      setGap(window.innerWidth <= 1200 ? "1vw" : "4vw");
      setWidth(window.innerWidth <= 1200 ? "81%" : "85%");
    };
    countFileTypes(data);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App" style={{ gap }}>
      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: results.map((result) => result.ext),
            datasets: [
              {
                label: "Count",
                data: results.map((result) => result.count),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(35, 135, 135, 0.8)",
                  "rgba(100, 100, 100, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(35, 135, 135, 0.8)",
                  "rgba(100, 100, 100, 0.8)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Repartition des fichiers cryptes sur le serveur",
              },
            },
          }}
        />
      </div>
      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Repartition des fichiers cryptes",
              },
            },
          }}
        />
      </div>
      <div className="dataCard revenueCard" style={{ width }}>
        <LinearProgress variant="determinate" value={60} />
      </div>
    </div>
  );
}
