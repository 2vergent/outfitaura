import React, { useEffect, useState } from "react";
import "../assets/styles/homepage.css";
import { Layout, Carousel, Image, Row, Col, Button, Segmented } from "antd";
import { LoginOutlined, RiseOutlined } from "@ant-design/icons";
import NewArrivals from "./newarrivals";
import Trending from "./trending";
import {
  getNewArrivalsProductsApi,
  getTrendingProductsApi,
} from "../api/homepageApi";
import HeaderComponent from "./header";

const { Header, Content } = Layout;

const carouselImages = [
  {
    image:
      "https://ucarecdn.com/54a94445-952b-428d-a75e-9d804e7de21c/banner1.jpg",
    title: "Classic Cotton Comfort Shirt",
    desc: "Classic comfort meets timeless style in our cotton shirt. Perfect for any occasion, it effortlessly blends sophistication with ease.",
  },
  {
    image:
      "https://ucarecdn.com/f92e0c57-134f-4dab-af23-e02eb8f46306/banner2.jpg",
    title: "Urban Denim Casual",
    desc: "Rugged denim meets urban coolness in this casual shirt. Versatile and stylish, it's your go-to for laid-back sophistication.",
  },
  {
    image:
      "https://ucarecdn.com/962dce6f-0431-4b13-85b3-aece3300cf9a/banner3.jpg",
    title: "Elegant Linen Blend",
    desc: "Stay cool and elegant with our linen blend shirt. Ideal for warm days, it effortlessly combines comfort and sophistication.",
  },
  {
    image:
      "https://ucarecdn.com/61a3510f-a31e-4e04-9c72-4e5d4cb375ac/banner4.jpg",
    title: "Bold Striped Statement",
    desc: "Make a statement with bold stripes. This modern-fit shirt is for those who love standing out with confidence and style.",
  },
];

const Homepage = () => {
  const [segmentedTab, setSegmentedTab] = useState("newArrivals");
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchHomePageProducts = async () => {
      await getNewArrivalsProductsApi().then((res) => {
        setNewArrivalProducts(res);
      });

      await getTrendingProductsApi().then((res) => {
        setTrendingProducts(res);
      });
    };
    fetchHomePageProducts();
  }, []);

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <HeaderComponent selectedMenu={"1"} />
      </Header>
      <Content className="homepage-content">
        <Row type="flex">
          <Col span={24} align="center">
            <Col xs={24} sm={24} md={24} lg={24} align="center">
              <Carousel id="homepage-carousel" autoplay dotPosition={"bottom"}>
                {carouselImages.map((carousel) => (
                  <div key={carousel.image}>
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
              <NewArrivals newArrivalProducts={newArrivalProducts} />
            ) : (
              <Trending trendingProducts={trendingProducts} />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Homepage;
