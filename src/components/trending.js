import React from "react";
import { useNavigate } from "react-router";
import { Card, Image, Row, Col } from "antd";

const { Meta } = Card;

const Trending = ({ trendingProducts }) => {
  const navigate = useNavigate();

  return (
    <Row gutter={[64, 64]} type="flex" className="mt-30">
      {trendingProducts.map((product) => {
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
  );
};

export default Trending;
