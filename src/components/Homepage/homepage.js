import React, { useEffect, useState } from "react";
import "../../assets/styles/homepage.css";
import {
  Layout,
  Menu,
  Carousel,
  Image,
  Row,
  Col,
  Input,
  Button,
  Segmented,
  Divider,
} from "antd";
import {
  ManOutlined,
  WomanOutlined,
  HomeFilled,
  SearchOutlined,
  LoginOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { carouselImages } from "../../utils/homepageData";
import NewArrivals from "./newarrivals";
import Trending from "./trending";
import Men from "../Men/men";
import Women from "../Women/women";

const { Header, Content, Footer } = Layout;

const Homepage = () => {
  const [menuState, setMenuState] = useState("home");
  const [segmentedTab, setSegmentedTab] = useState("newArrivals");

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

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <Row type="flex">
          <Col xs={6} sm={5} md={4} lg={3} align="left">
            <span className="logo-text" onClick={() => setMenuState("home")}>
              OutfitAura
            </span>
          </Col>
          <Col xs={14} sm={15} md={16} lg={17} align="left">
            <Menu
              id="homepage-menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={headerItems}
              onClick={(key) => {
                setMenuState(
                  key.key === "1" ? "home" : key.key === "2" ? "men" : "women"
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
      </Header>
      <Content className="homepage-content">
        {menuState === "home" ? (
          <>
            <Row type="flex">
              <Col span={24} align="center">
                <Col xs={24} sm={24} md={24} lg={24} align="center">
                  <Carousel
                    id="homepage-carousel"
                    autoplay
                    dotPosition={"bottom"}
                  >
                    {carouselImages.map((carousel) => (
                      <div>
                        <h3 className="carousel-wrapper-main">
                          <div className="carousel-wrapper">
                            <Image
                              src={carousel.image}
                              preview={false}
                              height={370}
                              width={670}
                              style={{ borderRadius: 20 }}
                              className="carousel-image"
                            />
                            <div className="carousel-image-desc">
                              <Row>
                                <Col span={24} align="middle">
                                  <p className="carousel-text">
                                    {carousel.title}
                                  </p>
                                  <p className="carousel-text">
                                    {carousel.desc}
                                  </p>
                                </Col>
                                <Col span={5} offset={6}>
                                  <Button
                                    id="homepage-buy-now"
                                    className="buy-now-btn"
                                  >
                                    Buy Now
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </h3>
                      </div>
                    ))}
                  </Carousel>
                </Col>
              </Col>
            </Row>
            <Row className="mt-25">
              <Col span={24} align="center">
                <Col sm={24} md={24} lg={12}>
                  <Segmented
                    id="homepage-segmented"
                    size="large"
                    block
                    options={[
                      {
                        label: "New Arrivals",
                        value: "newArrivals",
                        icon: <LoginOutlined />,
                      },
                      {
                        label: "Trending",
                        value: "trending",
                        icon: <RiseOutlined />,
                      },
                    ]}
                    onChange={(value) => {
                      setSegmentedTab(value);
                    }}
                  />
                </Col>
              </Col>
              <Col span={24}>
                {segmentedTab === "newArrivals" ? (
                  <NewArrivals />
                ) : (
                  <Trending />
                )}
              </Col>
            </Row>
          </>
        ) : menuState === "men" ? (
          <Men />
        ) : (
          <Women />
        )}
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        OutfitAura
      </Footer>
    </Layout>
  );
};
export default Homepage;
