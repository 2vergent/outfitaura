import "../assets/styles/homepage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, Image, Row, Col, Layout } from "antd";
import HeaderComponent from "./header";
import { getAllWomenProductsApi } from "../api/womenApi";
import { formatIndianNumber } from "../utils/common";

const { Meta } = Card;
const { Header, Content } = Layout;

const Women = () => {
  const navigate = useNavigate();
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    getAllWomenProductsApi().then((res) => {
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
            return (
              <Col xs={24} sm={12} md={12} lg={6} align="middle">
                <Card
                  hoverable
                  cover={
                    <Image
                      alt="example"
                      src={product.image_path}
                      preview={false}
                    />
                  }
                  onClick={() =>
                    navigate("/product", {
                      state: { product: product, menu: "3" },
                    })
                  }
                >
                  <Meta
                    title={product.product_name}
                    description={`₹${formatIndianNumber(product.price)}`}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Content>
    </Layout>
  );
};

export default Women;
