import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Card, Image, Row, Col, Layout, Button } from "antd";
import HeaderComponent from "./header";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import { addProductToCardApi } from "../api/cartApi";

const { Header, Content, Footer } = Layout;

const ProductPage = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(UserAtom);
  let { state } = useLocation();
  const { product, menu } = state;

  console.log("userData: ", userData);
  console.log("product: ", product);

  const updateCart = async () => {
    await addProductToCardApi(product._id, userData._id).then((res) => {
      console.log("newCart: ", res);
    });
  };

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <HeaderComponent selectedMenu={menu} />
      </Header>
      <Content className="homepage-content">
        <Row>
          <Col span={24} align="center">
            <Button type="primary" onClick={updateCart}>
              Add to cart
            </Button>
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

export default ProductPage;
