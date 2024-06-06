import React, { useState } from "react";
import { Card, Image, Row, Col, Layout } from "antd";
import HeaderComponent from "./header";

const { Header, Content, Footer } = Layout;

const ProductPage = () => {
  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <HeaderComponent selectedMenu={"2"} />
      </Header>
      <Content className="homepage-content">
        <h1>Product</h1>
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
