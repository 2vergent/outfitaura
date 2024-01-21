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
} from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import mock1 from "../assets/images/mock1.jpg";
import mock2 from "../assets/images/mock2.jpg";
import mock3 from "../assets/images/mock3.jpg";
import mock4 from "../assets/images/mock4.jpg";
import mock5 from "../assets/images/mock5.jpg";
import mock6 from "../assets/images/mock6.jpg";
import mock7 from "../assets/images/mock7.jpg";
import mock8 from "../assets/images/mock8.jpg";
import banner1 from "../assets/images/banner1.jpg";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const Homepage = () => {
  const [bannerHover, setBannerHover] = useState(false);

  const items = [
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

  const newArrivals = [mock1, mock2, mock3, mock4, mock5, mock6, mock7, mock8];
  const newArrivalDesc = [
    { title: "Europe Street Beat", price: 1000 },
    { title: "Asia Street Beat", price: 2000 },
    { title: "America Street Beat", price: 3000 },
    { title: "Africa Street Beat", price: 4000 },
    { title: "Australia Street Beat", price: 5000 },
    { title: "India Street Beat", price: 6000 },
    { title: "Russia Street Beat", price: 7000 },
    { title: "Antartica Street Beat", price: 8000 },
  ];
  const carouselImages = [
    {
      image: banner1,
      title: "Classic Cotton Comfort Shirt",
      desc: "Classic comfort meets timeless style in our cotton shirt. Perfect for any occasion, it effortlessly blends sophistication with ease.",
    },
    {
      image: banner2,
      title: "Urban Denim Casual",
      desc: "Rugged denim meets urban coolness in this casual shirt. Versatile and stylish, it's your go-to for laid-back sophistication.",
    },
    {
      image: banner3,
      title: "Elegant Linen Blend",
      desc: "Stay cool and elegant with our linen blend shirt. Ideal for warm days, it effortlessly combines comfort and sophistication.",
    },
    {
      image: banner4,
      title: "Bold Striped Statement",
      desc: "Make a statement with bold stripes. This modern-fit shirt is for those who love standing out with confidence and style.",
    },
  ];

  useEffect(() => {
    console.log("BanneHover: ", bannerHover);
  }, [bannerHover]);

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <Row type="flex">
          <Col span={3} align="left">
            <span className="logo-text">OutfitAura</span>
          </Col>
          <Col span={5} align="left">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={items}
            />
          </Col>
          <Col span={16}>
            <Input placeholder="Search"></Input>
          </Col>
        </Row>
      </Header>
      <Content className="homepage-content">
        <Row type="flex">
          <Col span={12} align="left">
            <Row>
              <Col>
                <span className="home-intro-text">OutfitAura,</span>
                <br />
                <span className="home-intro-desc">
                  Where style meets simplicity! Discover curated fashion that
                  effortlessly blends comfort and chic. Embrace the ease of
                  cool, everyday looks. Your wardrobe upgrade starts here!
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12} align="right">
            <Carousel waitForAnimate dotPosition={"left"}>
              {carouselImages.map((carousel, index) => (
                <div>
                  <h3 className="carousel-wrapper-main">
                    <div
                      className="carousel-wrapper"
                      onMouseOver={() => setBannerHover(true)}
                      onMouseLeave={() => setBannerHover(false)}
                    >
                      <Image
                        src={carousel.image}
                        preview={false}
                        height={370}
                        style={{ borderRadius: 20 }}
                        className="carousel-image"
                      />
                      <div className="carousel-image-desc">
                        <Row>
                          <Col span={24} align="middle">
                            <p className="carousel-text">{carousel.title}</p>
                            <p className="carousel-text">{carousel.desc}</p>
                          </Col>
                          <Col span={2} offset={6}>
                            <Button>Buy Now</Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </h3>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
        <div className="new-arrival-text">
          <p>New Arrivals</p>
        </div>
        <Row gutter={[0, 64]} type="flex">
          {newArrivals.map((image, index) => {
            return (
              <Col span={6} align="middle">
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<Image alt="example" src={image} />}
                >
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
