const prompt = require('prompt-sync')({sigint: true});
//Global variables
let caughtFish = [];

//Game Flow
console.log ("You've gone fishing! Try to maximize the value of your caught fish.")
console.log("You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.")

for(let i=6; i < 12; i++){
    console.log('==========================================\n');
    console.log(`The time is ${i}:00am. So far you've caught;`);
//1.current fish list - keep track of our fish and print list 
    //-# of fish = .length of caughtFish
    //-weight/value - function to calculate total weight and total value of fish in caughtFish array
    console.log(`${caughtFish.length} fish, ${getTotalWeight()} lbs, $${getTotalValue()}`);
//2.Display our randomFish object - generateRandomFish() 
    let fish = generateRandomFish();

    console.log(`You caught a '${fish.name}' weighing ${fish.weight} lbs and valued at $${fish.value}`);

// -check if weight will exceed 10 lbs, if so - auto release, prompt user to press enter, make sure that they aren't prompted to catch/release
    let currentTotalWeight = getTotalWeight();

    if(currentTotalWeight + fish.weight > 10){
        console.log("\nThis fish would put you over 10lbs, so you release it.\n")
        console.log("Press any key to continue")
       prompt("> ")

        continue;
    }

//3.Catch or release - user prompt
    // error check for value NOT c/r
    //make sure we aren't catching over 10 lbs

    console.log("\n Your Action: [c]atch or [r]elease?");
    let action = prompt("> ");

    while(action !== 'c' && action !== "r"){
        console.log("Please enter [c] or [r]")
        action = prompt("> ")
    }

    if(action === 'c'){
        //catch
        /*
        -push fish into the array
        -console.log You chose to keep the fish.
        */
       caughtFish.push(fish);
       console.log(`\nYou chose to keep the ${fish.name}!\n`)

    } else if (action === 'r'){
        //release
        /*
        -console.log You choe to release the fish.
        */
       console.log(`\nYou chose to release the ${fish.name}.\n`)
    }
}

console.log("The time is 12:00pm. Times up!")

    console.log(`\nYou caught ${caughtFish.length} fish:`)

    for(let i = 0; i < caughtFish.length; i++){
        console.log(`${caughtFish.name}`)
    }

    console.log(`Total weight: ${getTotalWeight()} lbs`)
    console.log(`Total value: $${getTotalValue()}`)



function generateRandomWeight(){
    let weight = Number((Math.random() * 5).toPrecision(3));
    while(weight < 1){
        weight = Number((Math.random() * 5).toPrecision(3));
    }
    return weight;
}

function generateRandomValue(){
    let value = Number((Math.random() * 5).toPrecision(3));

    while(value < .1){
        value = Number((Math.random() * 5).toPrecision(3))
    }
    if(value < 1){
        //value = (Math.random() * 5).toPrecision(3);
        value = Number(value.toPrecision(2));
    }
    return value;
}

function generateRandomName(){
    let adjectives = ['Shiny', 'Red','Dull', 'Blue', 'Slimy', 'Green', 'Dry', 'Yellow', 'Vibrant', 'Purple', 'Floppy', 'Teal', 'Silly', 'Silver'];

    let types = ['Salmon', 'Bass', 'Trout', 'Flounder', 'Perch', 'Snaper', 'Catfish', 'Grouper', 'Tuna', 'Blobfish', 'Blowfish'];

    //Index - Math.floor(Math.random() * arrayName.length)
    let adj1 = adjectives[Math.floor(Math.random() * adjectives.length)];
    let adj2 = adjectives[Math.floor(Math.random() * adjectives.length)];
    let type = types[Math.floor(Math.random() * types.length)];

    while(adj1 === adj2){
        adj2 = adjectives[Math.floor(Math.random() * adjectives.length)]
    }
    return adj1 + " " + adj2 + " " + type;
}

//console.log(generateRandomFish())

function generateRandomFish(){
    let fish = {};
    fish.name = generateRandomName();
    fish.weight = generateRandomWeight();
    fish.value = generateRandomValue();

    return fish;
}

function getTotalWeight(){
    let totalWeight = 0;

    for(i = 0; i < caughtFish.length; i++){
        let currentFish = caughtFish[i]
        totalWeight += currentFish.weight;
    }
    return Number(totalWeight.toPrecision(3));
}

function getTotalValue(){
    let totalValue = 0;

    for(let fish of caughtFish){
        //fish.value -gets us the value property of each fish in our caught fish array 1 at a time
        totalValue = totalValue + fish.value;
    }
    return Number(totalValue.toPrecision(3));
}

/*
fish
-weight: number
-name: 2 discriptors and a type: string
-value: number

fish = {
    -name:  string
    -weight: number
    -value: number 
}

Math.random 
weight 1-5 (can adjust later on!)
console.log((Math.random() * 5).toPrecision(3));
let rand = Math.random() * 5;
console.log(rand);
console.log(Number(rand.toPrecision(3)));
//need a way to offset decimals with 3 places ie 0.574

value 0-5
Math.random()* 5).toPrecision(3)

name - 2 discriptors + 1 type
adjective array['enormous', 'red', 'scaly']
type array['salmon', 'bass', 'trout']

Math.floor(Math.random() * type.length)

red red salmon
//ass check to make sure adj1 !== adj2
//if so, re-randomize

*/
