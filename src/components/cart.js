import "../assets/styles/homepage.css";
import React, { useEffect, useState } from "react";
import { Card, Image, Row, Col, Layout, Button, List } from "antd";
import HeaderComponent from "./header";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import { cartCheckoutApi, getProductsFromCart } from "../api/cartApi";
import { loadStripe } from "@stripe/stripe-js";

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const stripePromise = loadStripe(
  "pk_test_51POzAHP79mk75VTaInNVVuaeIV0IKUFurmd1Ha4GiyqkMNezNWC6lFr6BO2BvwWF9jOiw12hDx7del2V6wsfLVG3009XaXita4"
);

const Cart = () => {
  const userData = useRecoilValue(UserAtom);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      await getProductsFromCart(userData._id).then((res) => {
        console.log("Cart: ", res);
        setCartItems(res);
      });
    };
    getCartItems();
  }, []);

  const handleCheckout = async () => {
    const session = await cartCheckoutApi(cartItems);
    const stripe = await stripePromise;

    const checkoutResult = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (checkoutResult.error) console.error(checkoutResult.error.message);
  };

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <HeaderComponent selectedMenu={"0"} />
      </Header>
      <Content className="homepage-content">
        <Row>
          <Col span={12} align="right">
            <h1>Cart</h1>
          </Col>
          <Col span={12} align="right">
            <Button type="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              bordered
              size="small"
              dataSource={cartItems}
              renderItem={(product) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      style={{ textAlign: "left" }}
                      avatar={
                        <Image
                          preview={false}
                          src={product.productDetail.image_path}
                          height={120}
                        />
                      }
                      title={<span>{product.productDetail.product_name}</span>}
                      description={
                        <Row gutter={[0, 12]}>
                          <Col span={24}>
                            <span>{`Rs. ${product.productDetail.price}`}</span>
                          </Col>
                        </Row>
                      }
                    />
                  </List.Item>
                );
              }}
            />
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

export default Cart;
