import './Task.css';
import { useBrowser } from '../../context/browser-context';
import {Fragment, useEffect, useState } from 'react';
import {quotes} from "../../datab/quotes"

const index = Math.floor(Math.random() * quotes.length);
const quote = quotes[index].quote;

export const Task = () => {

    const {name, time, message, focus, browserDispatch} = useBrowser();

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const userFocus = localStorage.getItem("focus");
        browserDispatch({
            type: "FOCUS",
            payload: userFocus
        });
        if(new Date().getDate() !== Number(localStorage.getItem("date"))){
            localStorage.removeItem("focus");
            localStorage.removeItem("date");
            localStorage.removeItem("checkedStatus");
        }
    },[])

    useEffect(() => {
        getTime();
    }, [time])

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
    }

    const handleTodayFocus = (evt) => {
        if(evt.key === "Enter" && evt.target.value.length > 0){
            browserDispatch({
                type: "FOCUS",
                payload: evt.target.value
            })
            localStorage.setItem("focus", evt.target.value);
            localStorage.setItem("date", new Date().getDate());
        }
    }

    const handleFocusComplete = (evt) => {
        console.log(evt.target.checked);
        if (evt.target.checked){
            setIsChecked(!isChecked)
        }
        else {
            setIsChecked(!isChecked)
        }
        localStorage.setItem("checkedStatus", !isChecked);
    }

    const handleClearClick = () => {
        browserDispatch({
            type: "CLEAR"
        })
        setIsChecked(false);
        localStorage.removeItem("focus");
        localStorage.removeItem("checkedStatus");
    }

    const getTime = () => {
        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();

        const hour = hours < 10 ? `0${hours}` : hours;
        const minute = minutes < 10 ? `0${minutes}` : minutes;
        const second = seconds < 10 ? `0${seconds}` : seconds;
        
        const currentTime = `${hour}:${minute}:${second}`;
        setTimeout(getTime, 1000);
        
        browserDispatch({
            type: "TIME",
            payload: currentTime
        })

        browserDispatch({
            type: "MESSAGE",
            payload: hours
        })
    }

    return (
        <div className='task-container d-flex direction-column align-center relative'>
            <span className='time'>{time}</span>
            <span className='message'>{message}, {name}</span>
            {focus ? (
            <div className='user-task-container d-flex direction-column align-center gap-sm'>
            <span className='heading-2'>Today's Focus</span>
            <div className='d-flex align-center gap'>
                <label className={`${isChecked ? "strike-through" : ""} heading-3 d-flex align-center gap-sm cursor`}>
                    <input type="checkbox" className='check cursor' onChange={handleFocusComplete} checked={isChecked} />
                    {focus}
                </label>
                <button className='button cursor' onClick={handleClearClick}>
                <span className="material-symbols-outlined">
                    Clear
                </span>
                </button>
            </div>
        </div>)
        :(
            <Fragment>
                <span className='focus-question'>What's your main focus for Today?</span>
                <form onSubmit={handleFormSubmit}>
                    <input required type="text" className='input task-input' onKeyUp={handleTodayFocus} />
                </form>
            </Fragment>
        )}
            
        <div className='quote-container'>
            <span className='heading-3'>{quote}</span>    
        </div>    
        
            

        </div>
    )
}