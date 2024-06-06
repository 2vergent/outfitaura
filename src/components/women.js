import "../assets/styles/homepage.css";
import React, { useEffect, useState } from "react";
import { Card, Image, Row, Col, Layout } from "antd";
import HeaderComponent from "./header";
import { getAllWomenProductsApi } from "../api/womenApi";
import { useNavigate } from "react-router";

const { Meta } = Card;
const { Header, Content, Footer } = Layout;

const Women = () => {
  const navigate = useNavigate();
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    getAllWomenProductsApi().then((res) => {
      console.log("womenProducts: ", res);
      setWomenProducts(res);
    });
  }, []);

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <HeaderComponent selectedMenu={"3"} />
      </Header>
      <Content className="homepage-content">
        <Row gutter={[64, 64]} type="flex" className="mt-30">
          {womenProducts.map((product) => {
            const imagePath = require(`../assets/images/${product.image_path}`);
            return (
              <Col xs={24} sm={12} md={12} lg={6} align="middle">
                <Card
                  hoverable
                  cover={<Image alt="example" src={imagePath} />}
                  onClick={() => navigate("/product")}
                >
                  <Meta
                    title={product.product_name}
                    description={"Rs." + `${product.price}`}
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

export default Women;
