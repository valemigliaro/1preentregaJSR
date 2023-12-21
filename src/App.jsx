import React from 'react';
import { NavBar } from "./components/NavBar/NavBar"
import { Cart } from "./components/Cart/Cart"
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer"
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartContextProvider } from "./context/CartContext";
import Order from "./components/Order/Order";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'; 

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CartContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:category" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmar-compra" element={<Order />} />
          </Routes>
        </CartContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;