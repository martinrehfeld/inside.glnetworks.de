---
title: 'Announcing: Ext Scaffold Generator Plugin for Rails'
tags:
  - Announcements
  - Ext JS
  - Ruby on Rails
  - Tools
created_at: 2008-01-18 12:00:00
---

<img width="194" height="199" border="0" align="left" alt="Ext Scaffold Generator Plugin GUI Screenshot.png" style="padding-right: 5px; padding-bottom: 5px" src="/2008/01/18/announcing-ext-scaffold-generator-plugin-for-rails/Ext%20Scaffold%20Generator%20Plugin%20GUI%20Screenshot1.png" /><p><strong>Update (12-2008): Ext Scaffold Reloaded has been released. While the version discussed in this post is still available, I strongly suggest looking into the latest version over at <a href="http://github.com/martinrehfeld/ext_scaffold">github/ext_scaffold</a>. The Reloaded edition offers a richer UI, better performance and can be customized much easier -- it is the fruit of all lessons learned since the first release, if you will. <a href="/2008/12/24/announcing-ext-scaffold-reloaded-plugin-for-ruby-on-rails/">Read the announcement.</a></strong></p>

The Ext Scaffold Generator Plugin can be viewed as a drop-in replacement for Rails' standard Resource Generator. Accepting the very same options, it will generate views using data grid and form components from the <a href="http://extjs.com/">Ext JS Javascript GUI framework</a> as well as a controller acting as an Ext-compatible JSON web service. The generated code can be used as a starting point for further implementation and outlines solutions on how to integrate the Ext JS library with <a href="http://www.rubyonrails.org/">Rails</a> as a backend.
<div style="clear: left; padding-bottom: 5px"><strong>What it does not do</strong></div>
Ext JS is huge. It provides just about any component for developing Rich Internet Applications. The Ext Scaffold generator only uses a very limited subset of Ext JS. It includes some view helper methods to generate Javascript code, but these helpers are not really meant to be used in other contexts. IMHO it is better to code the Javascript in views by hand.

Any attempt of providing helpers for even a subset of the Ext functionality seemed like a dead-end approach to me. For further refinement of your application I suggest looking at the generated JS code and change it to suit your needs.

<strong>Features and Concepts</strong>

The way Ext JS works is to code all GUI components and interactions in Javascript. These components will then interact with a datastore backend via web service requests (either JSON or XML formatted).

The Ext Scaffold Generator Plugin provides a custom MIME type alias <code>:ext_json</code> to be able to handle requests from the Ext frontend separately. The generated controllers show how to do this.

To make data delivery to the Ext frontend easy, the plugin extends the  <code>Array</code> and <code>ActiveRecord::Base</code> classes to provide a <code>to_ext_json</code> method. Here's a simplified example of a potential <code>index</code> method in a <code>PostsController</code>:

<% code 'ruby' do %>
# GET /posts
# GET /posts.ext_json
def index
  respond_to do |format|
    format.html     # index.html.erb (will fire ext_json request)
    format.ext_json { render :json => Post.find(:all).to_ext_json }
  end
end
<% end %>

<code>to_ext_json</code> will also format validation error messages attached to <code>ActiveRecord::Base</code> objects. This can be used to provide server-side validations additionally to Ext's own client-side validation features in forms. Another simplified example using our fictitious Post resource:

<% code 'ruby' do %>
# Model
class Post < ActiveRecord::Base
  validates_presence_of :title
end

# Controller
class PostsController < ApplicationController
# ...
# POST /posts
  def create
    @post = Post.new(params[:post])
    if @post.save
      flash[:notice] = 'Post was successfully created.'
      render(:update) {|page| page.redirect_to posts_url }
    else
      render :json => @post.to_ext_json(:success => false)
  end
end
# ...
end
<% end %>

<strong>Installation</strong>
<pre>script/plugin install http://rug-b.rubyforge.org/svn/ext_scaffold</pre>
After the plugin has been installed, download the Ext Javascript framework from <a href="http://extjs.com/download">http://extjs.com/download</a> and unzip it into <code>#{RAILS_ROOT}/public/ext</code>. The plugin was tested against <a href="http://extjs.com/deploy/ext-2.0.1.zip">version 2.0.1 of the Ext framework</a>.

<strong>Usage Exmples (call without params for help)</strong>
<pre>./script/generate ext_scaffold post title:string body:text published:boolean
./script/generate ext_scaffold purchase order_id:integer amount:decimal</pre>
<a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld"><img align="left" style="border: 0pt none ; padding-right: 7px; padding-bottom: 5px" alt="Recommend Martin Rehfeld on Working With Rails" src="http://workingwithrails.com/images/tools/compact-small-button.jpg" /></a>If you like this plugin, please consider recommending me on <a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld">Working with Rails</a>. Thank you!

<div style="clear:left"><strong>Related Posts</strong></div>
<ul>
	<li><a href="/2008/01/26/howto-use-the-ext-js-treeview-exttree-with-ruby-on-rails/">Tutorial: How to use the Ext JS Treeview (Ext.tree) with Ruby on Rails</a>
	<li><a href="/2008/02/02/advanced-ext-js-form-controls-with-ruby-on-rails-combobox/">Mini-Tutorial - Ext JS Form Controls with Ruby on Rails: ComboBox</a></li>
	<li><a href="/2008/01/08/ext-js-and-rails-how-do-they-get-along/">Background Presentation: Ext JS and Rails, how do they get along?</a></li>
	<li><a href="/2007/12/17/ext-js-already-the-3rd-most-used-web-framwork/">Ext JS already the 3rd most used Web Framework</a></li>
</ul>

