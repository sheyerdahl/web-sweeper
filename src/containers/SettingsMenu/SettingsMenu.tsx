import ResetTest from '../../components/ResetTest/ResetTest';

function SettingsMenu(): JSX.Element {
    return (
            <div className="Main-content ml7">
                <p>
                    this is settings, yes
                </p>
                <div className='pattern-diagonal-stripes-md light-blue h2 w-100 o-30 mb4'></div>
                

                <ResetTest />

                <p className='o-50 no-select'>
                    Data automatically saves every second.
                </p>
            </div>
    )
}

export default SettingsMenu