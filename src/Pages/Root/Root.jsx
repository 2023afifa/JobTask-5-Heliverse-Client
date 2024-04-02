import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="font-roboto">
            <Outlet></Outlet>
        </div>
    );
};

export default Root;