---
title: Howto use the Ext JS Treeview (Ext.tree) with Ruby on Rails
tags:
  - Ext JS
  - Howto
  - Ruby on Rails
created_at: 2008-01-26 12:00:00
---

<img src="/2008/01/26/howto-use-the-ext-js-treeview-exttree-with-ruby-on-rails/ExtJS Tree.png" alt="ExtJS Tree Sample Screnshot" border="0" width="173" height="168" align="right" style="padding-left:10px;padding-bottom:10px"/>In this little tutorial I am going to show you, how to connect a Ext.tree component (from the remarkable <a href="http://extjs.com/">Ext JS Javascript framework</a>) to a <a href="http://www.rubyonrails.org/">Ruby on Rails</a> backend.

For starters, we need to <a href="">download and extract the Ext framework</a> to <code>public/ext</code> in our Rails project folder. We are going to use Rails 2.1.x for this Tutorial. That's not a particular requirement - but you would have to adapt certain Rails 2 concepts should you be using an older version.

To model a tree in Rails, we are going to use the acts_as_nested_set plugin - install it using <code>script/plugin install acts_as_nested_set</code> now.

To demonstrate the <code>Ext.tree</code> I will be using a <code>Category</code> model, having a root category with recursive sub-categories. We can use the Rails resource generator to initialize all neccessary files for us:

<pre>
script/generate resource Category parent_id:integer lft:integer rgt:integer text:string</pre>

As you can see, each of our categories is just carrying a <code>text</code> attribute to store its name and the required attributes for the nested set (<code>parent_id, lft, rgt</code>).

To use the <code>Category</code> model, we just have to add the <code>acts_as_nested_set</code> decorator to the <code>Category</code> class, so it looks like this:

<% code 'ruby' do %>
class Category < ActiveRecord::Base
  # For Rails 2.1: override default of include_root_in_json
  # (the Ext.tree.TreeLoader cannot use the additional nesting)
  Category.include_root_in_json = false if Category.respond_to?(:include_root_in_json)

  acts_as_nested_set
end
<% end %>

We can now create some sample data using <code>script/console</code> (you did run <code>rake db:migrate</code> already, didn't you? ;-) ):

<% code 'ruby' do %>
r = Category.create(:text => 'Frameworks')
r.add_child(c1 = Category.create(:text => 'Ruby on Rails'))
c1.add_child(Category.create(:text => 'Model'))
c1.add_child(Category.create(:text => 'View'))
c1.add_child(Category.create(:text => 'Controller'))
r.add_child(c2 = Category.create(:text => 'Ext JS'))
c2.add_child(c21 = Category.create(:text => 'tree'))
c21.add_child(Category.create(:text => 'TreePanel'))
c21.add_child(Category.create(:text => 'AsyncTreeNode'))
c21.add_child(Category.create(:text => 'TreeLoader'))
<% end %>

On to our <code>CategoriesController</code>. We just need an <code>index</code> method that will initially deliver a (rather static) <code>index.html.erb</code> view. The same method can then be used to provide JSON data to be consumed by <code>Ext.tree</code> like this:

<% code 'ruby' do %>
class CategoriesController < ApplicationController
  def index(id = params[:node])
    respond_to do |format|
      format.html # render static index.html.erb
      format.json { render :json => Category.find_children(id) }
    end
  end
end
<% end %>

We are giving the <code>index</code> method a <code>node</code> query parameter (assigned to a <code>id</code> variable) that Ext will later use to dynamically request sub-trees as they are extended in the UI.

Obviously we will have to add more code to our <code>Category</code> model as it currently does not respond to the <code>find_children</code> method. Let's use the following code to provide it - when no <code>id</code> or zero is given, the root node(s) of the tree will be returned:

<% code 'ruby' do %>
  # add to model/category.rb
  def self.root_nodes
    find(:all, :conditions => 'parent_id IS NULL')
  end

  def self.find_children(start_id = nil)
    start_id.to_i == 0 ? root_nodes : find(start_id).direct_children
  end
<% end %>

After starting <code>script/server</code> we can now fire up our browser and request http://localhost:3000/categories.json. Comparing the generated JSON with the format expected by <a href="http://extjs.com/deploy/dev/docs/?class=Ext.tree.TreeLoader">Ext.tree.TreeLoader</a> reveals that each element should supply a boolean attribute called <code>leaf</code> telling the tree if it can be further expanded or is a final leaf of the tree. To keep our controller skinny as we like it, we will add further methods to the <code>Category</code> model enabling its standard <code>to_json</code> method to also supply the required <code>leaf</code> attribute.

<% code 'ruby' do %>
  # add to model/category.rb
  def leaf
    unknown? || children_count == 0
  end

  def to_json_with_leaf(options = {})
    self.to_json_without_leaf(options.merge(:methods => :leaf))
  end
  alias_method_chain :to_json, :leaf
<% end %>

Now that we have the complete backend code in place, we just need to put some Ext Javascript into categories/index.html.erb to try the tree live:

<% code 'html' do %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
       "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <title>Ext.tree with Ruby on Rails Example</title>
  <%%= stylesheet_link_tag "../ext/resources/css/ext-all.css" %>
  <%%= javascript_include_tag :defaults %>
  <%%= javascript_include_tag "../ext/adapter/prototype/ext-prototype-adapter.js" %>
  <%%= javascript_include_tag "../ext/ext-all.js" %>
</head>
<body>
  <div id="category-tree" style="padding:20px"></div>
  <%% javascript_tag do -%>
    Ext.onReady(function(){
      // create initial root node
      root = new Ext.tree.AsyncTreeNode({
        text: 'Invisible Root',
        id:'0'
      });
      // create the tree
      new Ext.tree.TreePanel({
        loader: new Ext.tree.TreeLoader({
          url:'/categories',
          requestMethod:'GET',
          baseParams:{format:'json'}
        }),
        renderTo:'category-tree',
        root: root,
        rootVisible:false
      });
      // expand invisible root node to trigger load
      // of the first level of actual data
      root.expand();
    });
  <%% end -%>
</body>
</html>
<% end %>

Now it is time to look at the final view (http://localhost:3000/categories). If you use <a href="https://addons.mozilla.org/de/firefox/addon/1843">Firebug</a> or something similar you can track the AJAX requests made by Ext.tree to populate the tree dynamically when you expand nodes. Nice, huh?

<a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld"><img align="left" style="border: 0pt none ; padding-right: 7px; padding-bottom: 5px" alt="Recommend Martin Rehfeld on Working With Rails" src="http://workingwithrails.com/images/tools/compact-small-button.jpg" /></a>If you like this tutorial, please consider recommending me on <a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld">Working with Rails</a>. Thank you!

<div style="clear:left"><strong>Related Posts</strong></div>
<ul>
	<li><a href="/2008/01/18/announcing-ext-scaffold-generator-plugin-for-rails/">Announcing: Ext Scaffold Generator Plugin for Rails</a></li>
	<li><a href="/2008/01/08/ext-js-and-rails-how-do-they-get-along/">Background Presentation: Ext JS and Rails, how do they get along?</a></li>
	<li><a href="/2008/02/02/advanced-ext-js-form-controls-with-ruby-on-rails-combobox/">Mini-Tutorial - Ext JS Form Controls with Ruby on Rails: ComboBox</a></li>
</ul>
