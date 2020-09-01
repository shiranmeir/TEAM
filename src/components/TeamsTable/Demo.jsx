import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Year Founded",
    dataIndex: "yearFounded",
  },
  {
    title: "Crest",
    dataIndex: "crest",
  },
];

const Demo = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get(
      "http://api.football-data.org/v2/competitions/2000/teams",
      {
        headers: {
          "X-Auth-Token": "1fb858a30473480a8fcc2a826898a6fa",
        },
      }
    );

    const x = data.data.teams.map((d) => {
      const container = {};
      container.name = d.name;
      container.yearFounded = d.founded;
      d.crestUrl
        ? (container.crest = <img src={d.crestUrl} alt="No Crest Available" />)
        : (container.crest = <div>No Crest Available</div>);
      return container;
    });
    setTeams(x);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={teams}
      />
    </div>
  );
};

export default Demo;
