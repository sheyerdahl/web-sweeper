import { RouteTypes } from '../../containers/MainPage/MainPage'
import { clickSoundPromise } from "../../AudioManager";

interface SideBarButtonProps {
  text: string
  handleRouteChange?: (newRoute: RouteTypes) => void
  route?: RouteTypes
  extraClasses?: string
}

function SideBarButton({ text, handleRouteChange, route, extraClasses }: SideBarButtonProps): JSX.Element {
    function handleClick() {
      clickSoundPromise.then((clickSound: Howl): void => {
        clickSound.play();
      })

      if (handleRouteChange !== undefined && route !== undefined) {
        handleRouteChange(route)
      }
    }

    return (
        <button className={"pointer hvr-grow mt3 w4 h3 f3 br3 white " + extraClasses} onClick={() => handleClick()} >
          {text}
        </button>
    );
  }
  
export default SideBarButton;