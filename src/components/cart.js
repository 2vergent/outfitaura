import "../assets/styles/cart.css";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Image,
  Row,
  Col,
  Layout,
  Button,
  List,
  Descriptions,
  Divider,
  Empty,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  MinusSquareFilled,
  PlusSquareFilled,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import HeaderComponent from "./header";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import {
  cartCheckoutApi,
  getProductsFromCart,
  incrementProductInCartApi,
  decrementProductInCartApi,
  removeProductFromCardApi,
  removeAllProductsFromCartApi,
} from "../api/cartApi";
import { formatIndianNumber } from "../utils/common";
import { loadStripe } from "@stripe/stripe-js";

const { Meta } = Card;
const { Header, Content } = Layout;
const stripePromise = loadStripe(
  "pk_test_51POzAHP79mk75VTaInNVVuaeIV0IKUFurmd1Ha4GiyqkMNezNWC6lFr6BO2BvwWF9jOiw12hDx7del2V6wsfLVG3009XaXita4"
);

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const userData = useRecoilValue(UserAtom);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [orderButtonLoader, setOrderButtonLoader] = useState(false);

  useEffect(() => {
    const getCartItems = async () => {
      await getProductsFromCart(userData._id).then((res) => {
        console.log("Cart: ", res);
        setCartItems(res.reverse());
        let total = 0;
        let totalDiscount = 0;
        let quantity = 0;
        res.map((product) => {
          quantity += product.quantity;
          total += product.productDetail.original_price * product.quantity;
          totalDiscount +=
            (product.productDetail.original_price -
              product.productDetail.price) *
            product.quantity;
        });
        setTotalQuantity(quantity);
        setSubTotal(total);
        setTotalDiscount(totalDiscount);
      });
    };
    getCartItems();
  }, []);

  const paymentSuccess = () => {
    if (modalRef.current) {
      modalRef.current.destroy();
    }
    modalRef.current = Modal.success({
      className: "payment-modal",
      centered: true,
      autoFocusButton: null,
      title: "Your payment was successful",
      ookText: <span style={{ fontWeight: 600 }}>Ok</span>,
      okButtonProps: {
        type: "primary",
        style: { borderRadius: 20, width: 120 },
      },
      onOk() {
        navigate("/cart", { replace: true });
      },
    });
  };

  const paymentFailed = () => {
    if (modalRef.current) {
      modalRef.current.destroy();
    }
    modalRef.current = Modal.error({
      className: "payment-modal",
      centered: true,
      autoFocusButton: null,
      title: "Your payment failed or was cancelled",
      okText: <span style={{ fontWeight: 600 }}>Ok</span>,
      okButtonProps: {
        type: "primary",
        style: { borderRadius: 20, width: 120 },
      },
      onOk() {
        navigate("/cart", { replace: true });
      },
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get("payment");

    if (paymentStatus === "success") {
      removeAllProductsFromCartApi(userData._id).then((res) => {
        if (res.success) {
          setCartItems([]);
          paymentSuccess();
        }
      });
    } else if (paymentStatus === "failed") {
      paymentFailed();
    }
  }, [location]);

  const handleCheckout = async () => {
    const session = await cartCheckoutApi(cartItems);
    const stripe = await stripePromise;

    const checkoutResult = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log("checkoutResult: ", checkoutResult);
    if (checkoutResult.error) {
      console.error(checkoutResult.error.message);
    } else {
      setOrderButtonLoader(true);
    }
  };

  const subtotal_spec_items = [
    {
      key: "1",
      label: "To Pay",
      children: (
        <span
          style={{ color: "#03a685", fontWeight: 600 }}
        >{`₹${formatIndianNumber(subTotal - totalDiscount)}`}</span>
      ),
      span: 24,
    },
    {
      key: "2",
      label: "Total Quantity",
      children: <span style={{ fontWeight: 600 }}>{`${totalQuantity}`}</span>,
      span: 24,
    },
  ];

  const price_spec_items = [
    {
      key: "1",
      label: "Total M.R.P",
      children: (
        <span style={{ fontWeight: 600 }}>{`₹${formatIndianNumber(
          subTotal
        )}`}</span>
      ),
      span: 24,
    },
    {
      key: "2",
      label: "Total Discount",
      children: (
        <span style={{ fontWeight: 600 }}>{`₹${formatIndianNumber(
          totalDiscount
        )}`}</span>
      ),
      span: 24,
    },
    {
      key: "3",
      label: "Platform Fee",
      children: (
        <span style={{ color: "#03a685", fontWeight: 600 }}>{`FREE`}</span>
      ),
      span: 24,
    },
    {
      key: "4",
      label: "Shipping Fee",
      children: (
        <span style={{ color: "#03a685", fontWeight: 600 }}>{`FREE`}</span>
      ),
      span: 24,
    },
  ];

  const modifyQuantity = async (product, action) => {
    const productIndex = cartItems.findIndex(
      (cartProduct) => cartProduct.product_id === product.product_id
    );
    const selectedProduct = { ...cartItems[productIndex] };
    if (action === "plus") {
      await incrementProductInCartApi(product.product_id, product.user_id).then(
        (res) => {
          if (res.success) {
            if (productIndex !== -1) {
              selectedProduct.quantity += 1;
              const updatedCartItems = [
                ...cartItems.slice(0, productIndex),
                selectedProduct,
                ...cartItems.slice(productIndex + 1),
              ];
              console.log("selectedProduct: ", selectedProduct);
              setSubTotal(
                subTotal + selectedProduct.productDetail.original_price
              );
              setTotalDiscount(
                totalDiscount +
                  (product.productDetail.original_price -
                    product.productDetail.price)
              );
              setTotalQuantity(totalQuantity + 1);
              setCartItems(updatedCartItems);
              console.log("updatedCartItems: ", updatedCartItems);
            }
          }
        }
      );
    } else if (action === "minus") {
      await decrementProductInCartApi(product.product_id, product.user_id).then(
        (res) => {
          if (res.success) {
            if (productIndex !== -1) {
              selectedProduct.quantity -= 1;
              const updatedCartItems = [
                ...cartItems.slice(0, productIndex),
                selectedProduct,
                ...cartItems.slice(productIndex + 1),
              ];
              console.log("selectedProduct: ", selectedProduct);
              setSubTotal(
                subTotal - selectedProduct.productDetail.original_price
              );
              setTotalDiscount(
                totalDiscount -
                  (product.productDetail.original_price -
                    product.productDetail.price)
              );
              setTotalQuantity(totalQuantity - 1);
              setCartItems(updatedCartItems);
              console.log("updatedCartItems: ", updatedCartItems);
            }
          }
        }
      );
    }
  };

  const removeProductFromCart = async (product) => {
    await removeProductFromCardApi(product.product_id, userData._id);
    const productIndex = cartItems.findIndex(
      (cartProduct) => cartProduct.product_id === product.product_id
    );
    if (productIndex !== -1) {
      const updatedCartItems = [
        ...cartItems.slice(0, productIndex),
        ...cartItems.slice(productIndex + 1),
      ];
      setSubTotal(subTotal - product.productDetail.original_price);
      setTotalDiscount(
        totalDiscount -
          (product.productDetail.original_price - product.productDetail.price)
      );
      setTotalQuantity(totalQuantity - 1);
      setCartItems(updatedCartItems);
    }
  };

  return (
    <Layout id="homepage-layout">
      <Header className="header">
        <HeaderComponent selectedMenu={"0"} />
      </Header>
      <Content className="homepage-content">
        <Row gutter={[12, 0]}>
          <Col span={cartItems.length !== 0 ? 17 : 24}>
            <List
              locale={{
                emptyText: (
                  <Empty
                    style={{ height: "calc(100vh - 202px)" }}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span style={{ fontWeight: 600, fontSize: 16 }}>
                        Your cart is empty
                      </span>
                    }
                  />
                ),
              }}
              itemLayout="horizontal"
              bordered
              size="small"
              dataSource={cartItems}
              renderItem={(product) => {
                return (
                  <List.Item>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      style={{ marginRight: 15 }}
                      onClick={() => removeProductFromCart(product)}
                    />
                    <List.Item.Meta
                      style={{ textAlign: "left" }}
                      avatar={
                        <Image
                          rootClassName="cart-image"
                          src={product.productDetail.image_path}
                          height={200}
                          width={160}
                          style={{ borderRadius: 10 }}
                        />
                      }
                      title={
                        <span style={{ fontSize: 15 }}>
                          {product.productDetail.product_name}
                        </span>
                      }
                      description={
                        <Row gutter={[0, 26]} align="middle">
                          <Col span={24}>
                            <span style={{ fontSize: 13 }}>{`from ${
                              product.productDetail.product_type
                                .charAt(0)
                                .toUpperCase() +
                              product.productDetail.product_type.slice(1)
                            }'s section`}</span>
                          </Col>
                          <Col span={12}>
                            <span
                              style={{
                                fontWeight: 600,
                                fontSize: 25,
                              }}
                            >{`₹${formatIndianNumber(
                              product.productDetail.price
                            )}`}</span>
                          </Col>
                          <Col span={12} align="right">
                            <span
                              style={{
                                fontWeight: 600,
                                fontSize: 20,
                                color: "black",
                                paddingRight: 20,
                              }}
                            >{`₹${formatIndianNumber(
                              product.productDetail.price * product.quantity
                            )}`}</span>
                          </Col>
                          <Col span={24}>
                            <Row className="mb-10">
                              <Col>
                                <span style={{ fontSize: 13 }}>Quantity</span>
                              </Col>
                            </Row>
                            <Row align="middle" gutter={[12, 0]}>
                              <Col>
                                <MinusSquareFilled
                                  className={
                                    product.quantity === 1
                                      ? "cart-minus-disabled"
                                      : "cart-minus"
                                  }
                                  onClick={() => {
                                    if (product.quantity > 1)
                                      modifyQuantity(product, "minus");
                                  }}
                                />
                                <Divider
                                  type="vertical"
                                  style={{ marginTop: -7 }}
                                />
                              </Col>
                              <Col span={1}>
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    fontSize: 18,
                                    fontWeight: 600,
                                  }}
                                >
                                  {product.quantity}
                                </span>
                              </Col>
                              <Col>
                                <Divider
                                  type="vertical"
                                  style={{ marginTop: -7 }}
                                />
                                <PlusSquareFilled
                                  className="cart-plus"
                                  onClick={() =>
                                    modifyQuantity(product, "plus")
                                  }
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Col>
          {cartItems.length !== 0 && (
            <Col span={7}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: 8,
                  padding: "8px 15px",
                }}
              >
                <Row gutter={[0, 24]}>
                  <Col span={24}>
                    <Row>
                      <Col span={24}>
                        <Descriptions
                          title={
                            <Divider
                              orientation="left"
                              orientationMargin="0"
                              className="cart-divider"
                            >
                              <span style={{ fontWeight: 600 }}>Subtotal</span>
                            </Divider>
                          }
                          layout="horizontal"
                          items={subtotal_spec_items}
                          colon={false}
                          bordered
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Descriptions
                      title={
                        <Divider
                          orientation="left"
                          orientationMargin="0"
                          className="cart-divider"
                        >
                          <span style={{ fontWeight: 600 }}>Price Details</span>
                        </Divider>
                      }
                      layout="horizontal"
                      items={price_spec_items}
                      colon={false}
                      bordered
                    />
                  </Col>
                  <Col span={24}>
                    <Button
                      loading={orderButtonLoader}
                      type="primary"
                      icon={<CheckCircleTwoTone style={{ fontSize: 20 }} />}
                      className="cart-order-btn"
                      onClick={() => {
                        setOrderButtonLoader(true);
                        handleCheckout();
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>Place Order</span>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default Cart;
