import React, { useEffect, useState } from "react";
import { Card, Image, Row, Col } from "antd";
import { getAllMenProductsApi } from "../../api/menApi";

const { Meta } = Card;

const Men = () => {
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    getAllMenProductsApi().then((res) => {
      console.log("menProducts: ", res);
      setMenProducts(res);
    });
  }, []);

  return (
    <Row gutter={[64, 64]} type="flex" className="mt-30">
      {menProducts.map((product) => {
        const imagePath = require(`../../assets/images/${product.image_path}`);
        return (
          <Col xs={24} sm={12} md={12} lg={6} align="middle">
            <Card hoverable cover={<Image alt="example" src={imagePath} />}>
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

export default Men;
