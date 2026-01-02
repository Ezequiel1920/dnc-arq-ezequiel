import './LoadingSpinner.css'
import LoadingSpinnerGif from '../../assets/LoadingSpinner.gif'

function LoadingSpinner() {
    return (
        <div className="d-flex al-center jc-center loading-overlay-container">
            <img src={LoadingSpinnerGif} alt='Loading' height="80px" />
        </div>
    )
}

export default LoadingSpinner