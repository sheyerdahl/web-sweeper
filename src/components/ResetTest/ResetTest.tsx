import { resetData } from '../../utilities/DataUtilities';


function ResetTest(): JSX.Element {
    return (
        <button aria-label="warning, resets your data!" data-balloon-pos="up" className="pointer" onClick={() => {
          resetData()
        }}>
          reset yer data!
        </button>
    );
  }
  
export default ResetTest;