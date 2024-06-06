import React from "react";
import { Card, Image, Row, Col } from "antd";
import { womenOutfitImages, womenOutfitDesc } from "../../utils/womenCatalog";

const { Meta } = Card;

const Women = () => {
  return (
    <Row gutter={[64, 64]} type="flex" className="mt-30">
      {womenOutfitImages.map((image, index) => {
        return (
          <Col xs={24} sm={12} md={12} lg={6} align="middle">
            <Card hoverable cover={<Image alt="example" src={image} />}>
              <Meta
                title={`${womenOutfitDesc[index].title}`}
                description={"Rs." + `${womenOutfitDesc[index].price}`}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Women;
