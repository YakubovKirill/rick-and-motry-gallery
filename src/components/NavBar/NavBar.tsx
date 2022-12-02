import { memo } from "react";
import { Link } from "react-router-dom";

interface INavBarProps {
    message: string,
}
  
const NavBar = ({ message }: INavBarProps) => {
    return (
      <div className="nav-bar f-c">
        <div className="m-w-1200 f-c">
          <Link to="/"><h1>{ message }</h1></Link>
        </div>
      </div>
    );
}

export default memo(NavBar);