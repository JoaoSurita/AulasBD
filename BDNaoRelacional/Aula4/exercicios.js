// EXERCÍCIO 1
//---------------------------------------------------------------------------------------------------------

/*  a) O Homem-Aranha desenvolveu um novo poder: Sentido
Aranha Aprimorado. Adicione esse poder ao array power
de "Spider-Man".  */

db.heroes.updateOne(
    { name: "Spider-Man" },
    { $push: { power: "Aprimored-Spider-Sense" } }
);

//---------------------------------------------------------------------------------------------------------

/*  b) O Batman prendeu mais 10 vilões. Atualize o campo
defeatedVillains para refletir essa mudança.  */

db.heroes.updateOne(
    { name: "Batman"},
    { $inc: { defeatedVillains : 10} } 
);

//---------------------------------------------------------------------------------------------------------

/*  c) O nome da cidade da Mulher-Maravilha foi alterado para
"Amazonia". Atualize essa informação.  */

db.heroes.updateOne(
    { name: "Wonder Woman" },
    { $set: { city: "Amazonia" } }
)
//---------------------------------------------------------------------------------------------------------

/*  d) O Batman perdeu suas "Detective Skills" (ele não se lembra
mais de como investigar). Remova essa habilidade da lista
power.  */ 

db.heroes.updateOne(
    { name: "Batman" },
    { $pop: { power: 1 } } // Remove o ultimo item do array hobbies de "Batman".
);

//---------------------------------------------------------------------------------------------------------
// EXERCÍCIO 2
//---------------------------------------------------------------------------------------------------------

/*  a) O restaurante decidiu aumentar o preço de todos os
pratos em 10%. Atualize os preços. */

db.menu.updateMany(
  { }, // Quando o campo estiver vazio, o BD buscará tudo
  { $mul: { price: 1.10 } }
);

//---------------------------------------------------------------------------------------------------------

/*  b) O Taco agora vem com "Guacamole". Adicione esse
ingrediente à lista ingredients. */

db.menu.updateOne(
  { dish: "Taco" },
  { $push: { ingredients: "Guacamole" } }
);

//---------------------------------------------------------------------------------------------------------

/*  c) O Sushi teve um reajuste e agora custa 35. Atualize
esse valor.*/

db.menu.updateOne(
  { dish: "Sushi" },
  { $set: { price: 35 } }
);

//---------------------------------------------------------------------------------------------------------

/*  d) O restaurante removeu "Beef" dos Tacos e substituiu
por "Chicken". Atualize a lista de ingredientes do Taco.*/

db.menu.updateOne(
  { dish: "Taco", ingredients: "Beef" },
  { $set: { "ingredients.$": "Chicken" } }
);

//  Com o operador $ em ingredientes.$, ele vira ["Tortilla", "Chicken", "Cheese"].
//  Sem o operador $ em ingredientes.$, ele viraria ["Tortilla", "Cheese", "Chicken"].
//  o $ irá manter o item no mesmo lugar, sem ele, ele irá para o final do array, isso 
//  pode ser util se a ordem do array importar

//---------------------------------------------------------------------------------------------------------