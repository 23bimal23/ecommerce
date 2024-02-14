import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
// import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import useFetch from "../hooks/useFetch";

type CartItemProps = {
  id: number;
  quantity: number;
};
function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const { data, isPending, error } = useFetch(
    "https://fakestoreapi.com/products"
  );
  const item = data?.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center justify-content-between">
      <img
        src={item.image}
        style={{
          width: "125px",
          height: "75px",
          objectFit: "cover",
        }}
        alt=""
      />
      <div className="d-flex flex-column">
        <div className="me-auto">
          <div>
            {item.title}
            {quantity > 1 && (
              <span
                className="text-muted"
                style={{
                  fontSize: "1rem",
                }}
              >
                x{quantity}
              </span>
            )}
          </div>
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

export default CartItem;
