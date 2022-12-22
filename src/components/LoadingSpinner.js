import "./LoadingSpinner.css";

export const LoadingSpinner = (props) => {
    return (
        <div className="loading-wrapper">
            <div className="loading" style={{
                    "width": props.size,
                    "height": props.size,
                    "borderWidth": props.size*.2
                }} />
        </div>
    );
};