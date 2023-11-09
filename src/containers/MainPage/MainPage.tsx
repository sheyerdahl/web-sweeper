import { useState } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import GameMenu from '../GameMenu/GameMenu';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import InfoMenu from '../InfoMenu/InfoMenu';

function MainPage(): JSX.Element {
    const [ route, setRoute ]: [RouteTypes, React.Dispatch<React.SetStateAction<RouteTypes>>] = useState<RouteTypes>("InfoMenu")
    
    function handleRouteChange(newRoute: RouteTypes): void {
        setRoute(newRoute)
    }

    let selectedMenu: JSX.Element

    // Routing logic needs to be redone, current implementation isn't DRY
    switch (route) {
        case "GameMenu":
            selectedMenu = <GameMenu />
            break
        case "SettingsMenu":
            selectedMenu = <SettingsMenu />
            break
        case "InfoMenu":
            selectedMenu = <InfoMenu />
            break
    }



    return (
        <div className="MainPage">
            <SideBar handleRouteChange={handleRouteChange}/>
            {selectedMenu}
        </div>
    )
}

export default MainPage

export type RouteTypes =  "GameMenu" | "SettingsMenu" | "InfoMenu"