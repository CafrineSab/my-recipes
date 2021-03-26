export default function(connexion = "false", action) {
    console.log('ds le reduceur action.connexion :', connexion )
    if (action.type == 'addConnexion') {
        var userConnected = action.connexion;
        return userConnected;
    } else {
        return connexion;
    }
}