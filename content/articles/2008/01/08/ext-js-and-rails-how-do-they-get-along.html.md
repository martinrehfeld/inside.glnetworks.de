---
title: Ext JS and Rails, how do they get along?
tags:
  - Ext JS
  - Howto
  - Presentations
  - Ruby on Rails
created_at: 2008-01-08 12:00:00
---

The <a href="http://extjs.com/">Ext JS framework</a> got a lot of attention lately as it offers very sophisticated GUI components for web application development. But how does Ext play along with <a href="http://www.rubyonrails.org/">Ruby on Rails</a>, everybody's favorite development framework?

There is not a lot of <a href="http://extjs.com/tutorial/using-ext-grid-ruby-rails">documentation</a> around, though some people seem to be using the combo quite successfully (if you take job posts looking for Rails and Ext skills into account).

Googling reveals some Rails plugins aiming at Ext integration, but a closer look exposes them as mostly <a title="toolbawks(tm) ext" href="http://svn.toolbawks.com/toolbawks_extjs/trunk/INSTALL">"vaporware"</a>, <a href="http://extonrails.com/">abandoned experiments</a> or as <a href="http://wota.jp/ac/?date=20070406">not being actively developed</a>.

<a title="Slides for Ext with Rails talk at Ruby Users Group (RUG-B) 10-Jan-2008" href="/2008/01/08/ext-js-and-rails-how-do-they-get-along/Rails%20GUI%20Development%20with%20Ext%20JS%2010-Jan-08%20RUG-B.pdf"><img width="161" height="114" border="0" align="left" style="border: 0pt none ; padding-right: 25px; padding-bottom: 10px" alt="RailsExt.png" src="/2008/01/08/ext-js-and-rails-how-do-they-get-along/RailsExt.png" /></a>For my talk on Ext at the <a title="Berlin Ruby Users Group (RUG-B)" href="http://www.rug-b.com/wiki/show/UG080110">Berlin Ruby Users Group</a>, I decided to roll my own. The presentation focuses on Rails scaffolding as a good starting point for playing with Ext. The biggest integration task from a Rails point of view is providing the correct JSON data structures that Ext can process - a task that can be solved in a re-usable way. Passing data around between Rails controllers and views and the actual JavaScript code is another focal point. <a title="Slides for Ext with Rails talk at Ruby Users Group (RUG-B) 10-Jan-2008" href="/2008/01/08/ext-js-and-rails-how-do-they-get-along/Rails%20GUI%20Development%20with%20Ext%20JS%2010-Jan-08%20RUG-B.pdf">Download the complete set of slides here</a>.

The presentation features a preview version of my <a href="http://rug-b.rubyforge.org/svn/ext_scaffold">Ext Scaffold Generator</a>, soon to be announced as a official Rails plugin.

[Edit by martin.rehfeld]: The Ext Scaffold Generator has been officially released on 18th January 2008, <a title="Announcing: Ext Scaffold Generator Plugin for Rails" href="/2008/01/18/announcing-ext-scaffold-generator-plugin-for-rails/">check out the details</a>.

<div style="clear:left"><strong>Related Posts</strong></div>
<ul>
	<li><a href="/2008/01/26/howto-use-the-ext-js-treeview-exttree-with-ruby-on-rails/">Tutorial: How to use the Ext JS Treeview (Ext.tree) with Ruby on Rails</a>
	<li><a href="/2008/02/02/advanced-ext-js-form-controls-with-ruby-on-rails-combobox/">Mini-Tutorial - Ext JS Form Controls with Ruby on Rails: ComboBox</a></li>
	<li><a href="/2008/01/08/ext-js-and-rails-how-do-they-get-along/">Background Presentation: Ext JS and Rails, how do they get along?</a></li>
	<li><a href="/2007/12/17/ext-js-already-the-3rd-most-used-web-framwork/">Ext JS already the 3rd most used Web Framework</a></li>
</ul>

