import React from "react";
import TeamTable from "../TeamsTable/TeamsTable";
import { Card } from "antd";
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
