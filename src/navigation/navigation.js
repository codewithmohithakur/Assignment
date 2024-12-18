import { Route, Routes, BrowserRouter } from "react-router-dom";
import TableScreen from "../components/tableScreen";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="/" element={<TableScreen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Navigation;