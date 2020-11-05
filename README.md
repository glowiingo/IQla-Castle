# Project IQla Castle
This is a repository containing the IQla Castle Project. 

For this project, we will be following the structure of the generic phaser game directory structures with slight adjustmenets for our needs:

IQla Castle <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|____ assets &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ```\\ All Multimedia Assets, this can be organized by multimedia```<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;player_sprite.png<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|____ src<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;phaser.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```\\ Contains Phaser Library / Framework```<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;game.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```\\ Contains Game Object and Configurations```<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|____ scenes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```\\ Contains Phaser Javascript Scenes``` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; gameplay_scene.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```\\ Contains gameplay logic``` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; template_scene.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```\\ Contains template for other developers to use for developing a new scene``` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|____ css&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```\\ Contains Custom CSS for Main Page``` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|____ js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```\\ Contains Custom Javascript``` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```\\ Contains Phaser Canvas and Main Page Elements```<br>

## Set up and Running the Proof of Concept

As the phaser framework only works on properly hosted live servers and we now have set up the networking to host the server, the user needs to:

1. Call `npm install` in the directory of the project and `npm install socket.io` in the directory of the project.
To ensure the socket.io module is installed, please do `npm socket.io -v`.

2. Run the server on local host by typing in `node server.js` in the main directory of the project.

3. Open up the server port on the browser - Example: `http://localhost:8080/`

The main menu should appear, and the gameplay scene should work with multiple players if the host has set up port forwarding.

## Proof of Concept

For our proof of concept, our goal was to show that it was possible to implement the basic main functionality. That is, to use a single phaser scene with a moving player using the arrow keys, using the proper directory formatting that phaser games use as a standard.

Worked on by: Gloria Ngo