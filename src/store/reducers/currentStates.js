export default function currentStates(state="",action){
    switch (action.type) {
        case "CURRENT_STATES":
            return action.data;
    }
    return state;
}