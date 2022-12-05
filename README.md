# [Limio](https://www.limio.com/) challenge

---

## This repo has been created as part of the [Founders & Coders](https://learn.foundersandcoders.com) pre-apprenticeship program.

---

## A take home challenge for [Limio](https://www.limio.com/) that breaks [Wordle](https://www.nytimes.com/games/wordle/index.html) into user stories and reproduces some of those user stories.

---

### Cloning

Please feel free to clone the repo using this url https://github.com/d0g3bl2/Limio_wordle_take_home_challenge_FAC26.git Simply open your terminal, run the command `git clone` followed by the url and type `code .` to open in your code editor of preference.

---

### Deployment

To view the Wordle challenge on Github pages please follow this link [Click me to play!](https://d0g3bl2.github.io/Limio_wordle_take_home_challenge_FAC26/)

---

### The Limio Wordle take home challenge.

#### Where to find the code.

Inside the [root directory](https://github.com/d0g3bl2/Limio_wordle_take_home_challenge_FAC26.git) is `index.html` which is linked to `style.css` found in the `css` directory and `index.js` found in the `src` directory.

---

#### User stories.

##### Firstly I broke the Wordle game in to [User Stories](https://www.visual-paradigm.com/guide/agile-software-development/what-is-user-story/), created new [github issues](https://github.com/d0g3bl2/Limio_wordle_take_home_challenge_FAC26/issues) for each and chose one to focus on building.

- As a user I want instructions so I understand how to play the game.
- As a user I want the UI to be keyboard accessible so I can play without using a mouse.
- As a user I want the UI to use semantic HTML so I can use my screen reader.
- As a user I want the option of a high contrast mode so I can see the colour coded clues clearly.
- As a user I want to set up an account so I can keep track of my game history.
- As a user I want to link to my social media so I can post my results.
- As a user I to enter a word so I can check the result.

##### Contrast setting.

I built a contrast feature that allows the user to switch to a high contrast mode. The `background` color of the `div` changes to alert the user that they have guessed the correct letter and it in the correct spot or if they have guessed the correct letter but it is in the incorrect place. By toggling the contrast mode feature the `background` of the `div` changes to a more suitable colour for colour blind users.

![image](https://user-images.githubusercontent.com/99536044/205695784-db50d395-64f6-44f2-8a45-999dad8a877e.png)

In the code above ☝️ I used nested `if else` statements with conditionals that check

1. If contrast mode is toggled on (`contastButton.checked === true`).
   1. If the current boxes `classname.includes('right')`. 
   2. If the current boxes `classname.includes('wrong')`. 
   3. If the current boxes `classname.includes('empty')`. 
   
If the conditionals `classname.includes` return true the codeblock is run removing the current class name and replacing it with it `contrast-right` for example.

