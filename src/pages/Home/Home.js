import "./Home.css"
import { useBrowser } from "../../context/browser-context"

export const Home = () => {

    const {name, browserDispatch} = useBrowser();
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
    }

    const handleNameChange = (evt) => {
        if(evt.key === "Enter" && evt.target.value.length > 0){
            browserDispatch({
                type: "NAME",
                payload: evt.target.value
            })
            localStorage.setItem("name", evt.target.value);
        }
    }

    return (
        <div className="home-container d-flex direction-column align-center gap-lg">
            <h1 className="main-heading">Browser Extension</h1>
            <div className="user-details d-flex direction-column gap">
                <span className="heading-1">Hello, What's your name?</span>
                <form onSubmit={handleFormSubmit}>
                    <input required className="input" type="text" onKeyUp={handleNameChange} />
                </form>
            </div>
        </div>
    )
}