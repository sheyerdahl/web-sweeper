import { RouteTypes } from '../../containers/MainPage/MainPage'
import SideBarButton from "./SideBarButton";
import "./SideBar.css"

interface ISideBarProps {
  handleRouteChange: (newRoute: RouteTypes) => void
}

function SideBar({ handleRouteChange }: ISideBarProps): JSX.Element {
    return (
        <div className="side-bar bg-blue absolute top-0 left-0 h-100 w5">
          <p className="white f2 b">
            Web-sweeper
          </p>

          <ul className="list pl0">
            <li>
              <SideBarButton text="Game" handleRouteChange={handleRouteChange} route="GameMenu" extraClasses='bg-green'/>
            </li>
            <li>
              <SideBarButton text="Info" handleRouteChange={handleRouteChange} route="InfoMenu" extraClasses='bg-blue'/>
            </li>
            <li>
              <SideBarButton text="Settings" handleRouteChange={handleRouteChange} route="SettingsMenu" extraClasses='bg-dark-gray'/>
            </li>
            <li>
              
            </li>
          </ul>
          
          
        </div>
    );
  }
  
export default SideBar;