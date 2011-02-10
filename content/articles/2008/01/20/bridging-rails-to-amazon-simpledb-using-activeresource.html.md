---
title: Bridging Rails to Amazon SimpleDB using ActiveResource
tags:
  - Amazon Web Services
  - Announcements
  - Howto
  - Ruby on Rails
  - Tools
created_at: 2008-01-20 12:00:00
---

With <a href="http://aws.amazon.com/simpledb">SimpleDB</a>, Amazon added the long-awaited database-like service to it's web services portfolio. A database was the <em>one</em> thing missing for building a complete web hosting stack with Amazon's services.

Using SimpleDB together with <a href="http://www.rubyonrails.org/">Ruby on Rails</a> was the thing I immediately wanted to try. Some problems had to be dealt with first:
<ol>
	<li>Amazon does not provide any Ruby code for SimpleDB access</li>
	<li>SimpleDB has quite some limitations <a href="http://inside.glnetworks.de/2007/12/15/amazon-simpledb-web-service-complementing-the-ec2-compute-cloud/">as detailed in a previous post</a></li>
</ol>
As <a href="http://lars-schenk.com/open-source-wettbewerb/194">Lars Schenk outlines on his Blog</a> at least three different projects on RubyForge are addressing problem number one - only one of them has actual code, though. And that is <a href="http://rubyforge.org/projects/aws-sdb/">aws-sdb</a> by <a href="http://dysinger.net/2007/12/17/amazon-sdb-released/">Tim Dysinger from Hawaii</a>.

OK, using Tim's aws-sdb gem, one can get access to SimpleDB using Ruby. But using SimpleDB as a drop-in-replacement for a relational database and connecting Rails' ActiveRecord to it would require a fairly complex adapter - I am not sure, if this can be done at all, actually.

Looking at Rails, another interface comes to mind: ActiveResource. ActiveResource was written to connect model objects to RESTful web services as their datastore. That sounds like a fit. The APIs are different, but the functionality needed by ActiveResource can be provided by SimpleDB - it's all just <a href="http://en.wikipedia.org/wiki/Create,_read,_update_and_delete">CRUD</a> after all.

All that's needed would be a adapter, a proxy, a proxy server? Yes, that's right. As it turned out, it's not too hard to write one, so here it is :-)

<strong>Announcing AWS SDB Proxy</strong>

My <a title="AWS SDB Proxy on Agilewebdevelopment" href="http://agilewebdevelopment.com/plugins/aws_sdb_proxy">AWS SDB Proxy</a> is a HTTP proxy server bridging ActiveResource calls from Rails to Amazon's SimpleDB Web Service allowing it to be used as a storage backend for Rails applications.

The proxy will listen for web service calls initiated by ActiveResource models and forward the requests to SimpleDB using the <a href="https://rubyforge.org/projects/aws-sdb/">aws-sdb</a> gem.

Install the <a href="http://rug-b.rubyforge.org/svn/aws_sdb_proxy/">AWS SDB Proxy Plugin from RubyForge</a> as usual:
<pre>script/plugin install http://rug-b.rubyforge.org/svn/aws_sdb_proxy</pre>
Then follow the instructions provided in the <a href="http://rug-b.rubyforge.org/svn/aws_sdb_proxy/README">README</a>.

<strong>Features and Limitations</strong>

SimpleDB (and thus AWS SDB Proxy) do not use any pre-defined schema. Every record can potentially have different attributes. SimpleDB also has no data types associated with it's attributes, all data will be stored as strings.

AWS SDB Proxy adds a special <code>_resource</code> attribute, allowing storage of multiple models within the same SimpleDB domain. Record <code>ids</code> are generated using a SHA512 hash function to make key collisions extremely unlikely.

<a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld"><img align="left" style="border: 0pt none ; padding-right: 7px; padding-bottom: 5px" alt="Recommend Martin Rehfeld on Working With Rails" src="http://workingwithrails.com/images/tools/compact-small-button.jpg" /></a>If you like this plugin, please consider recommending me on <a href="http://www.workingwithrails.com/recommendation/new/person/6641-martin-rehfeld">Working with Rails</a>. Thank you!

<div style="clear:left"><strong>Related Posts</strong></div>
<ul>
	<li><a href="/2007/12/15/amazon-simpledb-web-service-complementing-the-ec2-compute-cloud/">Amazon SimpleDB web service complementing the EC2 compute cloud</a></li>
	<li><a href="/2007/04/06/amazon-ec2-the-future-of-rails-hosting/%22">Amazon EC2 - The Future of (Rails-) Hosting?</a></li>
</ul>
