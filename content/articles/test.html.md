---
title: A Test Article
tags:
  - welcome
  - sample
  - test
created_at: 2010-06-26 23:13:00
---

Lorem ipsum, you know, you know...

<% code 'ruby' do %>
module Test

  class Color < Vision

    def initialize(options = {})
      @options = options.symbolize_keys
    end

    def self.colorize
      puts "I am colorful"
      send :done
    end

  end

end
<% end %>

And now some more:

<% code 'ruby' do %>
module Test2

  # let's say we have this ultra-long comment line explaining in-depth why wo now have to call the module Test2 instead of Test and how this dramatically improved code expressiveness
  class Color < Vision

    def initialize(options = {})
      @options = options.symbolize_keys
    end

    def self.colorize
      puts "I am colorful"
      send :done
    end

  end

end
<% end %>
