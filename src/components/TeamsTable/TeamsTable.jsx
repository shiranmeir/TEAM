import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./TeamsTable.css";

const URL = "http://api.football-data.org/v2/teams/18";
const API = "1fb858a30473480a8fcc2a826898a6fa";

const TeamsTable = () => {
  const getState = localStorage.getItem("favorites") || "0";
  const [teams, setTeams] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getInitialState = () => {
    console.log(getState);
    let stateArray = getState.split(",").map(Number);
    console.log(stateArray);
    setFavorites(stateArray);
    console.log(favorites);
  };

  useEffect(() => {
    getData();
    getInitialState();
  }, []);

  const columns = [
    {
      title: "Crest",
      dataIndex: "crest",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Year Founded",
      dataIndex: "yearFounded",
    },
    {
      title: "My Favorite",
      render: () => (
        <div className="heart-icon">
          <Button shape="circle" icon={<HeartOutlined />} />
        </div>
      ),
    },
  ];

  const handleFavoriteClick = (id) => {
    if (favorites) {
      const idExist = favorites.includes(id.key);
      if (idExist) {
        favorites.splice(favorites.indexOf(id.key), 1);
        localStorage.setItem("favorites", favorites);
        setFavorites(favorites);
      } else {
        favorites.push(id.key);
        localStorage.setItem("favorites", favorites);
        setFavorites(favorites);
      }
    }
  };

  const getData = async () => {
    const data = await axios.get(
      "http://api.football-data.org/v2/competitions/2000/teams",
      {
        headers: {
          "X-Auth-Token": "1fb858a30473480a8fcc2a826898a6fa",
        },
      }
    );

    const dataArray = data.data.teams.map((d) => {
      const container = {};
      container.key = d.id;
      container.name = d.name;
      container.yearFounded = d.founded;
      d.crestUrl
        ? (container.crest = <img src={d.crestUrl} alt="No Crest Available" />)
        : (container.crest = <div>-</div>);
      return container;
    });
    setTeams(dataArray);
  };

  return (
    <div className="teams-table">
      <Table
        columns={columns}
        dataSource={teams}
        scroll={{ y: 400 }}
        onRow={(record) => ({
          onClick: () => {
            handleFavoriteClick(record);
            console.log(favorites);
          },
        })}
        rowClassName={(record) =>
          favorites && favorites.includes(record.key)
            ? "selected"
            : "not-selected"
        }
      />
    </div>
  );
};

export default TeamsTable;
