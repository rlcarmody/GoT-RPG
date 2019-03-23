# Game of Thrones RPG
## Gameplay
1. Choose your champion to begin the game.  All characters can win the game, so choose your favorite GoT character
2. You will play as this character for the rest of the game and defeat all other characters
3. Choose your first opponent and attack
4. Your opponents hit points (HP) will be reduced by your attack power (AP)
5. Your opponent instantly counterattacks and you lose HP
6. Your AP increases with each subsequent attack
7. Once your opponent is defeated, choose your next opponent until all enemies are defeated

## Credits
* All characters are property of HBO and George R.R. Martin
* Pixelart by Charlie http://charlieart.pl/
* Theme by floatingpointmusic https://floatingpointmusic.newgrounds.com/

## Technical Details
* jQuery is used to dynamically render elements in different containers based on the stage of play
* The character stats and references are contained within defined objects
* For a basic implementation of game balance, a method is used to derive a character's base attack power inversely proportional to base HP
