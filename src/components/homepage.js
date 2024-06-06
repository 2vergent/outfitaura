import React, { useEffect, useState } from "react";
import "../assets/styles/homepage.css";
import {
  Layout,
  Carousel,
  Image,
  Row,
  Col,
  Input,
  Button,
  Segmented,
  Divider,
} from "antd";
import { LoginOutlined, RiseOutlined } from "@ant-design/icons";
import { carouselImages } from "../utils/homepageCatalog";
import NewArrivals from "./newarrivals";
import Trending from "./trending";
import Men from "./men";
import Women from "./women";
import {
  getNewArrivalsProductsApi,
  getTrendingProductsApi,
} from "../api/homepageApi";
import HeaderComponent from "./header";

const { Header, Content, Footer } = Layout;

const Homepage = () => {
  const [menuState, setMenuState] = useState("home");
  const [segmentedTab, setSegmentedTab] = useState("newArrivals");
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchHomePageProducts = async () => {
      await getNewArrivalsProductsApi().then((res) => {
        console.log("newArrivalProducts: ", res);
        setNewArrivalProducts(res);
      });

      await getTrendingProductsApi().then((res) => {
        console.log("trendingRes: ", res);
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
              <NewArrivals newArrivalProducts={newArrivalProducts} />
            ) : (
              <Trending trendingProducts={trendingProducts} />
            )}
          </Col>
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
