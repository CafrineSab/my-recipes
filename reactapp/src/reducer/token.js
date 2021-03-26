export default function(token = '', action){
    console.log('reducer token:', token, 'action:', action)
    if(action.type == 'addToken'){
        return action.token
    } else {
        return token
    }
}