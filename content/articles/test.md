---
title: A Test Article
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
