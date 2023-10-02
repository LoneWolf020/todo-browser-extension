import "./Home.css"
import { useBrowser } from "../../context/browser-context"

export const Home = () => {

    const {browserDispatch} = useBrowser();
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
        <div className="home-container">
            <h1 className="main-heading">Browser Extension</h1>
            <div className="user-details">
                <span className="heading-1">Hello, What's your name?</span>
                <form onSubmit={handleFormSubmit}>
                    <input required className="input" type="text" onKeyUp={handleNameChange} />
                </form>
            </div>
        </div>
    )
}