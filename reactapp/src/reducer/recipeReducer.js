const saveRecipe = (recipe = {}, action) => {
    console.log('saveRecipe reducer', action.recipe)
    
    if (action.type == 'saveRecipe') {
        return (action.recipe);
    }
    else {
        return (recipe);
    }
};

export default saveRecipe;