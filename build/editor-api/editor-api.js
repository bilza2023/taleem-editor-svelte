import {
    addSlide,
    moveUp,
    moveDown,
    deleteSlide,
    setStartTime as setStartTimeAction
  } from "./deck-actions.js";
  
  export function createEditorAPI(initialDeck, { onChange, getTime } = {}) {
    let deck = initialDeck;
  
    function update(newDeck) {
      deck = newDeck;
      onChange && onChange(deck);
    }
  
    return {
      getDeck() {
        return deck;
      },
  
      add(type) {
        update(addSlide(deck, type));
      },
  
      moveUp(i) {
        update(moveUp(deck, i));
      },
  
      moveDown(i) {
        update(moveDown(deck, i));
      },
  
      delete(i) {
        update(deleteSlide(deck, i));
      },
  
      setStartTime(i, t) {
        update(setStartTimeAction(deck, i, t));
      }
    };
  }