import { useReducer } from "react";
import { itemsInCart } from "./itemsInCart";
import "./styles.css";

export default function App() {
  const cart = {
    quantity: 0,
    totalAmount: 0,
    wishList: []
  };
  const reduceCart = (state, action) => {
    switch (action.type) {
      case "Add":
        return {
          ...state,
          quantity: state.quantity + 1,
          totalAmount: state.totalAmount + action.amount
        };
      case "Remove":
        return {
          ...state,
          quantity: state.quantity - 1,
          totalAmount: state.totalAmount - action.amount
        };
      case "RemoveAll":
        return {
          ...state,
          quantity: 0,
          totalAmount: 0
        };
      case "addWishlist":
        return { ...state, wishList: [...state.wishList, action.item] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reduceCart, cart);

  return (
    <div className="App">
      <h2>Total number of items in cart is {state.quantity}</h2>
      <h2>Total cart Value is {state.totalAmount}</h2>
      <h2>
        Total cart Value is{" "}
        {state.wishList.map((item) => {
          return <div>{item.name}</div>;
        })}
      </h2>

      {
        <div>
          {itemsInCart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <div>{item.price}</div>
              <button
                onClick={() => dispatch({ type: "Add", amount: item.price })}
              >
                Add to Cart
              </button>
              <button
                onClick={() => dispatch({ type: "Remove", amount: item.price })}
              >
                Remove from Cart
              </button>

              <button
                onClick={() => dispatch({ type: "addWishlist", item: item })}
              >
                Add to wishList
              </button>
            </div>
          ))}
          <button onClick={() => dispatch({ type: "RemoveAll" })}>
            Remove All items
          </button>
        </div>
      }
    </div>
  );
}
