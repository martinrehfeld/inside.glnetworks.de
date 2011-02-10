---
title: Amazon SimpleDB web service complementing the EC2 compute cloud
tags:
  - Amazon Web Services
  - Announcements
  - Ruby on Rails
created_at: 2007-12-15 12:00:00
---

Amazon Web Services yesterday announced its latest creation: <a href="http://aws.amazon.com/simpledb">SimpleDB</a>. <a href="http://aws.amazon.com/simpledb">SimpleDB</a> is a database-like storage service for structured data. It complements <a href="http://aws.amazon.com/ec2">EC2</a> (the Elastic Compute Cloud) and <a href="http://aws.amazon.com/s3">S3</a> (the Simple Storage Service), potentially enabling web applications to run solely on Amazon's service stack. SimpleDB has a couple of limitations compared to traditional relational databases, the most important being:
<ul>
	<li>No joined queries against multiple tables (or domains, as Amazon puts it)</li>
	<li>No transactions protecting multiple updates</li>
	<li>No instant data updates, i.e. you might get "old" data when you query data that was updated very recently</li>
</ul>
We will have to wait and see what kind of applications SimpleDB can support regardless of these limitations. On the plus side we get the usual benefits of Amazon's Web Services:
<ul>
	<li>very good scalability</li>
	<li>high availability</li>
	<li>low cost / pay for usage</li>
</ul>
At <a href="http://www.glnetworks.de/">GL Networks</a> we will definately take a close look at SimpleDB, possibly bridging it to <a href="http://www.rubyonrails.org/">Rails</a> via the <a href="http://api.rubyonrails.org/classes/ActiveResource.html">ActiveResource</a> framework.

SimpleDB will enter a closed beta program very soon.

<strong>Related Post:</strong> <a href="/2007/04/06/amazon-ec2-the-future-of-rails-hosting/">Amazon EC2 - The Future of (Rails-) Hosting?</a>

