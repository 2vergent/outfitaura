import React, { useEffect, useState } from "react";
import "../assets/styles/homepage.css";
import {
  Layout,
  Menu,
  Carousel,
  Card,
  Image,
  Row,
  Col,
  Input,
  Button,
  Segmented,
} from "antd";
import {
  ManOutlined,
  WomanOutlined,
  HomeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { newArrivals, newArrivalDesc, carouselImages } from "../utils/data";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const Homepage = () => {
  const items = [
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
            <span className="logo-text">OutfitAura</span>
          </Col>
          <Col xs={14} sm={15} md={16} lg={17} align="left">
            <Menu
              id="homepage-menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={items}
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
        <Row type="flex">
          <Col span={24} align="center">
            <Col xs={24} sm={24} md={24} lg={24} align="center">
              <Carousel id="homepage-carousel" autoplay dotPosition={"bottom"}>
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
                              <p className="carousel-text">{carousel.title}</p>
                              <p className="carousel-text">{carousel.desc}</p>
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
                  },
                  {
                    label: "Outgoing Trends",
                    value: "outgoingTrends",
                  },
                  {
                    label: "Trending",
                    value: "trending",
                  },
                ]}
              />
            </Col>
          </Col>
        </Row>
        <Row gutter={[64, 64]} type="flex" className="mt-30">
          {newArrivals.map((image, index) => {
            return (
              <Col xs={24} sm={12} md={12} lg={6} align="middle">
                <Card hoverable cover={<Image alt="example" src={image} />}>
                  <Meta
                    title={`${newArrivalDesc[index].title}`}
                    description={"Rs." + `${newArrivalDesc[index].price}`}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
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
