---
title: Winning the Homework Assignment from theRubyist, Issue 1
tags:
  - Ruby
  - Publication
created_at: 2009-01-25 12:00:00
---

Oh, it feels good, having successfully met a challenge. I am referring to the homework assignment from <a href="http://therubyist.com/">theRubyist Magazine</a>, Issue 1, the Wig-Wug challenge, of course :-) Well, the competition was not that big, I hear.

For those of you who do not remember the assignment here is a short recap:

> Somehow Matz's Treasured Ruby got lost in a square playing field with unknown dimensions. The digger assigned to the task of recovering the Ruby starts his search at a random location. He can only see his immediate surroundings and is given the lateral and longitudinal <em>distance</em> to the Ruby before every move, not the <em>direction</em> mind you. The digger can choose to move left, right, up or down and will be given updated surrounding and distance information afterwards.

> The playing field is populated by two kinds of creatures making the digger's life a tad more complicated. While the Fleegol is an annoying little thing that will just take the digger one additional round to get past, the Geegol is outright lethal. Neither the Fleegol nor the Geegol will move, though. So once spotted, they can be dealt with in a well-defined manner.

> The task at hand obviously was to provide a implementation of the digger class in Ruby. It had to provide a <code>move!</code> method that given the distance and surroundings will return the desired direction of movement. The digger that would expressly recover the Treasured Ruby wins.

<a href="http://therubyist.com/">theRubyist</a>, Issue 2 (to be released in February 2009) includes my "Homework Debriefing" giving all the background information.

For anyone that would like to take an even closer look, here's <a href="/code/star_digger.rb">the complete source code of my winning solution</a> .

<em><strong>Update:</strong> I just found <a href="http://github.com/JEG2/wig-wug/tree">James Edward Gray II's Wig-Wug simulator on github</a>. So you can try out my code yourself. The star_digger.rb is already included within data/diggers. The simulator will even generate nice SVG images of every turn in the game and you can make multiple digger implementations compete -- fun, fun, fun :-)</em>

<em><strong>Update 2:</strong> <a href="/video/WigWug.mp4" title="Video of StarDigger in action">See the digger in action</a> desperately fighting its way through a Geegol pested area (Geegols are dark green; Fleegols are blue; the Ruby is, surprise, red). Visualization courtesy of JEG2's simulator.</em>


