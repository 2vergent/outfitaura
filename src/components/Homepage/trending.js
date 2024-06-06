import React from "react";
import { Card, Image, Row, Col } from "antd";
import { trendingImages, trendingDesc } from "../../utils/homepageCatalog";

const { Meta } = Card;

const Trending = () => {
  return (
    <Row gutter={[64, 64]} type="flex" className="mt-30">
      {trendingImages.map((image, index) => {
        return (
          <Col xs={24} sm={12} md={12} lg={6} align="middle">
            <Card hoverable cover={<Image alt="example" src={image} />}>
              <Meta
                title={`${trendingDesc[index].title}`}
                description={"Rs." + `${trendingDesc[index].price}`}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Trending;
