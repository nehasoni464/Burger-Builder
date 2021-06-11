import * as actionType from './action';

const initialState={
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
     tprice:4
};
const ingredient_p = {
    salad: 2,
    cheese: 5,
    meat: 1,
    bacon: 2
}


const reducer =(state=initialState, action )=>{
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                
                },
                tprice:state.tprice+ingredient_p[action.ingredientName]
            }
            case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                tprice: state.tprice-ingredient_p[action.ingredientName]
            }
    
        default:
           return state
    }
}
export default reducer