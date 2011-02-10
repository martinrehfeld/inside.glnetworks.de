---
title: WeatherTime Screensaver Plugin for Slimserver
tags:
  - Announcements
  - Slimserver
  - Tools
created_at: 2006-06-05 12:00:00
---

Upgrade your network music player to a weather station now! Get the free WeatherTime Screensaver Plugin for Slimserver - brought to you by <a title="GL Networks Inside" href="http://inside.glnetworks.de/">GL Networks Inside</a>.

WeatherTime is a screensaver to show graphical weather forecasts along with the current date and time on <a href="http://www.slimdevices.com/">Slim Devices</a> great network music players SLIMP3 and Squeezebox. It is a intended replacement for the standard DateTime screensaver.

<strong>Neat Features</strong>
<ul>
	<li>fetches weather data online from Wunderground.Com</li>
	<li>displays graphical icons for weather conditions along with weather data</li>
	<li>supports both metric and imperial units</li>
	<li>supports English, German, French (contributed by <a title="mail Daniel Born" href="mailto:born_daniel@yahoo.com">Daniel Born</a>) and Dutch (contributed by <a title="mail Willem Oepkes" href="mailto:oepkes@klq.nl">Willem Oepkes</a> and <a title="mail Mark Ruys" href="mailto:mark@paracas.nl">Mark Ruys</a>) menus and weather infomation</li>
</ul>
<div style="text-align: center"><img alt="WeatherTime screenshot current conditions..." id="image8" src="/2006/03/11/weathertime-screensaver-plugin-for-slimserver/WeatherTime-screen2.jpg" /></div>
<div style="text-align: center"><img id="image10" alt="WeatherTime screenshot forecast..." src="/2006/03/11/weathertime-screensaver-plugin-for-slimserver/WeatherTime-screen3.jpg" /></div>
<strong>
Installation</strong>
<ul>
	<li>For the 7.x series of Squeezecenter download <a href="/2006/03/11/weathertime-screensaver-plugin-for-slimserver/Plugins-WeatherTime-Plugin r152.zip" title="Plugins-WeatherTime-Plugin r152.zip">WeatherTime 2.2.1 (zip)</a> and visit the <a title="WeatherTime Project on Google Code" target="_blank" href="http://weathertime.googlecode.com">project's page on Googlecode</a> for further instructions.</li>
	<li>For the 6.5 series of Slimserver download <a href="/2006/03/11/weathertime-screensaver-plugin-for-slimserver/weathertime_1_9_5.zip">WeatherTime 1.9.5 (zip)</a></li>
	<li>Extract the archive into the 'Plugins' directory of your Slimserver installation</li>
	<li>Restart Slimserver</li>
	<li>Activate the plugin and set up the WeatherTime options in Slimserver's plugin settings</li>
	<li>Activate WeatherTime as a screensaver for off-mode and/or on inactivity in your player settings. The easiest way to do this is the SlimServer web frontend (Player settings).</li>
</ul>
<strong>Hints and Tips</strong>
<ul>
	<li>You can browse through the weather forecasts of the coming days with the up and down arrows on your remote.</li>
	<li>You can manually start (e.g. not enabling it as a screensaver) WeatherTime from the Plugin menu of your player - press PLAY.</li>
	<li>To avoid truncation of the date and time information, choose short display formats in Slimserver's Server Settings -> Formatting. Even shorter date formats are available in WeatherTime's plugin settings. You may also choose not to display the date at all.</li>
	<li>Report issues and seek solutions at the <a title="Slim Devices Forum" href="http://forums.slimdevices.com/showthread.php?t=21989">Slim Devices Plugins Forum WeatherTime thread</a></li>
</ul>
<strong>Restrictions & Known Bugs</strong>
<ul>
	<li>Needs a Squeezebox2 or better to show weather condition icons and detailed info, the SLIMP3 and SqueezeboxG devices will show text only information</li>
	<li>Truncation of weather condition texts may occur occasionally for rather long texts</li>
</ul>
