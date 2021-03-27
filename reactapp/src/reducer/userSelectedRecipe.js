const userRecipes = (state = [], action) => {
    console.log('saveRecipe reducer', action.recipe)
    
    if (action.type == 'saveRecipe') {
        return [
            ...state,
            action.recipe
        ];
    }
    else {
        return ;
    }
};

export default uesrReci;