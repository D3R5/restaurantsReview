import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdatePage from "./routes/UpdatePage";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantsContextProvider>
    <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
          <Route exact path="/restaurants/:id" element={<RestaurantDetailPage />} />
        </Routes>
    </div>
    </RestaurantsContextProvider>
  )
}

export default App
