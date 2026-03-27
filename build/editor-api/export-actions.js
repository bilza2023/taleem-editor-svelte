
export function downloadDeck(deck) {
    const blob = new Blob([JSON.stringify(deck, null, 2)], {
      type: "application/json"
    });
  
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
  
    a.href = url;
    a.download = "deck.json";
    a.click();
  
    URL.revokeObjectURL(url);
  }