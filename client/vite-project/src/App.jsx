import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdatePage from "./routes/UpdatePage";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";

function App() {
  return (
    <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
          <Route exact path="/restaurants/:id" element={<RestaurantDetailPage />} />
        </Routes>
    </div>
  )
}

export default App
