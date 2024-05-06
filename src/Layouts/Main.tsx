import { Outlet } from "react-router-dom";

function Main() {
    return (
        <div className="max-w-8xl">
            <Outlet />
        </div>
    );
}

export default Main;
