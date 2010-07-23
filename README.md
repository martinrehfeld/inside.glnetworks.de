Source Code for inside.glnetworks.de
====================================

This is the source code for http://inside.glnetworks.de, my tech blog. The code is compiled with `nanoc3` into a static site.


Tools & Acknowledgements
------------------------

* [nanoc3 -- static site generator](http://nanoc.stoneship.org/)
* [Haml -- HTML templating](http://haml-lang.com/)
* [Sass -- CSS meta-language](http://sass-lang.com/)
* [Compass -- stylesheet authoring framework](http://compass-style.org/)
* [RDiscount -- Markdown to HTML converter](http://github.com/rtomayko/rdiscount/)
* [Fancy Buttons -- Compass plugin for fancy buttons](http://brandonmathis.com/projects/fancy-buttons/)
* [CodeRay -- syntax highlighting library](http://coderay.rubychan.de/)


Instructions
------------

To preview the site do:

    install bundler for dependency managment "gem install bundler"
    Install necessary gems with "bundle install"

    Checkout site source and start preview server:
    $ git clone git://github.com/martinrehfeld/inside.glnetworks.de-src.git
    $ cd inside.glnetworks.de-src
    $ rm -rf output/* && nanoc3 compile
    $ nanoc3 view
    
    Point your browser to http://localhost:3000/

To publish the site do:

    # yet to be decided / implemented
