---
title: 'Announcing: Ext Scaffold Reloaded Plugin for Ruby on Rails'
tags:
  - Announcements
  - Ext JS
  - Ruby on Rails
  - Tools
created_at: 2008-12-24 12:00:00
---

Ext Scaffold just got "Reloaded" for Christmas. Never heard of Ext Scaffold? Ok, so first things first:
<blockquote>The Ext Scaffold Generator Plugin is a drop-in replacement for Rails' standard Scaffold Generator. Accepting the very same options, it will generate views using data grid and form components from the Ext JS Javascript GUI framework as well as a controller acting as an Ext-compatible JSON web service. The generated code can be used as a starting point for further implementation and outlines solutions on how to integrate the Ext JS library with Rails as a backend.</blockquote>
When Ext Scaffold was first released earlier this year, it was a rather experimental shot at Ext/Rails integration. It still received a lot of great feedback, and more importantly it helped me gather things I would do different next time.

<strong>Ext Scaffold Reloaded</strong> is the fruit of all lessons learned since the first release, if you will. So without further ado, here are the top enhancements:
<ol>
	<li><strong>One-page user interface</strong>: The Grid and the form are integrated into one single page. As no page reload is necessary when switching between grid and form, the interfaces is much more responsive.</li>
	<li><strong>No more magic</strong>: The formerly introduced view helpers are gone. While they made the view code look very simple and elegant, they more so obfuscated what was actually going on.</li>
	<li><strong>Easy refinement</strong>: All Javascript code is now generated explicitly and thus can be easily tweaked and refined to one's needs.</li>
</ol>
Ext Scaffold also found its new home over at <a href="http://github.com/martinrehfeld/ext_scaffold/">github</a>. So give it a spin and let me know what needs to be radically different in the Revolutions release ;-) .

<a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld"><img align="left" alt="Recommend Martin Rehfeld on Working With Rails" style="border: 0pt none ; padding-right: 7px; padding-bottom: 5px" src="http://workingwithrails.com/images/tools/compact-small-button.jpg" /></a>If you like this plugin, please consider recommending me on <a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld">Working with Rails</a>. Thank you!

<div style="clear: left"><strong>Related Posts</strong></div>
<ul>
	<li><a href="/2008/01/18/announcing-ext-scaffold-generator-plugin-for-rails/">Announcing: Ext Scaffold Generator Plugin for Rails</a></li>
	<li><a href="/2009/02/17/howto-associations-with-ext_scaffold-aka-extjs-with-ruby-on-rails/">Howto: Associations with ext_scaffold (aka ExtJS with Ruby on Rails)</a></li>
	<li><a href="/2008/01/26/howto-use-the-ext-js-treeview-exttree-with-ruby-on-rails/">Tutorial: How to use the Ext JS Treeview (Ext.tree) with Ruby on Rails</a></li>
	<li><a href="/2008/02/02/advanced-ext-js-form-controls-with-ruby-on-rails-combobox/">Mini-Tutorial - Ext JS Form Controls with Ruby on Rails: ComboBox</a></li>
	<li><a href="/2008/01/08/ext-js-and-rails-how-do-they-get-along/">Background Presentation: Ext JS and Rails, how do they get along?</a></li>
</ul>
