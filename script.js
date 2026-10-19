
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "backyard";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  backyard: {
    title: "Location: Backyard",
    character: "Dog Owner",
    text: "My dog is missing! I last saw him running around the backyard. Can you help me look for him please?",
    image: "backyard.jpg",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Check the open gate",
        action: function () {
          updateClues(1);
        },
        nextScene: "house"
      },
      {
        text: "Talk to the party guest",
        action: function () {
          updateClues(1);
        },
        nextScene: "partyGuest"
      },
    ]
  },

  partyGuest: {
    title: "Location: Backyard",
    character: "Party Guest",
    text: "I saw the dog running around near the gate earlier, but I haven't seen him since.",
    image: "backyard.jpg",
    choices: [
      {
        text: "Check the open gate",
        action: function () {
          updateClues(1);
        },
        nextScene: "house"
      },
         {
        text: "Go inside the house",
        nextScene: "house"
      }
    ]
  },

  house: {
    title: "Location: House",
    character: "Dog Owner",
    text: "He loves treats! There should be some of his favorite treats in the kitchen if you want to bring a few with you on your search!",
    image: "house.jpg",
    choices: [
      {
        text: "Pick up the dog treats",
        action: function() {
          pickUpItem("Dog Treats");
        },
        nextScene: "neighborhood"
      },
      {
        text: "Leave the house",
        nextScene: "neighborhood"
      }
    ]
  },

   neighborhood: {
    title: "Location: Neighborhood",
    character: "",
    text: "You look around the neighborhood and notice paw prints leading down the sidewalk.",
    image: "neighborhood.jpg",
    choices: [
      {
        text: "Follow the paw prints",
        action: function () {
          updateClues(1);
        },
        nextScene: "neighborHouse"
      },
      {
        text: "Go to the neighbor's house",
        nextScene: "neighborHouse"
      }
    ]
  },

  neighborHouse: {
    title: "Location: Neighbor's House",
    character: "Neighbor",
    text: "I saw a dog run past my house a little while ago. I think he might have been headed towards the park.",
    image: "neighbor's house.avif",
    choices: [
      {
        text: "Check the neighbor's yard",
        action: function () {
          updateClues(1);
        },
        nextScene: "park"
      },
      {
        text: "Go to the park",
        nextScene: "park"
      }
    ]
  },

  park: {
    title: "Location: Park",
    character: "",
    text: "You reach the park. The dog could be near the playground or maybe hiding in the bushes?",
    image: "park.avif",
    choices: [
      {
        text: "Look near the playground",
        action: function () {
          updateClues(1);
          messageDisplay.textContent = "You find paw prints leading toward the bushes.";
        }
      },
      {
        text: "Look near the bushes",
        action: findDog
      },
      {
        text: "Go back to the house",
        nextScene: "house"
      }
    ]
  },


   solution: {
    title: "Dog Found!",
    character: "Dog Owner",
    text: "You found him! Thank you so much for bringing him back!",
    image: "dog.jpg",
    choices: []
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices");
const characterName = document.getElementById("character-name");
const sceneImage = document.getElementById("scene-image");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;
  sceneImage.src = scene.image;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";


  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// CLUES FOUND
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let cluesFound = 0;

// Display current health
const cluesDisplay = document.getElementById("clues-display");

// Create a function to update health 
function updateClues(amount) {
  cluesFound += amount;
  cluesDisplay.textContent = cluesFound;
}

// This refreshes the health display
updateClues(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function findDog() {
  if (inventory.includes("Dog Treats")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The dog won't come out. Maybe you need to get some of his favorite treats from the house?";
  }
}

