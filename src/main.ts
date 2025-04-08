/* Scegli un esercizio tra Il compleanno dello chef e Dashboard della città del Modulo 1 – Advanced JavaScript e riscrivilo utilizzando TypeScript.

Tipizza tutte le variabili, funzioni e strutture dati in modo esplicito, e verifica che il comportamento finale sia identico alla versione in JavaScript. */

type Recipe = {
  userId: number;
};

type Chef = {
  id: number;
  firstName: string;
  birthDate: string;
};

async function getChefBirthday(id: number): Promise<object | null> {
  try {
    const chefRecipe = await fetch(`https://dummyjson.com/recipes/${id}`);

    // Verifico che la ricetta sia recuperata correttamente
    if (!chefRecipe.ok) throw new Error("Errore nel recupero della ricetta");
    const recipe: Recipe = await chefRecipe.json();

    // Verifico che lo userId sia presente nella ricetta
    if (!recipe.userId) throw new Error("userId non trovato nella ricetta");

    const chefResponse = await fetch(
      `https://dummyjson.com/users/${recipe.userId}`
    );
    // Verifico che lo chef sia recuperato correttamente
    if (!chefResponse.ok) throw new Error("Errore nel recupero dello chef");

    const chef: Chef = await chefResponse.json();
    return chef;
  } catch (error) {
    console.error(error);
    return null;
  }
}

(async () => {
  const birthDay = await getChefBirthday(1);
  console.log("Data di nascita dello chef:", birthDay);
})();
