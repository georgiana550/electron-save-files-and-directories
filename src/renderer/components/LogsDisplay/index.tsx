// LogDisplay.jsx
import { Grid } from "@mui/material";
import React from "react";

type Props = {
  logs: any;
};

const LogDisplay = ({ logs }: Props) => {
  return (
    <>
      {logs.map((log: any, index: number) => (
        <div key={index}>{log}</div>
      ))}
    </>
  );
};

export default LogDisplay;
