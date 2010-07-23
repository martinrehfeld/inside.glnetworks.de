Issues & Tasks
==============

TODO
----
* make it personal -- this is my blog after all
* Contact page (get in touch)
* Readme
@item[:excerpt].blank?
* rake publish task
* style the beast

Can do
------
* provide URL schema compatible with my legagy content (/YYYY/MM/DD/<slug>/)
  -> this can be achieved reltively easily by using the same folder structure
* (have separate project pages for the OS projects) -- might be a single page with references to other sites for now
* Featured projects/articles -- whatever; in sidebar
* Fork me on Github
* Recommend me on WWR
* Gravatar for author
* Link author name to some public profile (XING / Github, ...)
* Social blah buttons for articles
* rake article:new title="..." task
* show public schedule from Google calendar

Done
----
* Feedburner integration
  ok: just set new feed source on Feedburner to /feed/atom.xml
* add keyword + description headers
    %meta(name="keywords" content="#{keywords}") # list all tags here
    %meta(name="description" content="#{@item[:excerpt]}") # unless