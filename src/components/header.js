import React, { useState } from "react";
import { Row, Col, Menu, Input } from "antd";
import {
  ManOutlined,
  WomanOutlined,
  HomeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const Header = ({ selectedMenu }) => {
  const [menuKey, setMenuKey] = useState(selectedMenu);
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

  const navigate = useNavigate();

  return (
    <Row type="flex">
      <Col xs={6} sm={5} md={4} lg={3} align="left">
        <span className="logo-text" onClick={() => navigate("/home")}>
          OutfitAura
        </span>
      </Col>
      <Col xs={14} sm={15} md={16} lg={17} align="left">
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
      <Col xs={4} sm={4} md={4} lg={4} align="right">
        <Input
          id="homepage-search"
          prefix={<SearchOutlined style={{ color: "grey" }} />}
          placeholder="Search"
          allowClear
        />
      </Col>
    </Row>
  );
};

export default Header;
