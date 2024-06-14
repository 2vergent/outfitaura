import "../assets/styles/header.css";
import React, { useState } from "react";
import { Row, Col, Menu, Input, Dropdown } from "antd";
import {
  ManOutlined,
  WomanOutlined,
  HomeFilled,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const Header = ({ selectedMenu }) => {
  const navigate = useNavigate();
  const [menuKey, setMenuKey] = useState(selectedMenu);

  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const headerItems = [
    {
      key: "1",
      label: "Home",
      icon: <HomeFilled />,
    },
    {
      key: "2",
      label: "Men",
      icon: <ManOutlined />,
    },
    {
      key: "3",
      label: "Women",
      icon: <WomanOutlined />,
    },
  ];
  const items = [
    {
      key: "1",
      label: (
        <p
          onClick={onLogOut}
          style={{ fontWeight: 600, color: "red", padding: "0 10px" }}
        >
          Logout
        </p>
      ),
      icon: <LogoutOutlined style={{ fontSize: 20 }} />,
    },
  ];

  return (
    <Row type="flex">
      <Col xs={6} sm={5} md={4} lg={3} align="left">
        <span className="logo-text" onClick={() => navigate("/home")}>
          OutfitAura
        </span>
      </Col>
      <Col xs={13} sm={17} md={18} lg={19} align="left">
        <Menu
          id="homepage-menu"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={menuKey}
          items={headerItems}
          onClick={(key) => {
            setMenuKey(key.key);
            navigate(
              key.key === "1" ? "/home" : key.key === "2" ? "/men" : "/women"
            );
          }}
        />
      </Col>
      <Col span={1} align="right">
        <ShoppingCartOutlined
          onClick={() => navigate("/cart")}
          className={selectedMenu !== "0" ? "cart-icon" : "cart-icon-active"}
        />
      </Col>
      <Col span={1} align="right">
        <Dropdown
          menu={{
            items,
          }}
          trigger="click"
        >
          <UserOutlined className="cart-icon" />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Header;
