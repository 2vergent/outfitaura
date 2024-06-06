import React, { useEffect, useState } from "react";
import { Card, Image, Row, Col } from "antd";
import { womenOutfitImages, womenOutfitDesc } from "../../utils/womenCatalog";
import { getAllWomenProductsApi } from "../../api/womenApi";

const { Meta } = Card;

const Women = () => {
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    getAllWomenProductsApi().then((res) => {
      console.log("womenProducts: ", res);
      setWomenProducts(res);
    });
  }, []);

  return (
    <Row gutter={[64, 64]} type="flex" className="mt-30">
      {womenProducts.map((product) => {
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

export default Women;
