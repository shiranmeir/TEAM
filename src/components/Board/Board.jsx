import React from "react";
import { Card } from "antd";
import TeamTable from "../TeamsTable/TeamsTable";
import "antd/dist/antd.css";
import "./Board.css";

const Board = () => {
  return (
    <div className="board">
      <Card>
        <TeamTable />
      </Card>
    </div>
  );
};

export default Board;
