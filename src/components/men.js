import "../assets/styles/homepage.css";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { Card, Image, Row, Col, Layout } from "antd";
import HeaderComponent from "./header";
import { getAllMenProductsApi } from "../api/menApi";

const { Meta } = Card;
const { Header, Content, Footer } = Layout;

const Men = () => {
  const navigate = useNavigate();
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    getAllMenProductsApi().then((res) => {
      setMenProducts(res);
    });
  }, []);

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <HeaderComponent selectedMenu={"2"} />
      </Header>
      <Content className="homepage-content">
        <Row gutter={[64, 64]} type="flex" className="mt-30">
          {menProducts.map((product) => {
            return (
              <Col xs={24} sm={12} md={12} lg={6} align="middle">
                <Card
                  hoverable
                  cover={<Image alt="example" src={product.image_path} />}
                  onClick={() =>
                    navigate("/product", {
                      state: { product: product, menu: "2" },
                    })
                  }
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

export default Men;
