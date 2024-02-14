import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import RatingStars from "../components/RatingStars";

type StoreItemPropsType = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
};

export function StoreItem({
  id,
  title,
  price,
  image,
  description,
  rating,
}: StoreItemPropsType) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        style={{
          objectFit:"cover",
          maxHeight:"100%",
          width:"100%",
         
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-6">{title}</span>
          <span className="ms-2 text-muted fs-6">{formatCurrency(price)}</span>
        </Card.Title>
          <RatingStars {...rating} />
        <div className="mt-auto">

          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              Add to Cart
            </Button>
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart{" "}
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
