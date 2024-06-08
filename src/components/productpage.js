import "../assets/styles/productPage.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  Image,
  Row,
  Col,
  Layout,
  Button,
  Rate,
  Divider,
  Descriptions,
} from "antd";
import {
  PlusSquareFilled,
  MinusSquareFilled,
  ShoppingCartOutlined,
  LeftCircleFilled,
  CarryOutTwoTone,
  SecurityScanTwoTone,
  InteractionTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import HeaderComponent from "./header";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import {
  addProductToCardApi,
  removeProductFromCardApi,
  incrementProductInCartApi,
  decrementProductInCartApi,
  getProductsFromCart,
} from "../api/cartApi";
import { formatIndianNumber } from "../utils/common";

const { Meta } = Card;
const { Header, Content } = Layout;

const ProductPage = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(UserAtom);
  let { state } = useLocation();
  const { product, menu } = state;
  const { product_description } = product;
  const [quantity, setQuantity] = useState(1);
  const [addedProductToCart, setAddedProductToCart] = useState(false);
  const [cartButtonLoader, setCartButtonLoader] = useState(false);
  const [incrementButtonLoader, setIncrementButtonLoader] = useState(false);
  const [decrementButtonLoader, setDecrementButtonLoader] = useState(false);

  useEffect(() => {
    console.log("product: ", product);
    getProductsFromCart(userData._id).then((productsInCart) => {
      productsInCart.map((cartProduct) => {
        if (cartProduct.product_id === product._id) {
          setQuantity(cartProduct.quantity);
          setAddedProductToCart(true);
        }
      });
    });
  }, []);

  const addToCart = async () => {
    await addProductToCardApi(product._id, userData._id, quantity).then(
      (res) => {
        if (res.product_id) {
          setCartButtonLoader(false);
          setAddedProductToCart(true);
        }
      }
    );
  };

  const removeFromCart = async () => {
    await removeProductFromCardApi(product._id, userData._id).then((res) => {
      if (res.success) {
        setCartButtonLoader(false);
        setAddedProductToCart(false);
      }
    });
  };

  const QuantityIndicator = () => {
    return (
      <div>
        <span style={{ fontSize: 20 }}>{quantity}</span>
      </div>
    );
  };

  const modifyQuantity = (action) => {
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
  };

  const product_spec_items = [
    {
      key: "1",
      label: "Material Composition",
      children: `${product_description.material_composition}`,
    },
    {
      key: "2",
      label: "Pattern",
      children: `${product_description.pattern}`,
    },
    {
      key: "3",
      label: "Fit Type",
      children: `${product_description.fit_type}`,
    },
    {
      key: "4",
      label: "Sleeve Type",
      children: `${product_description.sleeve_type}`,
    },
    {
      key: "5",
      label: "Collar Style",
      children: `${product_description.collar_style}`,
    },
    {
      key: "6",
      label: "Length",
      children: `${product_description.length}`,
    },
    {
      key: "7",
      label: "Wash Care",
      children: `${product_description.wash_care}`,
    },
    {
      key: "8",
      label: "Occasion",
      children: `${product_description.occasion}`,
    },
    {
      key: "9",
      label: "Country of Origin",
      children: `${product_description.country_of_origin}`,
    },
  ];

  const formatKey = (key) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <HeaderComponent selectedMenu={menu} />
      </Header>
      <Content className="homepage-content">
        <Row gutter={[64, 64]} type="flex" className="mt-30">
          <Col xs={24} sm={12} md={12} lg={6} align="middle">
            <Card
              hoverable
              cover={<Image alt="example" src={product.image_path} />}
              onClick={() =>
                navigate("/product", {
                  state: { product: product, menu: "1" },
                })
              }
              actions={[
                !decrementButtonLoader ? (
                  <MinusSquareFilled
                    style={
                      quantity === 1
                        ? { fontSize: 30, color: "#d9d9d9", cursor: "default" }
                        : { fontSize: 30 }
                    }
                    onClick={() => {
                      modifyQuantity("minus");
                      if (addedProductToCart && quantity > 1) {
                        setDecrementButtonLoader(true);
                        decrementProductInCartApi(
                          product._id,
                          userData._id
                        ).then((res) => {
                          console.log("decrementRes: ", res);
                          if (res.success) setDecrementButtonLoader(false);
                        });
                      }
                    }}
                  />
                ) : (
                  <LoadingOutlined style={{ fontSize: 25, marginTop: 3 }} />
                ),
                <QuantityIndicator />,
                !incrementButtonLoader ? (
                  <PlusSquareFilled
                    style={{ fontSize: 30 }}
                    onClick={() => {
                      modifyQuantity("plus");
                      if (addedProductToCart) {
                        setIncrementButtonLoader(true);
                        incrementProductInCartApi(
                          product._id,
                          userData._id
                        ).then((res) => {
                          console.log("incrementRes: ", res);
                          if (res.success) setIncrementButtonLoader(false);
                        });
                      }
                    }}
                  />
                ) : (
                  <LoadingOutlined style={{ fontSize: 25, marginTop: 3 }} />
                ),
              ]}
              className="product-card"
            >
              <Meta
                className="product-meta"
                title={
                  !addedProductToCart ? (
                    <Button
                      loading={cartButtonLoader}
                      icon={
                        <ShoppingCartOutlined
                          style={{
                            fontSize: 18,
                            marginRight: 5,
                          }}
                        />
                      }
                      onClick={() => {
                        setCartButtonLoader(true);
                        addToCart();
                      }}
                      type="primary"
                      className="cart-button"
                    >
                      <span style={{ fontWeight: 600 }}>Add to Cart</span>
                    </Button>
                  ) : (
                    <Button
                      loading={cartButtonLoader}
                      icon={
                        <ShoppingCartOutlined
                          style={{
                            fontSize: 18,
                            marginRight: 5,
                          }}
                        />
                      }
                      onClick={() => {
                        setCartButtonLoader(true);
                        removeFromCart();
                      }}
                      type="primary"
                      className="cart-button"
                    >
                      <span style={{ fontWeight: 600 }}>Remove from Cart</span>
                    </Button>
                  )
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={18} align="left">
            <Row gutter={[24, 0]} align="middle">
              <Col>
                <LeftCircleFilled
                  className="back-button"
                  onClick={() =>
                    navigate(
                      menu === "1" ? "/home" : menu === "2" ? "/men" : "/women"
                    )
                  }
                />
              </Col>
              <Col>
                <span className="product-name">{product.product_name}</span>
              </Col>
            </Row>
            <Row
              gutter={[12, 0]}
              className="mt-10 vertical-align"
              align="middle"
            >
              <Col>
                <span style={{ paddingLeft: 55, fontSize: 14 }}>
                  {product.rating}
                </span>
              </Col>
              <Col>
                <Rate disabled allowHalf defaultValue={product.rating} />
              </Col>
              <Col>
                <span>{`${formatIndianNumber(
                  product.rating_count
                )} ratings`}</span>
              </Col>
            </Row>
            <Divider />
            <Row
              style={{ padding: "0px 55px" }}
              gutter={[15, 5]}
              align="middle"
            >
              <Col>
                <span style={{ fontSize: 25, color: "#cc0c39" }}>
                  {`-${
                    100 -
                    Math.round((product.price / product.original_price) * 100)
                  }%`}
                </span>
              </Col>
              <Col>
                <span style={{ fontSize: 24, fontWeight: 600 }}>
                  ₹{product.price}
                </span>
              </Col>
              <Col>
                <span style={{ textDecoration: "line-through", fontSize: 13 }}>
                  ₹{product.original_price}
                </span>
              </Col>
              <Row>
                <Col span={24}>
                  <span style={{ fontSize: 13 }}>(Inclusive of all taxes)</span>
                </Col>
              </Row>
            </Row>
            <Row
              align="middle"
              gutter={[15, 5]}
              style={{ padding: "0px 55px" }}
              className="mt-20"
            >
              <Col>
                <CarryOutTwoTone style={{ fontSize: 25 }} />
              </Col>
              <Col>
                <span>2-Day Delivery</span>
              </Col>
              <Divider type="vertical" style={{ backgroundColor: "grey" }} />
              <Col>
                <SecurityScanTwoTone style={{ fontSize: 25 }} />
              </Col>
              <Col>
                <span>Verified Seller</span>
              </Col>
              <Divider type="vertical" style={{ backgroundColor: "grey" }} />
              <Col>
                <InteractionTwoTone style={{ fontSize: 25 }} />
              </Col>
              <Col>
                <span>10-Day Return Policy</span>
              </Col>
            </Row>
            <Row style={{ padding: "0px 55px" }} className="mt-20">
              <Col>
                <Descriptions
                  title={
                    <Divider orientation="left" orientationMargin="0">
                      <span style={{ fontWeight: 600 }}>
                        Product Specifications
                      </span>
                    </Divider>
                  }
                  layout="horizontal"
                  items={product_spec_items}
                  colon={false}
                  bordered
                />
              </Col>
            </Row>
            <Row
              style={{ padding: "0px 55px" }}
              gutter={[48, 0]}
              className="mt-20"
            >
              <Col span={12}>
                <Descriptions
                  className="about-product mt-5"
                  title={
                    <Divider orientation="left" orientationMargin="0">
                      <span style={{ fontWeight: 600 }}>About Product</span>
                    </Divider>
                  }
                  layout="vertical"
                  items={product_description.about_this_item.map(
                    (point, index) => ({
                      key: index,
                      span: 24,
                      children: `\u2022 ${point}`,
                    })
                  )}
                  colon={false}
                />
              </Col>
              <Col span={12}>
                <Descriptions
                  className="about-product mt-5"
                  title={
                    <Divider orientation="left" orientationMargin="0">
                      <span style={{ fontWeight: 600 }}>
                        Additional Information
                      </span>
                    </Divider>
                  }
                  layout="vertical"
                  items={Object.entries(
                    product_description.additional_information
                  ).map((point, index) => ({
                    key: index,
                    span: 24,
                    children: `\u2022 ${formatKey(point[0])} : ${point[1]}`,
                  }))}
                  colon={false}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductPage;
