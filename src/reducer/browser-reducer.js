export const browserReducer = (state, {type, payload}) => {
    switch (type){
        case "NAME":
            return {
                ...state,
                name: payload
            }
        case "TIME" :
            return {
                ...state,
                time: payload
            }
        case "FOCUS" :
            return {
                ...state,
                focus: payload
            }
        case "MESSAGE" :
            return {
                ...state,
                message: payload > 0 && payload < 12 ? "Good Morning" : payload >= 12 && payload <= 16 ? "Good Afternoon" : "Good Evening"
            }   
        case "CLEAR" :
            return {
                ...state,
                focus: null
            }             
        default:
            return state
    }
}