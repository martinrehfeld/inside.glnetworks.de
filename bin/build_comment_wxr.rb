#!/usr/bin/env ruby

require 'rubygems'
require 'nokogiri'
require 'uri'

comments_filename = File.expand_path(File.join(File.dirname(__FILE__), '..', 'legacy', 'comments.sql.xml'))
posts_filename    = File.expand_path(File.join(File.dirname(__FILE__), '..', 'legacy', 'posts.sql.xml'))

#
# Build Post map
#
doc = Nokogiri::XML(File.open(posts_filename))

posts = {}
doc.xpath('//wp2_posts').each do |post_node|
  id  = post_node.at_xpath('ID').content
  url = post_node.at_xpath('guid').content
  posts[id] = {
    :title          => post_node.at_xpath('post_title').content,
    :link           => url,
    :identifier     => ("/articles#{URI.parse(url).path}" rescue nil),
    :date           => post_node.at_xpath('post_date_gmt').content,
    :comment_status => post_node.at_xpath('comment_status').content,
    :content        => post_node.at_xpath('post_content').content,
    :comments       => []
  }
end

#
# Proceess comments
#
doc = Nokogiri::XML(File.open(comments_filename))

doc.xpath('//wp2_comments').each do |comment_node|
  approved = comment_node.at_xpath('comment_approved').content
  next unless approved == '1'

  post_id = comment_node.at_xpath('comment_post_ID').content
  posts[post_id][:comments] << {
    :id           => comment_node.at_xpath('comment_ID').content,
    :approved     => approved,
    :author       => comment_node.at_xpath('comment_author').content,
    :author_email => comment_node.at_xpath('comment_author_email').content,
    :author_url   => comment_node.at_xpath('comment_author_url').content,
    :author_ip    => comment_node.at_xpath('comment_author_IP').content,
    :date         => comment_node.at_xpath('comment_date_gmt').content,
    :content      => comment_node.at_xpath('comment_content').content,
    :parent       => comment_node.at_xpath('comment_parent').content
  }
end

#
# Build WXR format
#

builder = Nokogiri::XML::Builder.new(:encoding => 'UTF-8') do |xml|
  xml.rss(
    'version'       => '2.0',
    'xmlns:content' => 'http://purl.org/rss/1.0/modules/content/',
    'xmlns:dsq'     => 'http://www.disqus.com/',
    'xmlns:dc'      => 'http://purl.org/dc/elements/1.1/',
    'xmlns:wp'      => 'http://wordpress.org/export/1.0/'
  ) {
    xml.channel {
      posts.each_pair do |id, post|
        next if post[:comments].empty?

        xml.item {
          xml.title post[:title]
          xml.link post[:link]
          xml['content'].encoded post[:content]
          xml['dsq'].thread_identifier post[:identifier]
          xml['wp'].post_date_gmt post[:date]
          xml['wp'].comment_status post[:comment_status]

          post[:comments].each do |comment|
            xml['wp'].comment {
              xml['wp'].comment_id comment[:id]
              xml['wp'].comment_author comment[:author]
              xml['wp'].comment_author_email comment[:author_email]
              xml['wp'].comment_author_url comment[:author_url]
              xml['wp'].comment_author_IP comment[:author_ip]
              xml['wp'].comment_date_gmt comment[:date]
              xml['wp'].comment_content comment[:content]
              xml['wp'].comment_approved comment[:approved]
              xml['wp'].comment_parent comment[:parent]
            }
          end
        }
      end
    }
  }
end
puts builder.to_xml
