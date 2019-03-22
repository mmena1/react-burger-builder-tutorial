import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = type => {
    const count = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = count;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  };

  removeIngredientHandler = type => {
    const count = this.state.ingredients[type] - 1;
    if (count < 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = count;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  };

  countIngredients() {
    const ingredients ={...this.state.ingredients};
    const sum =  Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, el) => sum + el);
    return sum;
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    Object.keys(disabledInfo).map(key => disabledInfo[key] = disabledInfo[key] <= 0);
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.countIngredients() > 0 ? true : false}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;

