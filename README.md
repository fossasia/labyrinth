Labyrinth
=========

[**Play Now**](https://coderdojopotsdam.github.io/labyrinth)

This is a labyrinth software which can be edited by you.
This is an example in which direction we go:
![](vision-example.jpg)

Our goal is to have kids draw parts of the labyrinth (inkscape or hand drawn or other techniques), embed them into a huge labyrinth.
Possibly, we can have multiple levels all stuck together.

Motivation
----------

In the past two years, we created [Flappy SVG](http://fossasia.github.io/flappy-svg/).
We had problems coordinating because this is all one SVG file.
This time, we can allow kids to work independently on a level and coordination comes with embedding.
This allows remixing of each other's work and thus collaboration in new ways such as:
- Adding your tile to an existing labyrinth
- Creating your own labyrinth from other tiles.

It is possible to extend the level in various ways: Keys, asking characters in the game, animation, moving through the game, multiple levels.
Also, we can create apps, credit pages and various other timgs with it.

Implementation
--------------

This will be a html/JS only site, Jekyll is really needed.
Levels can be created by a csv file wich plugs together the different tiles.
We can retrieve the csv file from github pages (possibly file://, too) with ajax.
