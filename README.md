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

As the phaser framework only works on properly hosted live servers the solution we came up with to immediately test code after adding to the code base was to install a plugin/extension called "Live Server" on Visual Studio Code. It allows the user to host their website locally on a port without difficulty and quickly test their web application.

Once the plugin is installed, they should be able to click on a "Go Live" button on the bottom right when on the html page for their web application.

## Proof of Concept

For our proof of concept, our goal was to show that it was possible to implement the basic main functionality. That is, to use a single phaser scene with a moving player using the arrow keys, using the proper directory formatting that phaser games use as a standard.
