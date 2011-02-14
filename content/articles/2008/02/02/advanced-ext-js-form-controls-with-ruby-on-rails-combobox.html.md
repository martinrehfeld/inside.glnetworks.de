---
title: 'Advanced Ext JS Form Controls with Ruby on Rails: ComboBox'
tags:
  - Ext JS
  - Howto
  - Ruby on Rails
created_at: 2008-02-02 12:00:00
---

The <a href="/2008/01/18/announcing-ext-scaffold-generator-plugin-for-rails/">Ext Scaffold Generator Plugin for Ruby on Rails</a> provides a quick start for single-model forms. When proceeding from the generated code to an actual application, one question keeps popping up in no time:
<blockquote>
"How can I have a ComboBox in my form populated with choices from some other model to assign a association?"
</blockquote>

Say, you have a <code>Post</code> model for blog posts and a <code>Category</code> model, similiar to the one we used in the <a href="/2008/01/26/howto-use-the-ext-js-treeview-exttree-with-ruby-on-rails/">Treeview example</a>. Each <code>Post</code> belongs to a <code>Category</code>:

<% code 'ruby' do %>
class Post < ActiveRecord::Base
  belongs_to :category
  # has attributes: id, title, body, category_id
end

class Category < ActiveRecord::Base
  # has attributes: id, name
end
<% end %>

If we were using just Rails without Ext JS, we would probably have the <code>select</code> form helper build a HTML select field ending up with this sort of code in our view:

<% code 'rhtml' do %>
<%%= select :post, :category_id,
       Category.find(:all).collect {|c| [ c.name, c.id ] },
       { :include_blank => true } %>
<% end %>

Guess what? You can use the exact same code with Ext JS. One of the handy features of Ext.form.ComboBox is the ability to transform an existing HTML select tag into one of Ext's nice looking controls.

To turn above select field into a <code>Ext.form.ComboBox</code> we can use this form item configuration:

<% code 'javascript' do %>
{ fieldLabel:    'Category',
  xtype:         'combo',
  triggerAction: 'all',
  typeAhead:      true,
  forceSelection: true,
  transform:     'post_category_id',
  lazyRender:     true
}
<% end %>

A complete _form_items.html.erb partial (as used with the Ext Scaffold Generator) would then look like this:

<% code 'rhtml' do %>
<%%= select :post, :category_id,
       Category.find(:all).collect {|c| [ c.name, c.id ] },
       { :include_blank => true } %>
<%% javascript_tag do -%>
  var <%%= "#{form_items}" %> = [
    <%%= ext_field(:field_label => 'Title', :name => 'post[title]', :xtype => :text_field) %>,
    <%%= ext_field(:field_label => 'Body',  :name => 'post[body]',  :xtype => :text_area) %>,
    { fieldLabel:    'Category',
      xtype:         'combo',
      triggerAction: 'all',
      typeAhead:      true,
      forceSelection: true,
      transform:     'post_category_id',
      lazyRender:     true
    }
  ];
<%% end -%>
<% end %>

<a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld"><img align="left" style="border: 0pt none ; padding-right: 7px; padding-bottom: 5px" alt="Recommend Martin Rehfeld on Working With Rails" src="http://workingwithrails.com/images/tools/compact-small-button.jpg" /></a>If this mini-tutorial was useful to you, please consider recommending me on <a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld">Working with Rails</a>. Thank you!

<div style="clear:left"><strong>Related Posts</strong></div>
<ul>
	<li><a href="/2008/01/26/howto-use-the-ext-js-treeview-exttree-with-ruby-on-rails/">Tutorial: Howto use the Ext JS Treeview (Ext.tree) with Ruby on Rails</a></li>
	<li><a href="/2008/01/18/announcing-ext-scaffold-generator-plugin-for-rails/">Announcing: Ext Scaffold Generator Plugin for Rails</a></li>
	<li><a href="/2008/01/08/ext-js-and-rails-how-do-they-get-along/">Background Presentation: Ext JS and Rails, how do they get along?</a></li>
</ul>
