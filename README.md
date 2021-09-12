# Thunderbird User.JS

> Thunderbird privacy, security and anti-fingerprinting: a comprehensive user.js template for configuration and hardening

### :purple_square: user.js

An `user.js` is a configuration file that can control hundreds of Thunderbird settings.  
For a more technical breakdown and explanation, you can read more on the [overview](https://github.com/HorlogeSkynet/thunderbird-user.js/wiki/1.1-Overview) Wiki page.

### :green_square: Thunderbird user.js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The `thunderbird user.js` is a **template** which aims to provide as much privacy and enhanced security as possible, and to reduce tracking and fingerprinting as much as possible - while minimizing any loss of functionality and breakage (but it will happen).

Everyone, experts included, should at least read the [implementation](https://github.com/HorlogeSkynet/thunderbird-user.js/wiki/1.3-Implementation) wiki page.

It differs from the `arkenfox user.js` in that the focus is to keep Thunderbird as an **e-mail client** and disable as many web browsing features as possible. We believe web browsing should be done in a web browser, and not an email client.

- If you're using Thunderbird (< 68) with Tor we suggest that you install the [TorBirdy](https://addons.thunderbird.net/addon/torbirdy) add-on. If you are using Tor, you should also consider using [Tails](https://tails.boum.org/) or [Whonix](https://www.whonix.org/).
- If you're using **Gmail**, please check [this article about OAuth2](https://github.com/HorlogeSkynet/thunderbird-user.js/wiki/3.1-OAuth2-Users).
- For information about [extensions](https://github.com/HorlogeSkynet/thunderbird-user.js/wiki/4.1-Extensions), see the Wiki.
- **Calendar** users should [see this page](https://github.com/HorlogeSkynet/thunderbird-user.js/wiki/4.1.1-Calendar).

Also be aware that this `user.js` is made specifically for Thunderbird and has only been tested in the latest stable release.

### :orange_square: Sitemap

- [Releases](https://github.com/HorlogeSkynet/thunderbird-user.js/releases)
- [Issues](https://github.com/HorlogeSkynet/thunderbird-user.js/issues)
- [Wiki](https://github.com/HorlogeSkynet/thunderbird-user.js/wiki)

### :red_square: Acknowledgments

* @tya99 most of the ground work and initial port from the Firefox version of [arkenfox user.js](https://github.com/arkenfox/user.js)
* [@dngray](https://github.com/dngray) continual maintenance and Wiki
* [@HorlogeSkynet](https://github.com/HorlogeSkynet) continual maintenance

### :blue_square: Related Projects

* [Privacy Handbuch](https://www.privacy-handbuch.de/handbuch_31p.htm)
* [Privacy Haters](http://r-36.net/scm/privacy-haters/file/README.md.html)
* [12bytes.org's user-overrides.js](https://codeberg.org/12bytes.org/thunderbird-user.js-supplement)
* ~~CHEF-KOCH/TBCK~~
