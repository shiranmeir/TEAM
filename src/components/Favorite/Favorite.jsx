import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined, UserOutlined, HeartOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Favorite.css";

const Favorite = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="favorite">
      <div className="icons-list">
        <HeartOutlined />
      </div>
      <Dropdown overlay={menu}>
        <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          MY FAVORITE <DownOutlined />
        </div>
      </Dropdown>
    </div>
  );
};

export default Favorite;
