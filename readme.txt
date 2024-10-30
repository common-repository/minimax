=== minimax ===
Contributors: sebaxtian
Tags: AJAX
Requires at least: 2.4
Tested up to: 2.9.2
Stable tag: 0.3.7

Minimax is a minimal Ajax library.

== Description ==

This plugin is required by other plugins I have developed. Take a look at the readme.txt in the `/doc/` directory to know what can minimax do.

These are the plugins that use minimax:

* [iRate](http://wordpress.org/extend/plugins/irate/ "iRateMyDay plugin")
* [Lexi](http://wordpress.org/extend/plugins/lexi/ "RSS widget using Ajax")
* [Schreikasten](http://wordpress.org/extend/plugins/schreikasten/ "A Shoutbox using Ajax and Akismet")
* [MudSlideShow](http://wordpress.org/extend/plugins/mudslideshow/ "An image gallery plugin using PicasaWeb")
* [Kalendas](http://wordpress.org/extend/plugins/kalendas/ "Google Calendar Events list in Wordpress")

== Installation ==

1. Decompress minimax.zip and upload `/minimax/` to the `/wp-content/plugins/` directory.
2. Activate the plugin through the __Plugins__ menu in WordPress

== Frequently Asked Questions ==

= Why minimax? =

Because it's a minimal ajax library.

= How do yo dare to create another Ajax library? =

Yes, I know there are many Ajax libraries available, but they are too complex and I need just the basic part. Also add those libraries in each plugin would be a __redundanct code__ situation.

= But, you know, there is an Ajax library in WP! =

Yes, there is an Ajax library in WP, but I need an extra element it hasn't, and hacking the WP Ajax library wasn't an user friendly situation in order to make a plugin easy to install by common users. A common user wants to install, not to hack.

= Can I use minimax with my plugins? =

Yes you can. Take a look at the readme file in `/doc/` directory, and see the example. Remember this is an Ajax library, so it has the same limits other Ajax libraries do have.

== Changelog ==

= 0.3.7 =
* Added function mnmx_xmlentities
* Added a library with common javascript functions (check_email and email_intext)

= 0.3.6 =
* New cache system fixed.

= 0.3.5 =
* Ok, as lusers don't read the FAQ I have to create the cache dir elsewhere to not have problems with cache plugins. Sorry guys, have to recreate the fuking cache.

= 0.3.4 =
* New cache system to solve a bug with cache plugins.

= 0.3.3 =
* Using fsockopen when server hasn't curl installed and is an external file.

= 0.3.2 =
* Javascript code depured with validators.

= 0.3.1 =
* Changed the CRLE in the script.

= 0.3 =
* The stable release, probed with IE, Firefox, Safari and Chrome

= 0.2.9.1 =
* The code has been indented, documented and standardised.

= 0.2.9 =
* Return false if can't conect to the filename (function mnmx_readfile).
* Use fopen instead of cUrl if the file is local.

= 0.2.8 =
* Now you can set the event handler. See the readme.txt in the example directory.

= 0.2.7 =
* This is a requiered update. 
* Developed a new semaphore system to solve a situation with IE.
