import React from "react";
import { Card, Image, Row, Col } from "antd";
import { newArrivals, newArrivalDesc } from "../../utils/homepageCatalog";

const { Meta } = Card;

const NewArrivals = () => {
  return (
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
  );
};

export default NewArrivals;
