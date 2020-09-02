import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./TeamsTable.css";
import { config } from "../../utils/config.json";

const TeamsTable = () => {
  const [teams, setTeams] = useState([]);
  const [favorites, setFavorites] = useState();

  const getInitialState = () => {
    const isFavoriteExist = JSON.parse(localStorage.getItem("favorites"));
    if (!isFavoriteExist) {
      localStorage.setItem("favorites", JSON.stringify([0]));
    }
    setFavorites(isFavoriteExist);
  };

  const handleFavoriteClick = async (id) => {
    const myList = JSON.parse(localStorage.getItem("favorites"));
    myList.includes(id.key)
      ? myList.splice(myList.indexOf(id.key), 1)
      : myList.push(id.key);
    localStorage.setItem("favorites", JSON.stringify(myList));
    setFavorites(myList);
  };

  const getData = async () => {
    const dataFromApi = await axios.get(config.url, {
      headers: { "X-Auth-Token": config.api_key },
    });
    const allTeams = dataFromApi.data.teams.map((team) => {
      return {
        key: team.id,
        name: team.name,
        yearFounded: team.founded,
        crest: team.crestUrl ? (
          <img src={team.crestUrl} alt="No Crest Available" />
        ) : (
          <div>-</div>
        ),
      };
    });
    setTeams(allTeams);
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
          <button>
            <HeartOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="teams-table">
      <Table
        columns={columns}
        dataSource={teams}
        scroll={{ y: 400 }}
        onRow={(record) => ({
          onClick: () => {
            handleFavoriteClick(record);
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
