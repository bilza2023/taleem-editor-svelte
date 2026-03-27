import { slideFactory } from "./slideFactory.js";

export function addSlide(deck, type) {
  const factoryFn = slideFactory[type];

  if (!factoryFn) {
    console.warn("Unknown slide type:", type);
    return deck;
  }

  const newSlide = factoryFn();

  const slides = deck.deck || [];
  const lastSlide = slides[slides.length - 1];

  if (lastSlide) {
    const start = lastSlide.end ?? 0;
    newSlide.start = start;
    newSlide.end = start + 5;
  } else {
    newSlide.start = 0;
    newSlide.end = 5;
  }

  return {
    ...deck,
    deck: [...slides, newSlide]
  };
}

export function moveUp(deck, index) {
  if (index === 0) return deck;

  const arr = [...deck.deck];
  [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];

  return { ...deck, deck: arr };
}
export function moveDown(deck, index) {
  const arr = [...deck.deck];

  if (index === arr.length - 1) return deck;

  [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];

  return { ...deck, deck: arr };
}

export function deleteSlide(deck, index) {
  const arr = [...deck.deck];
  arr.splice(index, 1);

  return { ...deck, deck: arr };
}
export function setStartTime(deck, index, currentTime) {
  const arr = [...deck.deck];

  if (index === 0) {
    arr[0].start = 0;
    if (arr[0].end <= 0) arr[0].end = 1;
    return { ...deck, deck: arr };
  }

  const T = currentTime;

  arr[index - 1].end = T;
  arr[index].start = T;

  if (arr[index].end <= arr[index].start) {
    arr[index].end = arr[index].start + 1;
  }

  return { ...deck, deck: arr };
}
