import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MapView } from "./components/MapView";

function App() {
    const router = createBrowserRouter([
        {
            path: "/:mapID",
            element: <MapView />
        }
    ]);
    
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;