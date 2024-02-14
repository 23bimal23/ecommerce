import { Row, Col } from "react-bootstrap";
// import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem";
import useFetch from "../hooks/useFetch";

type QueryType = {
  data: data[];
  isPending: string;
  error: string;
};
type data = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating:{
    count: number,
    rate:number
  }
};


export default function Store() {
  const { data, isPending, error }: QueryType = useFetch(
    "https://fakestoreapi.com/products"
  );
  console.log(data, isPending, error);
  return (
    <>
      <h1>Store</h1>
      <Row md={20} xs={1} lg={3} className="g-3">
        {error && <div className="error"> Error while Fetching Data </div>}
        {isPending && <div className="loading-state"> Loading .....</div>}
        {data &&
          data.map((item) => (
          <Col key={item.id}>
           <StoreItem {...item} />
          </Col>
          ))}

       
      </Row>
    </>
  );
}
