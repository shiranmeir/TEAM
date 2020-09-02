import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../utils/config.json";
import { Table } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./TeamsTable.css";

const TeamsTable = () => {
  const [teams, setTeams] = useState([]);
  const [favorites, setFavorites] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    getInitialState();
  }, []);

  const getInitialState = () => {
    const getFavoriteStorage = JSON.parse(localStorage.getItem("favorites"));
    if (!getFavoriteStorage) {
      localStorage.setItem("favorites", JSON.stringify([0]));
    }
    setFavorites(getFavoriteStorage);
  };

  const handleFavoriteClick = (record) => {
    const myFavoriteList = JSON.parse(localStorage.getItem("favorites"));
    myFavoriteList.includes(record.key)
      ? myFavoriteList.splice(myFavoriteList.indexOf(record.key), 1)
      : myFavoriteList.push(record.key);
    localStorage.setItem("favorites", JSON.stringify(myFavoriteList));
    setFavorites(myFavoriteList);
  };

  const getData = async () => {
    const getAPIData = await axios.get(config.url, {
      headers: { "X-Auth-Token": config.api_key },
    });
    const allTeams = getAPIData.data.teams.map((team) => {
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
    setIsLoading(false);
  };

  const columns = [
    {
      title: "Crest",
      dataIndex: "crest",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Year Founded",
      dataIndex: "yearFounded",
      sorter: (a, b) => a.yearFounded - b.yearFounded,
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
        showSorterTooltip={false}
        loading={isLoading}
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
