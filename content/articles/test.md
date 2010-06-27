---
title: A Test Article
kind: article
created_at: 2010-06-26 23:13:00
---
Lorem ipsum, you know, you know...

{:nomarkdown}
<pre><code class="language-ruby">module Test

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
</code></pre>
{:/}
