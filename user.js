/******
* name: ghacks thunderbird user.js
* date: 16 April 2020
* version v68.0-beta4: "Knock on Pants"
* authors: v52+ github | v51- www.ghacks.net
* url: https://github.com/HorlogeSkynet/thunderbird-user.js
* license: MIT (https://github.com/HorlogeSkynet/thunderbird-user.js/blob/master/LICENSE)
* releases: https://github.com/HorlogeSkynet/thunderbird-user.js/releases

* README:
  0. Consider using Tor, use TorBirdy as well.
    * https://addons.thunderbird.net/addon/torbirdy
  1. READ the full README
    * https://github.com/HorlogeSkynet/thunderbird-user.js/blob/master/README.md
  2. READ this
    * https://github.com/HorlogeSkynet/thunderbird-user.js/wiki/1.3-Implementation
  3. If you skipped steps 1 and 2 above (shame on you), then here is the absolute minimum
    * Auto-installing updates for Thunderbird and extensions are disabled (section 0302's)
    * Real time binary checks with Google services are disabled (section 0414's)
    * Browsing related technologies, and JavaScript disabled. Use your web browser for browsing.
    * You will need to make changes, and to troubleshoot at times (choose wisely, there is always a trade-off).
       While not 100% definitive, search for "[SETUP". If required, add each pref to your overrides section at
       default values (or comment them out and reset them in about:config). Here are the main ones:
        [SETUP-INSTALL] if you experience any issue during Thunderbird setting up, read it
        [SETUP-FEATURE] if you miss some (expected) Thunderbird features, read it
       [SETUP-SECURITY] it's one item, read it
            [SETUP-WEB] can cause some websites to break
         [SETUP-CHROME] changes how Thunderbird itself behaves (i.e. NOT directly website related)
           [SETUP-PERF] may impact performance
         [SETUP-HARDEN] maybe you should consider using the Tor Browser
    * [WARNING] tags are extra special and used sparingly, so heed them
  4. BACKUP your profile folder before implementing (and/or test in a new/cloned profile)
  5. KEEP UP TO DATE: https://github.com/HorlogeSkynet/thunderbird-user.js/wiki#small_orange_diamond-maintenance

* INDEX:
  0100: STARTUP
  0200: GEOLOCATION
  0300: QUIET BIRD
  0400: BLOCKLISTS / SAFE BROWSING
  0500: SYSTEM ADD-ONS / EXPERIMENTS
  0600: BLOCK IMPLICIT OUTBOUND
  0700: HTTP* / TCP/IP / DNS / PROXY / SOCKS etc
  0800: HISTORY / FORMS
  1000: CACHE / FAVICONS
  1200: HTTPS (SSL/TLS / OCSP / CERTS / HPKP / CIPHERS)
  1400: FONTS
  1600: HEADERS / REFERERS
  1800: PLUGINS
  2000: MEDIA / CAMERA / MIC
  2200: WINDOW MEDDLING & LEAKS / POPUPS
  2300: WEB WORKERS
  2400: DOM (DOCUMENT OBJECT MODEL) & JAVASCRIPT
  2600: MISCELLANEOUS
  2700: PERSISTENT STORAGE
  2800: SHUTDOWN
  4000: FPI (FIRST PARTY ISOLATION)
  4500: RFP (RESIST FINGERPRINTING)
  4600: RFP ALTERNATIVES
  4700: RFP ALTERNATIVES (NAVIGATOR / USER AGENT (UA) SPOOFING)
  5000: PERSONAL
  6000: THUNDERBIRD (AUTO CONFIG / UI / HEADERS / ADDRESS BOOK)
  6100: EMAIL COMPOSITION (ENCODING / FORMAT / VIEW)
  6200: OTHER THUNDERBIRD COMPONENTS (CHAT / CALENDAR / RSS)
  6300: THUNDERBIRD ENCRYPTION (ENIGMAIL / AUTOCRYPT)
  9999: DEPRECATED / REMOVED / LEGACY / RENAMED

******/

/* START: internal custom pref to test for syntax errors
 * [NOTE] In FF60+, not all syntax errors cause parsing to abort i.e. reaching the last debug
 * pref no longer necessarily means that all prefs have been applied. Check the console right
 * after startup for any warnings/error messages related to non-applied prefs
 * [1] https://blog.mozilla.org/nnethercote/2018/03/09/a-new-preferences-parser-for-firefox/ ***/
user_pref("_user.js.parrot", "START: Oh yes, the Norwegian Blue... what's wrong with it?");

/*** [SECTION 0100]: STARTUP ***/
user_pref("_user.js.parrot", "0100 syntax error: the parrot's dead!");
/* 0101: disable default browser check
 * [SETTING] Edit>Preferences>Advanced>Always check to see if Thunderbird is the default mail client on startup ***/
user_pref("mail.shell.checkDefaultMail", false);
/* 0102: set START page
 * [SETTING] Edit>Preferences>General>Thunderbird Start Page ***/
user_pref("mailnews.start_page.enabled", false);

/*** [SECTION 0200]: GEOLOCATION ***/
user_pref("_user.js.parrot", "0200 syntax error: the parrot's definitely deceased!");
/* 0201: disable Location-Aware Browsing
 * [1] https://www.mozilla.org/firefox/geolocation/ ***/
user_pref("geo.enabled", false);
/* 0201b: set a default permission for Location [FF58+]
 * 0=always ask (default), 1=allow, 2=block
 * [NOTE] Best left at default "always ask", fingerprintable via Permissions API
 * [SETTING] to add site exceptions: Page Info>Permissions>Access Your Location
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Location>Settings ***/
   // user_pref("permissions.default.geo", 2);
/* 0202: disable GeoIP-based search results
 * [NOTE] May not be hidden if Firefox has changed your settings due to your locale
 * [1] https://trac.torproject.org/projects/tor/ticket/16254
 * [2] https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_geolocation-for-default-search-engine ***/
user_pref("browser.search.region", "US"); // [HIDDEN PREF]
user_pref("browser.search.geoip.url", "");
/* 0205: set Thunderbird language [FF59+] [RESTART]
 * Go to the end of about:support to view Internationalization & Localization settings
 * If set to empty, the OS locales are used. If not set at all, default locale is used
 * This is the language used in menus, about pages, messages, and notifications from Firefox ***/
   // user_pref("intl.locale.requested", "en-US"); // [HIDDEN PREF]
/* 0206: disable geographically specific results/search engines e.g. "browser.search.*.US"
 * i.e. ignore all of Mozilla's various search engines in multiple locales ***/
user_pref("browser.search.geoSpecificDefaults", false);
user_pref("browser.search.geoSpecificDefaults.url", "");
/* 0207: set preferred language for diplaying web pages
 * [TEST] https://addons.mozilla.org/about ***/
user_pref("intl.accept_languages", "en-US, en");
/* 0208: Set dictionary to US ***/
user_pref("spellchecker.dictionary", "en-US");
/* 0209: use APP locale over OS locale in regional preferences [FF56+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1379420,1364789 ***/
user_pref("intl.regional_prefs.use_os_locales", false);

/*** [SECTION 0300]: QUIET BIRD
     Starting in user.js v68, we only disable the auto-INSTALL of Thunderbird.
     You still get prompts to update, in one click.
     We have NEVER disabled auto-CHECKING, and highly discourage that.
     Previously we also disabled auto-INSTALLING of extensions (0302b).
     There are many legitimate reasons to turn off auto-INSTALLS, including hijacked or monetized
     extensions, time constraints, legacy issues, dev/testing, and fear of breakage/bugs. It is
     still important to do updates for security reasons, please do so manually if you make changes.
***/
user_pref("_user.js.parrot", "0300 syntax error: the parrot's not pinin' for the fjords!");
/* 0301b: disable auto-CHECKING for extension and theme updates ***/
   // user_pref("extensions.update.enabled", false);
/* 0302a: disable auto-INSTALLING Thunderbird updates [SETUP-INSTALL] [NON-WINDOWS FF65+]
 * [NOTE] In FF65+ on Windows this SETTING (below) is now stored in a file and the pref was removed
 * [SETTING] General>Firefox Updates>Check for updates but let you choose... ***/
user_pref("app.update.auto", false);
/* 0302b: disable auto-INSTALLING extension and theme updates (after the check in 0301b)
 * [SETTING] about:addons>Extensions>[cog-wheel-icon]>Update Add-ons Automatically (toggle) ***/
   // user_pref("extensions.update.autoUpdateDefault", false);
/* 0306: disable extension metadata
 * used when installing/updating an extension, and in daily background update checks: if false, it
 * hides the expanded text description (if it exists) when you "show more details about an addon" ***/
   // user_pref("extensions.getAddons.cache.enabled", false);
/* 0308: disable search update
 * [SETTING] General>Firefox Updates>Automatically update search engines ***/
user_pref("browser.search.update", false);
/* 0310: disable sending the URL of the website where a plugin crashed ***/
user_pref("dom.ipc.plugins.reportCrashURL", false);
/* 0320: disable about:addons' Recommendations pane (uses Google Analytics) ***/
user_pref("extensions.getAddons.showPane", false); // [HIDDEN PREF]
/* 0321: disable recommendations in about:addons' Extensions and Themes panes [FF68+] ***/
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("extensions.webservice.discoverURL", "");
/* 0330: disable telemetry
 * the pref (.unified) affects the behavior of the pref (.enabled)
 * IF unified=false then .enabled controls the telemetry module
 * IF unified=true then .enabled ONLY controls whether to record extended data
 * so make sure to have both set as false.
 * Restoring prompted=0 would make TB ask you on fresh install.
 * [NOTE] FF58+ `toolkit.telemetry.enabled` is now LOCKED to reflect prerelease
 * or release builds (true and false respectively), see [2].
 * [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
 * [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE] above FF58+
user_pref("toolkit.telemetry.prompted", 2);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
user_pref("toolkit.telemetry.hybridContent.enabled", false); // [FF59+]
/* 0340: disable Health Reports
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical... data ***/
user_pref("datareporting.healthreport.uploadEnabled", false);
/* 0341: disable new data submission, master kill switch [FF41+]
 * If disabled, no policy is shown or upload takes place, ever
 * [1] https://bugzilla.mozilla.org/1195552 ***/
user_pref("datareporting.policy.dataSubmissionEnabled", false);
/* 0342: disable Studies (see 0503)
 * [NOTE] This pref has no effect when Health Reports (0340) are disabled
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>...>Allow Firefox to install and run studies ***/
user_pref("app.shield.optoutstudies.enabled", false);
/* 0350: disable Crash Reports ***/
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false); // [FF44+]
user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // [FF51+]
/* 0351: disable backlogged Crash Reports
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send backlogged crash reports  ***/
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [FF58+]
/* 0390: disable Captive Portal detection
 * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy
 * [2] https://wiki.mozilla.org/Necko/CaptivePortal ***/
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false); // [FF52+]

/*** [SECTION 0400]: BLOCKLISTS / SAFE BROWSING (SB)
     Safe Browsing has taken many steps to preserve privacy. *IF* required, a full url is never
     sent to Google, only a PART-hash of the prefix, and this is hidden with noise of other real
     PART-hashes. Google also swear it is anonymized and only used to flag malicious sites.
     Firefox also takes measures such as striping out identifying parameters and since SBv4 (FF57+)
     doesn't even use cookies. (#Turn on browser.safebrowsing.debug to monitor this activity)

     #Required reading [#] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
     [1] https://wiki.mozilla.org/Security/Safe_Browsing
***/
user_pref("_user.js.parrot", "0400 syntax error: the parrot's passed on!");
/** BLOCKLISTS ***/
/* 0401: enforce Firefox blocklist, but sanitize blocklist url
 * [NOTE] It includes updates for "revoked certificates"
 * [1] https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/
 * [2] https://trac.torproject.org/projects/tor/ticket/16931 ***/
user_pref("extensions.blocklist.enabled", true); // [DEFAULT: true]
user_pref("extensions.blocklist.url", "https://blocklists.settings.services.mozilla.com/v1/blocklist/3/%APP_ID%/%APP_VERSION%/");
/* 0402: disable binaries NOT in Safe Browsing local lists being checked
 * This is a real-time check with Google services
 * [SETUP-SECURITY] If you do not understand this, or if you want this protection, then override it ***/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
/* 0403: disable 'ignore this warning' on Safe Browsing warnings
 * If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
 * [TEST] see github wiki APPENDIX A: Test Sites: Section 5
 * [1] https://bugzilla.mozilla.org/1226490 ***/
   // user_pref("browser.safebrowsing.allowOverride", false);

/*** [SECTION 0500]: SYSTEM ADD-ONS / EXPERIMENTS
     System Add-ons are a method for shipping extensions, considered to be
     built-in features to Firefox, that are hidden from the about:addons UI.
     To view your System Add-ons go to about:support, they are listed under "Firefox Features"

     Some System Add-ons have no on-off prefs. Instead you can manually remove them. Note that app
     updates will restore them. They may also be updated and possibly restored automatically (see 0505)
     * Portable: "...\App\Firefox64\browser\features\" (or "App\Firefox\etc" for 32bit)
     * Windows: "...\Program Files\Mozilla\browser\features" (or "Program Files (X86)\etc" for 32bit)
     * Mac: "...\Applications\Firefox\Contents\Resources\browser\features\"
            [NOTE] On Mac you can right-click on the application and select "Show Package Contents"
     * Linux: "/usr/lib/firefox/browser/features" (or similar)

     [1] https://firefox-source-docs.mozilla.org/toolkit/mozapps/extensions/addon-manager/SystemAddons.html
     [2] https://dxr.mozilla.org/mozilla-central/source/browser/extensions
***/
user_pref("_user.js.parrot", "0500 syntax error: the parrot's cashed in 'is chips!");
/* 0503: disable Normandy/Shield [FF60+]
 * Shield is an telemetry system (including Heartbeat) that can also push and test "recipes"
 * [1] https://wiki.mozilla.org/Firefox/Shield
 * [2] https://github.com/mozilla/normandy ***/
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
/* 0505: disable System Add-on updates ***/
user_pref("extensions.systemAddon.update.enabled", false); // [FF62+]
user_pref("extensions.systemAddon.update.url", ""); // [FF44+]
/* 0506: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
 * Currently blocked by 'datareporting.healthreport.uploadEnabled' (see 0340) ***/
user_pref("browser.ping-centre.telemetry", false);
/* 0517: disable Form Autofill
 * [NOTE] Stored data is NOT secure (uses a JSON file)
 * [NOTE] Heuristics controls Form Autofill on forms without @autocomplete attributes
 * [SETTING] Privacy & Security>Forms & Passwords>Autofill addresses
 * [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill
 * [2] https://www.ghacks.net/2017/05/24/firefoxs-new-form-autofill-is-awesome/ ***/
user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
user_pref("extensions.formautofill.available", "off"); // [FF56+]
user_pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
user_pref("extensions.formautofill.heuristics.enabled", false); // [FF55+]
/* 0518: disable Web Compatibility Reporter [FF56+]
 * Web Compatibility Reporter adds a "Report Site Issue" button to send data to Mozilla ***/
user_pref("extensions.webcompat-reporter.enabled", false);

/*** [SECTION 0600]: BLOCK IMPLICIT OUTBOUND [not explicitly asked for - e.g. clicked on] ***/
user_pref("_user.js.parrot", "0600 syntax error: the parrot's no more!");
/* 0601: disable link prefetching
 * [1] https://developer.mozilla.org/docs/Web/HTTP/Link_prefetching_FAQ ***/
user_pref("network.prefetch-next", false);
/* 0602: disable DNS prefetching
 * [1] https://www.ghacks.net/2013/04/27/firefox-prefetching-what-you-need-to-know/
 * [2] https://developer.mozilla.org/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control ***/
user_pref("network.dns.disablePrefetch", true);
user_pref("network.dns.disablePrefetchFromHTTPS", true); // [HIDDEN PREF]
/* 0603: disable predictor / prefetching ***/
user_pref("network.predictor.enabled", false);
user_pref("network.predictor.enable-prefetch", false); // [FF48+]
/* 0605: disable link-mouseover opening connection to linked server
 * [1] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests
 * [2] https://www.ghacks.net/2015/08/16/block-firefox-from-connecting-to-sites-when-you-hover-over-links/ ***/
user_pref("network.http.speculative-parallel-limit", 0);
/* 0606: disable pings (but enforce same host in case)
 * [1] http://kb.mozillazine.org/Browser.send_pings
 * [2] http://kb.mozillazine.org/Browser.send_pings.require_same_host ***/
user_pref("browser.send_pings", false); // [DEFAULT: false]
user_pref("browser.send_pings.require_same_host", true);

/*** [SECTION 0700]: HTTP* / TCP/IP / DNS / PROXY / SOCKS etc ***/
user_pref("_user.js.parrot", "0700 syntax error: the parrot's given up the ghost!");
/* 0701: disable IPv6
 * IPv6 can be abused, especially regarding MAC addresses. They also do not play nice
 * with VPNs. That's even assuming your ISP and/or router and/or website can handle it.
 * Firefox telemetry (April 2019) shows only 5% of all connections are IPv6.
 * [NOTE] This is just an application level fallback. Disabling IPv6 is best done at an
 * OS/network level, and/or configured properly in VPN setups. If you are not masking your IP,
 * then this won't make much difference. If you are maksing your IP, then it can only help.
 * [TEST] http://ipv6leak.com/
 * [1] https://github.com/ghacksuserjs/ghacks-user.js/issues/437#issuecomment-403740626
 * [2] https://www.internetsociety.org/tag/ipv6-security/ (see Myths 2,4,5,6) ***/
user_pref("network.dns.disableIPv6", true);
/* 0702: disable HTTP2
 * HTTP2 raises concerns with "multiplexing" and "server push", does nothing to
 * enhance privacy, and opens up a number of server-side fingerprinting opportunities.
 * [WARNING] Disabling this made sense in the past, and doesn't break anything, but HTTP2 is
 * at 35% (April 2019) and growing [5]. Don't be that one person using HTTP1.1 on HTTP2 sites
 * [1] https://http2.github.io/faq/
 * [2] https://blog.scottlogic.com/2014/11/07/http-2-a-quick-look.html
 * [3] https://http2.github.io/http2-spec/#rfc.section.10.8
 * [4] https://queue.acm.org/detail.cfm?id=2716278
 * [5] https://w3techs.com/technologies/details/ce-http2/all/all ***/
   // user_pref("network.http.spdy.enabled", false);
   // user_pref("network.http.spdy.enabled.deps", false);
   // user_pref("network.http.spdy.enabled.http2", false);
   // user_pref("network.http.spdy.websockets", false); // [FF65+]
/* 0703: disable HTTP Alternative Services [FF37+]
 * [SETUP-PERF] Relax this if you have FPI enabled (see 4000) *AND* you understand the
 * consequences. FPI isolates these, but it was designed with the Tor protocol in mind,
 * and the Tor Browser has extra protection, including enhanced sanitizing per Identity.
 * [1] https://tools.ietf.org/html/rfc7838#section-9
 * [2] https://www.mnot.net/blog/2016/03/09/alt-svc ***/
user_pref("network.http.altsvc.enabled", false);
user_pref("network.http.altsvc.oe", false);
/* 0704: enforce the proxy server to do any DNS lookups when using SOCKS
 * e.g. in Tor, this stops your local DNS server from knowing your Tor destination
 * as a remote Tor node will handle the DNS request
 * [1] http://kb.mozillazine.org/Network.proxy.socks_remote_dns
 * [2] https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers ***/
user_pref("network.proxy.socks_remote_dns", true);
/* 0707: disable (or setup) DNS-over-HTTPS (DoH) [FF60+]
 * TRR = Trusted Recursive Resolver
 * .mode: 0=off, 1=race, 2=TRR first, 3=TRR only, 4=race for stats but always use native result
 * [WARNING] DoH bypasses hosts and gives info to yet another party (e.g. Cloudflare)
 * [1] https://www.ghacks.net/2018/04/02/configure-dns-over-https-in-firefox/
 * [2] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/ ***/
   // user_pref("network.trr.mode", 0);
   // user_pref("network.trr.bootstrapAddress", "");
   // user_pref("network.trr.uri", "");
/* 0708: disable FTP [FF60+]
 * [1] https://www.ghacks.net/2018/02/20/firefox-60-with-new-preference-to-disable-ftp/ ***/
user_pref("network.ftp.enabled", false);
/* 0709: disable using UNC (Uniform Naming Convention) paths [FF61+]
 * [SETUP-CHROME] Can break extensions for profiles on network shares
 * [1] https://trac.torproject.org/projects/tor/ticket/26424 ***/
user_pref("network.file.disable_unc_paths", true); // [HIDDEN PREF]
/* 0710: disable GIO as a potential proxy bypass vector
 * Gvfs/GIO has a set of supported protocols like obex, network, archive, computer, dav, cdda,
 * gphoto2, trash, etc. By default only smb and sftp protocols are accepted so far (as of FF64)
 * [1] https://bugzilla.mozilla.org/1433507
 * [2] https://trac.torproject.org/23044
 * [3] https://en.wikipedia.org/wiki/GVfs
 * [4] https://en.wikipedia.org/wiki/GIO_(software) ***/
user_pref("network.gio.supported-protocols", ""); // [HIDDEN PREF]

/*** [SECTION 0800]: HISTORY / FORMS
     Consider your environment (no unwanted eyeballs), your device (restricted access),
     your device's unattended state (locked, encrypted, forensic hardened).
***/
user_pref("_user.js.parrot", "0800 syntax error: the parrot's ceased to be!");
/* 0801: disable location bar using search
 * Don't leak URL typos to a search engine, give an error message instead.
 * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
 * [NOTE] Search buttons in the dropdown work, but hitting 'enter' in the location bar will fail
 * [TIP] You can add keywords to search engines in options (e.g. 'd' for DuckDuckGo) and
 * the dropdown will now auto-select it and you can then hit 'enter' and it will work
 * [SETUP-CHROME] If you don't, or rarely, type URLs, or you use a default search
 * engine that respects privacy, then you probably don't need this ***/
user_pref("keyword.enabled", false);  // [DEFAULT: false]
/* 0802: disable location bar domain guessing
 * domain guessing intercepts DNS "hostname not found errors" and resends a
 * request (e.g. by adding www or .com). This is inconsistent use (e.g. FQDNs), does not work
 * via Proxy Servers (different error), is a flawed use of DNS (TLDs: why treat .com
 * as the 411 for DNS errors?), privacy issues (why connect to sites you didn't
 * intend to), can leak sensitive data (e.g. query strings: e.g. Princeton attack),
 * and is a security risk (e.g. common typos & malicious sites set up to exploit this) ***/
user_pref("browser.fixup.alternate.enabled", false);
/* 0805: disable CSS querying page history - CSS history leak
 * [NOTE] This has NEVER been fully "resolved": in Mozilla/docs it is stated it's
 * only in 'certain circumstances', also see latest comments in [2]
 * [TEST] http://lcamtuf.coredump.cx/yahh/ (see github wiki APPENDIX A on how to use)
 * [1] https://dbaron.org/mozilla/visited-privacy
 * [2] https://bugzilla.mozilla.org/147777
 * [3] https://developer.mozilla.org/docs/Web/CSS/Privacy_and_the_:visited_selector ***/
user_pref("layout.css.visited_links_enabled", false);
/* 0807: disable live search suggestions
/* [NOTE] Both must be true for the location bar to work
 * [SETUP-CHROME] Change these if you trust and use a privacy respecting search engine
 * [SETTING] Search>Provide search suggestions | Show search suggestions in address bar results ***/
user_pref("browser.search.suggest.enabled", false);
/* 0860: disable search and form history [SETUP-WEB]
 * [WARNING] Autocomplete form data is still (in April 2019) easily read by third parties, see [1]
 * [NOTE] We also clear formdata on exiting Firefox (see 2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember search and form history
 * [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html ***/
user_pref("browser.formfill.enable", false);
/* 0862: disable browsing and download history
 * [NOTE] We also clear history and downloads on exiting Firefox (see 2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember browsing and download history ***/
user_pref("places.history.enabled", false);

/*** [SECTION 1000]: CACHE / FAVICONS
     ETAG [1] and other [2][3] cache tracking/fingerprinting techniques can be averted by
     disabling *BOTH* disk (1001) and memory (1003) cache. ETAGs can also be neutralized
     by modifying response headers [4]. Another solution is to use a hardened configuration
     with Temporary Containers [5]. Alternatively, you can *LIMIT* exposure by clearing
     cache on close (2803). or on a regular basis manually or with an extension.
     [1] https://en.wikipedia.org/wiki/HTTP_ETag#Tracking_using_ETags
     [2] https://robertheaton.com/2014/01/20/cookieless-user-tracking-for-douchebags/
     [3] https://www.grepular.com/Preventing_Web_Tracking_via_the_Browser_Cache
     [4] https://github.com/ghacksuserjs/ghacks-user.js/wiki/4.2.4-Header-Editor
     [5] https://medium.com/@stoically/enhance-your-privacy-in-firefox-with-temporary-containers-33925cd6cd21
***/
user_pref("_user.js.parrot", "1000 syntax error: the parrot's gone to meet 'is maker!");
/** CACHE ***/
/* 1001: disable disk cache
 * [SETUP-PERF] If you think disk cache may help (heavy tab user, high-res video),
 * or you use a hardened Temporary Containers, then feel free to override this
 * [NOTE] We also clear cache on exiting Firefox (see 2803) ***/
user_pref("browser.cache.disk.enable", false);
/* 1002: disable disk cache for SSL pages
 * [1] http://kb.mozillazine.org/Browser.cache.disk_cache_ssl ***/
user_pref("browser.cache.disk_cache_ssl", false);
/* 1003: disable memory cache
/* capacity: -1=determine dynamically (default), 0=none, n=memory capacity in kilobytes
 * [NOTE] Not recommended due to performance issues ***/
   // user_pref("browser.cache.memory.enable", false);
   // user_pref("browser.cache.memory.capacity", 0); // [HIDDEN PREF]
/* 1006: disable permissions manager from writing to disk [RESTART]
 * [NOTE] This means any permission changes are session only
 * [1] https://bugzilla.mozilla.org/967812 ***/
   // user_pref("permissions.memory_only", true); // [HIDDEN PREF]

/** FAVICONS ***/
/* 1030: disable favicons in shortcuts
 * URL shortcuts use a cached randomly named .ico file which is stored in your
 * profile/shortcutCache directory. The .ico remains after the shortcut is deleted.
 * If set to false then the shortcuts use a generic Firefox icon ***/
user_pref("browser.shell.shortcutFavicons", false);
/* 1031: disable favicons in tabs and new bookmarks
 * bookmark favicons are stored as data blobs in favicons.sqlite ***/
user_pref("browser.chrome.site_icons", false);
/* 1032: disable favicons in web notifications ***/
user_pref("alerts.showFavicons", false); // [DEFAULT: false]

/*** [SECTION 1200]: HTTPS (SSL/TLS / OCSP / CERTS / HPKP / CIPHERS)
   Note that your cipher and other settings can be used server side as a fingerprint attack
   vector, see [1] (It's quite technical but the first part is easy to understand
   and you can stop reading when you reach the second section titled "Enter Bro")

   Option 1: Use defaults for ciphers (1260's). There is nothing *weak* about these, but
             due to breakage, browsers can't deprecate them until the web stops using them
   Option 2: Disable the ciphers in 1261, 1262 and 1263. These shouldn't break anything.
             Optionally, disable the ciphers in 1264.

   [1] https://www.securityartwork.es/2017/02/02/tls-client-fingerprinting-with-bro/
***/
user_pref("_user.js.parrot", "1200 syntax error: the parrot's a stiff!");
/** SSL (Secure Sockets Layer) / TLS (Transport Layer Security) ***/
/* 1201: disable old SSL/TLS "insecure" renegotiation (vulnerable to a MiTM attack)
 * [SETUP-WEB] <2% of secure sites do NOT support the newer "secure" renegotiation, see [2]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://www.ssllabs.com/ssl-pulse/ ***/
user_pref("security.ssl.require_safe_negotiation", true);
/* 1202: control TLS versions with min and max
 * 1=TLS 1.0, 2=TLS 1.1, 3=TLS 1.2, 4=TLS 1.3
 * [WARNING] Leave these at default, otherwise you alter your TLS fingerprint.
 * Firefox telemetry (April 2019) shows only 0.5% of TLS web traffic uses 1.0 or 1.1 ***/
   // user_pref("security.tls.version.max", 4);
/* 1203: disable SSL session tracking [FF36+]
 * SSL Session IDs are unique, last up to 24hrs in Firefox, and can be used for tracking
 * [SETUP-PERF] Relax this if you have FPI enabled (see 4000) *AND* you understand the
 * consequences. FPI isolates these, but it was designed with the Tor protocol in mind,
 * and the Tor Browser has extra protection, including enhanced sanitizing per Identity.
 * [1] https://tools.ietf.org/html/rfc5077
 * [2] https://bugzilla.mozilla.org/967977
 * [3] https://arxiv.org/abs/1810.07304 ***/
user_pref("security.ssl.disable_session_identifiers", true); // [HIDDEN PREF]
/* 1204: disable SSL Error Reporting
 * [1] https://firefox-source-docs.mozilla.org/browser/base/sslerrorreport/preferences.html ***/
user_pref("security.ssl.errorReporting.automatic", false);
user_pref("security.ssl.errorReporting.enabled", false);
user_pref("security.ssl.errorReporting.url", "");
/* 1205: disable TLS1.3 0-RTT (round-trip time) [FF51+]
 * [1] https://github.com/tlswg/tls13-spec/issues/1001
 * [2] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/ ***/
user_pref("security.tls.enable_0rtt_data", false);

/** OCSP (Online Certificate Status Protocol)
    #Required reading [#] https://scotthelme.co.uk/revocation-is-broken/ ***/
/* 1210: enable OCSP Stapling
 * [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/ ***/
user_pref("security.ssl.enable_ocsp_stapling", true);
/* 1211: control when to use OCSP fetching (to confirm current validity of certificates)
 * 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
 * OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority)
 * It's a trade-off between security (checking) and privacy (leaking info to the CA)
 * [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
 * [1] https://en.wikipedia.org/wiki/Ocsp ***/
user_pref("security.OCSP.enabled", 0);
/* 1212: set OCSP fetch failures (non-stapled, see 1211) to hard-fail [SETUP-WEB]
 * When a CA cannot be reached to validate a cert, Firefox just continues the connection (=soft-fail)
 * Setting this pref to true tells Firefox to instead terminate the connection (=hard-fail)
 * It is pointless to soft-fail when an OCSP fetch fails: you cannot confirm a cert is still valid (it
 * could have been revoked) and/or you could be under attack (e.g. malicious blocking of OCSP servers)
 * [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
 * [2] https://www.imperialviolet.org/2014/04/19/revchecking.html ***/
user_pref("security.OCSP.require", true);

/** CERTS / HPKP (HTTP Public Key Pinning) ***/
/* 1220: disable or limit SHA-1 certificates
 * 0=all SHA1 certs are allowed
 * 1=all SHA1 certs are blocked
 * 2=deprecated option that now maps to 1
 * 3=only allowed for locally-added roots (e.g. anti-virus)
 * 4=only allowed for locally-added roots or for certs in 2015 and earlier
 * [SETUP-CHROME] When disabled, some man-in-the-middle devices (e.g. security scanners and
 * antivirus products, may fail to connect to HTTPS sites. SHA-1 is *almost* obsolete.
 * [1] https://blog.mozilla.org/security/2016/10/18/phasing-out-sha-1-on-the-public-web/ ***/
user_pref("security.pki.sha1_enforcement_level", 1);
/* 1221: disable Windows 8.1's Microsoft Family Safety cert [FF50+] [WINDOWS]
 * 0=disable detecting Family Safety mode and importing the root
 * 1=only attempt to detect Family Safety mode (don't import the root)
 * 2=detect Family Safety mode and import the root
 * [1] https://trac.torproject.org/projects/tor/ticket/21686 ***/
user_pref("security.family_safety.mode", 0);
/* 1222: disable intermediate certificate caching (fingerprinting attack vector) [RESTART]
 * [NOTE] This affects login/cert/key dbs. The effect is all credentials are session-only.
 * Saved logins and passwords are not available. Reset the pref and restart to return them.
 * [TEST] https://fiprinca.0x90.eu/poc/
 * [1] https://bugzilla.mozilla.org/1334485 - related bug
 * [2] https://bugzilla.mozilla.org/1216882 - related bug (see comment 9) ***/
   // user_pref("security.nocertdb", true); // [HIDDEN PREF]
/* 1223: enforce strict pinning
 * PKP (Public Key Pinning) 0=disabled 1=allow user MiTM (such as your antivirus), 2=strict
 * [SETUP-INSTALL] If you rely on an AV (anti-virus) to protect your web browsing
 * by inspecting ALL your web traffic, then leave at current 1 (default).
 * [NOTE] It needs to be set to 1 when connecting to the ProtonMail's Bridge for the first time.
 * [1] https://trac.torproject.org/projects/tor/ticket/16206 ***/
user_pref("security.cert_pinning.enforcement_level", 2);

/** MIXED CONTENT ***/
/* 1240: disable insecure active content on https pages
 * [1] https://trac.torproject.org/projects/tor/ticket/21323 ***/
user_pref("security.mixed_content.block_active_content", true); // [DEFAULT: true]
/* 1241: disable insecure passive content (such as images) on https pages [SETUP-WEB] ***/
user_pref("security.mixed_content.block_display_content", true);
/* 1243: block unencrypted requests from Flash on encrypted pages to mitigate MitM attacks [FF59+]
 * [1] https://bugzilla.mozilla.org/1190623 ***/
user_pref("security.mixed_content.block_object_subrequest", true);

/** CIPHERS [see the section 1200 intro] ***/
/* 1261: disable 3DES (effective key size < 128)
 * [1] https://en.wikipedia.org/wiki/3des#Security
 * [2] http://en.citizendium.org/wiki/Meet-in-the-middle_attack
 * [3] https://www-archive.mozilla.org/projects/security/pki/nss/ssl/fips-ssl-ciphersuites.html ***/
   // user_pref("security.ssl3.rsa_des_ede3_sha", false);
/* 1262: disable 128 bits ***/
   // user_pref("security.ssl3.ecdhe_ecdsa_aes_128_sha", false);
   // user_pref("security.ssl3.ecdhe_rsa_aes_128_sha", false);
/* 1263: disable DHE (Diffie-Hellman Key Exchange)
 * [1] https://www.eff.org/deeplinks/2015/10/how-to-protect-yourself-from-nsa-attacks-1024-bit-DH ***/
   // user_pref("security.ssl3.dhe_rsa_aes_128_sha", false);
   // user_pref("security.ssl3.dhe_rsa_aes_256_sha", false);
/* 1264: disable the remaining non-modern cipher suites as of FF52 ***/
   // user_pref("security.ssl3.rsa_aes_128_sha", false);
   // user_pref("security.ssl3.rsa_aes_256_sha", false);

/** UI (User Interface) ***/
/* 1270: display warning (red padlock) for "broken security" (see 1201)
 * [1] https://wiki.mozilla.org/Security:Renegotiation ***/
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
/* 1271: control "Add Security Exception" dialog on SSL warnings
 * 0=do neither 1=pre-populate url 2=pre-populate url + pre-fetch cert (default)
 * [1] https://github.com/pyllyukko/user.js/issues/210 ***/
user_pref("browser.ssl_override_behavior", 1);
/* 1272: display advanced information on Insecure Connection warning pages
 * only works when it's possible to add an exception
 * i.e. it doesn't work for HSTS discrepancies (https://subdomain.preloaded-hsts.badssl.com/)
 * [TEST] https://expired.badssl.com/ ***/
user_pref("browser.xul.error_pages.expert_bad_cert", true);
/* 1273: display "insecure" icon and "Not Secure" text on HTTP sites ***/
user_pref("security.insecure_connection_icon.enabled", true); // [FF59+]
user_pref("security.insecure_connection_text.enabled", true); // [FF60+]
   // user_pref("security.insecure_connection_icon.pbmode.enabled", true);
   // user_pref("security.insecure_connection_text.pbmode.enabled", true);
/* 1280: display warnings when insecure HTTP connections are made ***/
user_pref("security.warn_entering_weak", true);
user_pref("security.warn_leaving_secure", true);
user_pref("security.warn_viewing_mixed", true);

/*** [SECTION 1400]: FONTS ***/
user_pref("_user.js.parrot", "1400 syntax error: the parrot's bereft of life!");
/* 1401: disable websites choosing fonts (0=block, 1=allow)
 * This can limit most (but not all) JS font enumeration which is a high entropy fingerprinting vector
 * [SETUP-WEB] Disabling fonts can uglify the web a fair bit.
 * [SETTING] General>Language and Appearance>Fonts & Colors>Advanced>Allow pages to choose... ***/
user_pref("browser.display.use_document_fonts", 0);
/* 1403: disable icon fonts (glyphs) and local fallback rendering
 * [1] https://bugzilla.mozilla.org/789788
 * [2] https://trac.torproject.org/projects/tor/ticket/8455 ***/
user_pref("gfx.downloadable_fonts.enabled", false); // [FF41+]
user_pref("gfx.downloadable_fonts.fallback_delay", -1);
/* 1404: disable rendering of SVG OpenType fonts
 * [1] https://wiki.mozilla.org/SVGOpenTypeFonts - iSECPartnersReport recommends to disable this ***/
user_pref("gfx.font_rendering.opentype_svg.enabled", false);
/* 1405: disable WOFF2 (Web Open Font Format) [FF35+] ***/
user_pref("gfx.downloadable_fonts.woff2.enabled", false);
/* 1408: disable graphite which FF49 turned back on by default
 * In the past it had security issues. Update: This continues to be the case, see [1]
 * [1] https://www.mozilla.org/security/advisories/mfsa2017-15/#CVE-2017-7778 ***/
user_pref("gfx.font_rendering.graphite.enabled", false);

/*** [SECTION 1600]: HEADERS / REFERERS
     Only *cross domain* referers need controlling: leave 1601, 1602, 1605 and 1606 alone
     ---
            harden it a bit: set XOriginPolicy (1603) to 1 (as per the settings below)
       harden it a bit more: set XOriginPolicy (1603) to 2 (and optionally 1604 to 1 or 2), expect breakage
     ---
     If you want any REAL control over referers and breakage, then use an extension. Either:
              uMatrix: limited by scope, all requests are spoofed or not-spoofed
       Smart Referrer: granular with source<->destination, whitelists
     ---

                    full URI: https://example.com:8888/foo/bar.html?id=1234
       scheme+host+port+path: https://example.com:8888/foo/bar.html
            scheme+host+port: https://example.com:8888
     ---
     #Required reading [#] https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/
***/
user_pref("_user.js.parrot", "1600 syntax error: the parrot rests in peace!");
/* 1601: ALL: control when images/links send a referer
 * 0=never, 1=send only when links are clicked, 2=for links and images (default) ***/
user_pref("network.http.sendRefererHeader", 0); // [DEFAULT: 2]
/* 1602: ALL: control the amount of information to send
 * 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
   // user_pref("network.http.referer.trimmingPolicy", 0); // [DEFAULT: 0]
/* 1603: CROSS ORIGIN: control when to send a referer
 * 0=always (default), 1=only if base domains match, 2=only if hosts match
 * [SETUP-WEB] Known to cause issues with older modems/routers and some sites e.g vimeo ***/
user_pref("network.http.referer.XOriginPolicy", 2);
/* 1604: CROSS ORIGIN: control the amount of information to send [FF52+]
 * 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
user_pref("network.http.referer.XOriginTrimmingPolicy", 0); // [DEFAULT: 0]
/* 1605: ALL: disable spoofing a referer
 * [WARNING] Do not set this to true, as spoofing effectively disables the anti-CSRF
 * (Cross-Site Request Forgery) protections that some sites may rely on ***/
   // user_pref("network.http.referer.spoofSource", false); // [DEFAULT: false]
/* 1606: ALL: set the default Referrer Policy [FF59+]
 * 0=no-referer, 1=same-origin, 2=strict-origin-when-cross-origin, 3=no-referrer-when-downgrade
 * [NOTE] This is only a default, it can be overridden by a site-controlled Referrer Policy
 * [1] https://www.w3.org/TR/referrer-policy/
 * [2] https://developer.mozilla.org/docs/Web/HTTP/Headers/Referrer-Policy
 * [3] https://blog.mozilla.org/security/2018/01/31/preventing-data-leaks-by-stripping-path-information-in-http-referrers/ ***/
user_pref("network.http.referer.defaultPolicy", 0); // [DEFAULT: 3]
user_pref("network.http.referer.defaultPolicy.pbmode", 0); // [DEFAULT: 2]
/* 1610: ALL: enable the DNT (Do Not Track) HTTP header
 * [NOTE] DNT is enforced with Tracking Protection regardless of this pref
 * [SETTING] Privacy & Security>Content Blocking>Send websites a "Do Not Track"... ***/
user_pref("privacy.donottrackheader.enabled", true);

/*** [SECTION 1800]: PLUGINS ***/
user_pref("_user.js.parrot", "1800 syntax error: the parrot's pushing up daisies!");
/* 1802: enable click to play and set to 0 minutes ***/
user_pref("plugins.click_to_play", true);
user_pref("plugin.sessionPermissionNow.intervalInMinutes", 0);

/*** [SECTION 2000]: MEDIA / CAMERA / MIC ***/
user_pref("_user.js.parrot", "2000 syntax error: the parrot's snuffed it!");
/* 2001: disable WebRTC (Web Real-Time Communication)
 * [SETUP-WEB] WebRTC can leak your IP address from behind your VPN, but if this is not
 * in your threat model, and you want Real-Time Communication, this is the pref for you
 * [1] https://www.privacytools.io/#webrtc ***/
user_pref("media.peerconnection.enabled", false);
/* 2002: limit WebRTC IP leaks if using WebRTC
 * [TEST] https://browserleaks.com/webrtc
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1189041,1297416
 * [2] https://wiki.mozilla.org/Media/WebRTC/Privacy ***/
user_pref("media.peerconnection.ice.default_address_only", true);
user_pref("media.peerconnection.ice.no_host", true); // [FF51+]
/* 2010: disable WebGL (Web Graphics Library)
 * [SETUP-WEB] When disabled, may break some websites. When enabled, provides high entropy,
 * especially with readPixels(). Some of the other entropy is lessened with RFP (see 4501)
 * [1] https://www.contextis.com/resources/blog/webgl-new-dimension-browser-exploitation/
 * [2] https://security.stackexchange.com/questions/13799/is-webgl-a-security-concern ***/
user_pref("webgl.disabled", true);
user_pref("webgl.dxgl.enabled", false); // [WINDOWS]
user_pref("webgl.enable-webgl2", false);
/* 2012: limit WebGL ***/
user_pref("webgl.min_capability_mode", true);
user_pref("webgl.disable-extensions", true);
user_pref("webgl.disable-fail-if-major-performance-caveat", true);
/* 2022: disable screensharing ***/
user_pref("media.getusermedia.screensharing.enabled", false);
user_pref("media.getusermedia.browser.enabled", false);
user_pref("media.getusermedia.audiocapture.enabled", false);
/* 2030: disable autoplay of HTML5 media [FF63+]
 * 0=Allowed, 1=Blocked (2=Prompt - removed in FF66)
 * [NOTE] You can set exceptions under site permissions
 * [SETTING] Privacy & Security>Permissions>Block websites from automatically playing sound ***/
user_pref("media.autoplay.default", 1); // [DEFAULT: 1 in FF67+]
/* 2032: disable audio autoplay in non-active tabs [FF51+]
 * [1] https://www.ghacks.net/2016/11/14/firefox-51-blocks-automatic-audio-playback-in-non-active-tabs/ ***/
user_pref("media.block-autoplay-until-in-foreground", true); // [DEFAULT: true]
/* 2033: disable autoplay for muted videos [FF63+] ***/
   // user_pref("media.autoplay.allow-muted", false);

/*** [SECTION 2200]: WINDOW MEDDLING & LEAKS / POPUPS ***/
user_pref("_user.js.parrot", "2200 syntax error: the parrot's 'istory!");
/* 2201: prevent websites from disabling new window features
 * [1] http://kb.mozillazine.org/Prevent_websites_from_disabling_new_window_features ***/
user_pref("dom.disable_window_open_feature.close", true);
user_pref("dom.disable_window_open_feature.location", true); // [DEFAULT: true]
user_pref("dom.disable_window_open_feature.menubar", true);
user_pref("dom.disable_window_open_feature.minimizable", true);
user_pref("dom.disable_window_open_feature.personalbar", true); // bookmarks toolbar
user_pref("dom.disable_window_open_feature.resizable", true); // [DEFAULT: true]
user_pref("dom.disable_window_open_feature.status", true); // [DEFAULT: true]
user_pref("dom.disable_window_open_feature.titlebar", true);
user_pref("dom.disable_window_open_feature.toolbar", true);
/* 2202: prevent scripts from moving and resizing open windows ***/
user_pref("dom.disable_window_move_resize", true);
/* 2203: open links targeting new windows in a new tab instead
 * This stops malicious window sizes and some screen resolution leaks.
 * You can still right-click a link and open in a new window.
 * [TEST] https://ghacksuserjs.github.io/TorZillaPrint/TorZillaPrint.html#screen
 * [1] https://trac.torproject.org/projects/tor/ticket/9881 ***/
  // user_pref("browser.link.open_newwindow", 3); // [DEFAULT: 3]
  // user_pref("browser.link.open_newwindow.restriction", 0); // [DEFAULT: 0]
/* 2204: disable Fullscreen API (requires user interaction) to prevent screen-resolution leaks
 * [NOTE] You can still manually toggle the browser's fullscreen state (F11),
 * but this pref will disable embedded video/game fullscreen controls, e.g. youtube
 * [TEST] https://ghacksuserjs.github.io/TorZillaPrint/TorZillaPrint.html#screen ***/
   // user_pref("full-screen-api.enabled", false);  // [DEFAULT: false]
/* 2210: block popup windows
 * [SETTING] Privacy & Security>Permissions>Block pop-up windows ***/
user_pref("dom.disable_open_during_load", true);
/* 2212: limit events that can cause a popup [SETUP-WEB]
 * default is "change click dblclick auxclick mouseup pointerup notificationclick reset submit touchend contextmenu"
 * [1] http://kb.mozillazine.org/Dom.popup_allowed_events ***/
user_pref("dom.popup_allowed_events", "click dblclick");

/*** [SECTION 2300]: WEB WORKERS
     A worker is a JS "background task" running in a global context, i.e. it is different from
     the current window. Workers can spawn new workers (must be the same origin & scheme),
     including service and shared workers. Shared workers can be utilized by multiple scripts and
     communicate between browsing contexts (windows/tabs/iframes) and can even control your cache.
     [NOTE] uMatrix 1.2.0+ allows a per-scope control for workers (2301-deprecated) and service workers (2302)
              #Required reading [#] https://github.com/gorhill/uMatrix/releases/tag/1.2.0
     [1]    Web Workers: https://developer.mozilla.org/docs/Web/API/Web_Workers_API
     [2]         Worker: https://developer.mozilla.org/docs/Web/API/Worker
     [3] Service Worker: https://developer.mozilla.org/docs/Web/API/Service_Worker_API
     [4]   SharedWorker: https://developer.mozilla.org/docs/Web/API/SharedWorker
     [5]   ChromeWorker: https://developer.mozilla.org/docs/Web/API/ChromeWorker
     [6]  Notifications: https://support.mozilla.org/questions/1165867#answer-981820
***/
user_pref("_user.js.parrot", "2300 syntax error: the parrot's off the twig!");
/* 2302: disable service workers [FF32, FF44-compat]
 * Service workers essentially act as proxy servers that sit between web apps, and the browser
 * and network, are event driven, and can control the web page/site it is associated with,
 * intercepting and modifying navigation and resource requests, and caching resources.
 * [NOTE] Service worker APIs are hidden (in Firefox) and cannot be used when in PB mode.
 * [NOTE] Service workers only run over HTTPS. Service workers have no DOM access.
 * [SETUP-WEB] Disabling service workers will break some sites. This pref is a master switch, and controls
 * notifications (2304, 2305) and service worker cache (2740) - all three are inactive. Notifications are
 * behind a prompt (2306). If you enable service workers, then you may want to look at those as well ***/
  // user_pref("dom.serviceWorkers.enabled", false);  // [DEFAULT: false]
/* 2304: disable Web Notifications
 * [NOTE] Web Notifications require service workers (2302) and are behind a prompt (2306)
 * [NOTE] Unlike ghacks-user.js, we explicitly disable them as they are enabled by default.
 * [1] https://developer.mozilla.org/docs/Web/API/Notifications_API ***/
user_pref("dom.webnotifications.enabled", false); // [FF22+]
user_pref("dom.webnotifications.serviceworker.enabled", false); // [FF44+]
/* 2305: disable Push Notifications [FF44+]
 * web apps can receive messages pushed to them from a server, whether or
 * not the web app is in the foreground, or even currently loaded
 * [NOTE] Push Notifications require service workers (2302) and are behind a prompt (2306)
 * [1] https://developer.mozilla.org/docs/Web/API/Push_API ***/
   // user_pref("dom.push.enabled", false);
   // user_pref("dom.push.connection.enabled", false);
   // user_pref("dom.push.serverURL", "");
   // user_pref("dom.push.userAgentID", "");

/*** [SECTION 2400]: DOM (DOCUMENT OBJECT MODEL) & JAVASCRIPT ***/
user_pref("_user.js.parrot", "2400 syntax error: the parrot's kicked the bucket!");
/* 2401: disable website control over browser right-click context menu
 * [NOTE] Shift-Right-Click will always bring up the browser right-click context menu ***/
   // user_pref("dom.event.contextmenu.enabled", false);
/* 2402: disable website access to clipboard events/content
 * [SETUP-WEB] This will break some sites functionality such as pasting into facebook, wordpress
 * this applies to onCut, onCopy, onPaste events - i.e. you have to interact with
 * the website for it to look at the clipboard
 * [1] https://www.ghacks.net/2014/01/08/block-websites-reading-modifying-clipboard-contents-firefox/ ***/
user_pref("dom.event.clipboardevents.enabled", false);
/* 2403: disable middlemouse paste leaking clipboard content on Linux after autoscroll
 * Defense in depth if clipboard events are enabled (see 2402)
 * [1] https://bugzilla.mozilla.org/1528289 */
user_pref("middlemouse.paste", false); // [DEFAULT: false on Windows]
/* 2404: disable clipboard commands (cut/copy) from "non-privileged" content [FF41+]
 * this disables document.execCommand("cut"/"copy") to protect your clipboard
 * [1] https://bugzilla.mozilla.org/1170911 ***/
user_pref("dom.allow_cut_copy", false);
/* 2405: disable "Confirm you want to leave" dialog on page close
 * Does not prevent JS leaks of the page close event.
 * [1] https://developer.mozilla.org/docs/Web/Events/beforeunload
 * [2] https://support.mozilla.org/questions/1043508 ***/
user_pref("dom.disable_beforeunload", true);
/* 2414: disable shaking the screen ***/
user_pref("dom.vibrator.enabled", false);
/* 2420: disable asm.js [FF22+] [SETUP-PERF]
 * [1] http://asmjs.org/
 * [2] https://www.mozilla.org/security/advisories/mfsa2015-29/
 * [3] https://www.mozilla.org/security/advisories/mfsa2015-50/
 * [4] https://www.mozilla.org/security/advisories/mfsa2017-01/#CVE-2017-5375
 * [5] https://www.mozilla.org/security/advisories/mfsa2017-05/#CVE-2017-5400
 * [6] https://rh0dev.github.io/blog/2017/the-return-of-the-jit/ ***/
user_pref("javascript.options.asmjs", false);
/* 2421: disable Ion and baseline JIT to help harden JS against exploits
 * [WARNING] If false, causes the odd site issue and there is also a performance loss
 * [1] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0817 ***/
   // user_pref("javascript.options.ion", false);
   // user_pref("javascript.options.baselinejit", false);
/* 2422: disable WebAssembly [FF52+] [SETUP-PERF]
 * [1] https://developer.mozilla.org/docs/WebAssembly ***/
user_pref("javascript.options.wasm", false);
/* 2426: disable Intersection Observer API [FF55+]
 * [1] https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API
 * [2] https://w3c.github.io/IntersectionObserver/
 * [3] https://bugzilla.mozilla.org/1243846 ***/
   // user_pref("dom.IntersectionObserver.enabled", false);
/* 2429: enable (limited but sufficient) window.opener protection [FF65+]
 * Makes rel=noopener implicit for target=_blank in anchor and area elements when no rel attribute is set ***/
user_pref("dom.targetBlankNoOpener.enabled", true);

/*** [SECTION 2500]: HARDWARE FINGERPRINTING ***/
user_pref("_user.js.parrot", "2500 syntax error: the parrot's shuffled off 'is mortal coil!");
/* 2502: disable Battery Status API
 * Initially a Linux issue (high precision readout) that was fixed.
 * However, it is still another metric for fingerprinting, used to raise entropy.
 * e.g. do you have a battery or not, current charging status, charge level, times remaining etc
 * [NOTE] From FF52+ Battery Status API is only available in chrome/privileged code. see [1]
 * [1] https://bugzilla.mozilla.org/1313580 ***/
   // user_pref("dom.battery.enabled", false);
/* 2504: disable virtual reality devices
 * Optional protection depending on your connected devices
 * [1] https://developer.mozilla.org/docs/Web/API/WebVR_API ***/
   // user_pref("dom.vr.enabled", false);
/* 2505: disable media device enumeration [FF29+]
 * [NOTE] media.peerconnection.enabled should also be set to false (see 2001)
 * [1] https://wiki.mozilla.org/Media/getUserMedia
 * [2] https://developer.mozilla.org/docs/Web/API/MediaDevices/enumerateDevices ***/
user_pref("media.navigator.enabled", false);
/* 2508: disable hardware acceleration to reduce graphics fingerprinting [SETUP-HARDEN]
 * [WARNING] Affects text rendering (fonts will look different), impacts video performance,
 * and parts of Quantum that utilize the GPU will also be affected as they are rolled out
 * [SETTING] General>Performance>Custom>Use hardware acceleration when available
 * [1] https://wiki.mozilla.org/Platform/GFX/HardwareAcceleration ***/
   // user_pref("gfx.direct2d.disabled", true); // [WINDOWS]
   // user_pref("layers.acceleration.disabled", true);
/* 2510: disable Web Audio API [FF51+]
 * [1] https://bugzilla.mozilla.org/1288359 ***/
user_pref("dom.webaudio.enabled", false);
/* 2517: disable Media Capabilities API [FF63+]
 * [WARNING] This *may* affect media performance if disabled, no one is sure
 * [1] https://github.com/WICG/media-capabilities
 * [2] https://wicg.github.io/media-capabilities/#security-privacy-considerations ***/
   // user_pref("media.media-capabilities.enabled", false);

/*** [SECTION 2600]: MISCELLANEOUS ***/
user_pref("_user.js.parrot", "2600 syntax error: the parrot's run down the curtain!");
/* 2602: disable sending additional analytics to web servers
 * [1] https://developer.mozilla.org/docs/Web/API/Navigator/sendBeacon ***/
user_pref("beacon.enabled", false);
/* 2607: disable various developer tools in browser context
 * [SETTING] Devtools>Advanced Settings>Enable browser chrome and add-on debugging toolboxes
 * [1] https://github.com/pyllyukko/user.js/issues/179#issuecomment-246468676 ***/
user_pref("devtools.chrome.enabled", false);
/* 2608: disable WebIDE to prevent remote debugging and ADB extension download
 * [1] https://trac.torproject.org/projects/tor/ticket/16222 ***/
user_pref("devtools.debugger.remote-enabled", false);
user_pref("devtools.webide.enabled", false);
/* 2609: disable MathML (Mathematical Markup Language) [FF51+] [SETUP-HARDEN]
 * [TEST] https://ghacksuserjs.github.io/TorZillaPrint/TorZillaPrint.html#misc
 * [1] https://bugzilla.mozilla.org/1173199 ***/
   // user_pref("mathml.disabled", true);
/* 2610: disable in-content SVG (Scalable Vector Graphics) [FF53+]
 * [WARNING] Expect breakage incl. youtube player controls. Best left for a "hardened" profile.
 * [1] https://bugzilla.mozilla.org/1216893 ***/
user_pref("svg.disabled", true);
/* 2611: disable middle mouse click opening links from clipboard
 * [1] https://trac.torproject.org/projects/tor/ticket/10089
 * [2] http://kb.mozillazine.org/Middlemouse.contentLoadURL ***/
user_pref("middlemouse.contentLoadURL", false);
/* 2614: limit HTTP redirects (this does not control redirects with HTML meta tags or JS)
 * [NOTE] A low setting of 5 or under will probably break some sites (e.g. gmail logins)
 * To control HTML Meta tag and JS redirects, use an extension. Default is 20 ***/
user_pref("network.http.redirection-limit", 10);
/* 2619: enforce Punycode for Internationalized Domain Names to eliminate possible spoofing
 * Firefox has *some* protections, but it is better to be safe than sorry. The downside: it will also
 * display legitimate IDN's punycoded, which might be undesirable for users of non-latin alphabets
 * [TEST] https://www.xn--80ak6aa92e.com/ (www.apple.com)
 * [1] https://wiki.mozilla.org/IDN_Display_Algorithm
 * [2] https://en.wikipedia.org/wiki/IDN_homograph_attack
 * [3] CVE-2017-5383: https://www.mozilla.org/security/advisories/mfsa2017-02/
 * [4] https://www.xudongz.com/blog/2017/idn-phishing/ ***/
user_pref("network.IDN_show_punycode", true);

/** DOWNLOADS ***/
/* 2650: discourage downloading to desktop
 * 0=desktop 1=downloads 2=last used
 * [SETTING] To set your default "downloads": General>Downloads>Save files to ***/
   // user_pref("browser.download.folderList", 2);
/* 2651: enforce user interaction for security by always asking where to download [SETUP-CHROME]
 * [SETTING] General>Downloads>Always ask you where to save files ***/
user_pref("browser.download.useDownloadDir", false);
/* 2652: disable adding downloads to the system's "recent documents" list ***/
user_pref("browser.download.manager.addToRecentDocs", false);
/* 2653: disable hiding mime types (Options>General>Applications) not associated with a plugin ***/
user_pref("browser.download.hide_plugins_without_extensions", false);
/* 2654: disable "open with" in download dialog [FF50+] [SETUP-HARDEN]
 * This is very useful to enable when the browser is sandboxed (e.g. via AppArmor)
 * in such a way that it is forbidden to run external applications.
 * [WARNING] This may interfere with some users' workflow or methods
 * [1] https://bugzilla.mozilla.org/1281959 ***/
   // user_pref("browser.download.forbid_open_with", true);

/** EXTENSIONS ***/
/* 2660: lock down allowed extension directories
 * [SETUP-CHROME] This will break extensions, language packs, themes and any other
 * XPI files which are installed outside of profile and application directories
 * [1] https://mike.kaply.com/2012/02/21/understanding-add-on-scopes/
 * [1] archived: https://archive.is/DYjAM ***/
user_pref("extensions.enabledScopes", 5); // [HIDDEN PREF]
user_pref("extensions.autoDisableScopes", 15); // [DEFAULT: 15]
/* 2662: disable webextension restrictions on certain mozilla domains (also see 4503) [FF60+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
   // user_pref("extensions.webextensions.restrictedDomains", "");

/** SECURITY ***/
/* 2680: enable CSP (Content Security Policy)
 * [1] https://developer.mozilla.org/docs/Web/HTTP/CSP ***/
user_pref("security.csp.enable", true); // [DEFAULT: true]
/* 2684: enforce a security delay on some confirmation dialogs such as install, open/save
 * [1] http://kb.mozillazine.org/Disable_extension_install_delay_-_Firefox
 * [2] https://www.squarefree.com/2004/07/01/race-conditions-in-security-dialogs/ ***/
user_pref("security.dialog_enable_delay", 700);

/*** [SECTION 2700]: PERSISTENT STORAGE
     Data SET by websites including
            cookies : profile\cookies.sqlite
       localStorage : profile\webappsstore.sqlite
          indexedDB : profile\storage\default
           appCache : profile\OfflineCache
     serviceWorkers :

     [NOTE] indexedDB and serviceWorkers are not available in Private Browsing Mode
     [NOTE] Blocking cookies also blocks websites access to: localStorage (incl. sessionStorage),
     indexedDB, sharedWorker, and serviceWorker (and therefore service worker cache and notifications)
     If you set a site exception for cookies (either "Allow" or "Allow for Session") then they become
     accessible to websites except shared/service workers where the cookie setting *must* be "Allow"
***/
user_pref("_user.js.parrot", "2700 syntax error: the parrot's joined the bleedin' choir invisible!");
/* 2701: disable cookies and site-data [SETUP-WEB]
 * 0=Accept cookies and site data (default), 1=(Block) All third-party cookies, 2=(Block) All cookies,
 * 3=(Block) Cookies from unvisited sites, 4=(Block) Third-party trackers (FF63+)
 * [NOTE] Value 4 is tied to the Tracking Protection lists
 * [NOTE] You can set exceptions under site permissions or use an extension
 * [SETTING] Privacy & Security>Content Blocking>Custom>Choose what to block>Cookies ***/
user_pref("network.cookie.cookieBehavior", 2);
/* 2710: disable DOM (Document Object Model) Storage
 * [WARNING] This will break a LOT of sites' functionality AND extensions!
 * You are better off using an extension for more granular control ***/
user_pref("dom.storage.enabled", false);
/* 2720: enforce IndexedDB (IDB) as enabled
 * IDB is required for extensions and Firefox internals (even before FF63 in [1])
 * To control *website* IDB data, control allowing cookies and service workers, or use
 * Temporary Containers. To mitigate *website* IDB, FPI helps (4001), and/or sanitize
 * on close (Offline Website Data, see 2800) or on-demand (Ctrl-Shift-Del), or automatically
 * via an extension. Note that IDB currently cannot be sanitized by host.
 * [1] https://blog.mozilla.org/addons/2018/08/03/new-backend-for-storage-local-api/ ***/
user_pref("dom.indexedDB.enabled", true); // [DEFAULT: true]
/* 2730: disable offline cache ***/
user_pref("browser.cache.offline.enable", false);
/* 2731: enforce websites to ask to store data for offline use
 * [1] https://support.mozilla.org/questions/1098540
 * [2] https://bugzilla.mozilla.org/959985 ***/
user_pref("offline-apps.allow_by_default", false);
/* 2740: disable service worker cache and cache storage
 * [NOTE] We clear service worker cache on exiting Firefox (see 2803)
 * [1] https://w3c.github.io/ServiceWorker/#privacy ***/
    // user_pref("dom.caches.enabled", false);
/* 2750: disable Storage API [FF51+]
 * The API gives sites the ability to find out how much space they can use, how much
 * they are already using, and even control whether or not they need to be alerted
 * before the user agent disposes of site data in order to make room for other things.
 * [1] https://developer.mozilla.org/docs/Web/API/StorageManager
 * [2] https://developer.mozilla.org/docs/Web/API/Storage_API
 * [3] https://blog.mozilla.org/l10n/2017/03/07/firefox-l10n-report-aurora-54/ ***/
user_pref("dom.storageManager.enabled", false);
/* 2755: disable Storage Access API [FF65+]
 * [1] https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API ***/
   // user_pref("dom.storage_access.enabled", false); // [DEFAULT: false]

/*** [SECTION 2800]: SHUTDOWN
     You should set the values to what suits you best.
     - "Offline Website Data" includes appCache (2730), localStorage (2710),
       service worker cache (2740), and QuotaManager (IndexedDB (2720), asm-cache)
     - In both 2803 + 2804, the 'download' and 'history' prefs are combined in the
       Firefox interface as "Browsing & Download History" and their values will be synced
***/
user_pref("_user.js.parrot", "2800 syntax error: the parrot's bleedin' demised!");
/* 2804: reset default items to clear with Ctrl-Shift-Del (to match 2803) [SETUP-CHROME]
 * This dialog can also be accessed from the menu History>Clear Recent History
 * Firefox remembers your last choices. This will reset them when you start Firefox.
 * [NOTE] Regardless of what you set privacy.cpd.downloads to, as soon as the dialog
 * for "Clear Recent History" is opened, it is synced to the same as 'history' ***/
user_pref("privacy.cpd.cache", true);
user_pref("privacy.cpd.cookies", true);
user_pref("privacy.cpd.history", true); // Browsing & Download History
/* 2806: reset default 'Time range to clear' for 'Clear Recent History' (see 2804)
 * Firefox remembers your last choice. This will reset the value when you start Firefox.
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours,
 * 4=today, 5=last five minutes, 6=last twenty-four hours
 * [NOTE] The values 5 + 6 are not listed in the dropdown, which will display a
 * blank value if they are used, but they do work as advertised ***/
user_pref("privacy.sanitize.timeSpan", 0);

/*** [SECTION 4000]: FPI (FIRST PARTY ISOLATION)
 ** 1278037 - isolate indexedDB (FF51+)
 ** 1277803 - isolate favicons (FF52+)
 ** 1264562 - isolate OCSP cache (FF52+)
 ** 1268726 - isolate Shared Workers (FF52+)
 ** 1316283 - isolate SSL session cache (FF52+)
 ** 1317927 - isolate media cache (FF53+)
 ** 1323644 - isolate HSTS and HPKP (FF54+)
 ** 1334690 - isolate HTTP Alternative Services (FF54+)
 ** 1334693 - isolate SPDY/HTTP2 (FF55+)
 ** 1337893 - isolate DNS cache (FF55+)
 ** 1344170 - isolate blob: URI (FF55+)
 ** 1300671 - isolate data:, about: URLs (FF55+)
 ** 1473247 - isolate IP addresses (FF63+)
 ** 1492607 - isolate postMessage with targetOrigin "*" (requires 4002) (FF65+)
 ** 1542309 - isolate top-level domain URLs (FF68+)
 ** 1506693 - isolate pdfjs range-based requests (FF68+)
 ** 1330467 - isolate site permissions (coming)
***/
user_pref("_user.js.parrot", "4000 syntax error: the parrot's pegged out");
/* 4001: enable First Party Isolation [FF51+]
 * [SETUP-WEB] May break cross-domain logins and site functionality until perfected
 * [1] https://bugzilla.mozilla.org/1260931 ***/
user_pref("privacy.firstparty.isolate", true);
/* 4002: enforce FPI restriction for window.opener [FF54+]
 * [NOTE] Setting this to false may reduce the breakage in 4001
 * FF65+ blocks postMessage with targetOrigin "*" if originAttributes don't match. But
 * to reduce breakage it ignores the 1st-party domain (FPD) originAttribute. (see [2],[3])
 * The 2nd pref removes that limitation and will only allow communication if FPDs also match.
 * [1] https://bugzilla.mozilla.org/1319773#c22
 * [2] https://bugzilla.mozilla.org/1492607
 * [3] https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage ***/
user_pref("privacy.firstparty.isolate.restrict_opener_access", true); // [DEFAULT: true]
   // user_pref("privacy.firstparty.isolate.block_post_message", true); // [HIDDEN PREF]

/*** [SECTION 4500]: RFP (RESIST FINGERPRINTING)
   This master switch will be used for a wide range of items, many of which will
   **override** existing prefs from FF55+, often providing a **better** solution

   IMPORTANT: As existing prefs become redundant, and some of them WILL interfere
   with how RFP works, they will be moved to section 4600 and made inactive

 ** 418986 - limit window.screen & CSS media queries leaking identifiable info (FF41+)
      [NOTE] Info only: To set a size, open a XUL (chrome) page (such as about:config) which is at
      100% zoom, hit Shift+F4 to open the scratchpad, type window.resizeTo(1366,768), hit Ctrl+R to run.
      Test your window size, do some math, resize to allow for all the non inner window elements
      [TEST] https://ghacksuserjs.github.io/TorZillaPrint/TorZillaPrint.html#screen
 ** 1281949 - spoof screen orientation (FF50+)
 ** 1281963 - hide the contents of navigator.plugins and navigator.mimeTypes (FF50+)
      FF53: Fixes GetSupportedNames in nsMimeTypeArray and nsPluginArray (1324044)
 ** 1330890 - spoof timezone as UTC 0 (FF55+)
      FF58: Date.toLocaleFormat deprecated (818634)
      FF60: Date.toLocaleDateString and Intl.DateTimeFormat fixed (1409973)
 ** 1360039 - spoof navigator.hardwareConcurrency as 2 (see 4601) (FF55+)
      This spoof *shouldn't* affect core chrome/Firefox performance
 ** 1217238 - reduce precision of time exposed by javascript (FF55+)
 ** 1369303 - spoof/disable performance API (see 2410-deprecated, 4602, 4603) (FF56+)
 ** 1333651 & 1383495 & 1396468 - spoof Navigator API (see section 4700) (FF56+)
      FF56: The version number will be rounded down to the nearest multiple of 10
      FF57: The version number will match current ESR (1393283, 1418672, 1418162, 1511763)
      FF59: The OS will be reported as Windows, OSX, Android, or Linux (to reduce breakage) (1404608)
      FF66: The OS in HTTP Headers will be reduced to Windows or Android (1509829)
      FF68: Reported OS versions updated to Windows 10, OS 10.14, and Android 8.1 (1511434)
 ** 1369319 - disable device sensor API (see 4604) (FF56+)
 ** 1369357 - disable site specific zoom (see 4605) (FF56+)
 ** 1337161 - hide gamepads from content (see 4606) (FF56+)
 ** 1372072 - spoof network information API as "unknown" when dom.netinfo.enabled = true (see 4607) (FF56+)
 ** 1333641 - reduce fingerprinting in WebSpeech API (see 4608) (FF56+)
 ** 1372069 & 1403813 & 1441295 - block geolocation requests (same as denying a site permission) (see 0201, 0201b) (FF56-62)
 ** 1369309 - spoof media statistics (see 4610) (FF57+)
 ** 1382499 - reduce screen co-ordinate fingerprinting in Touch API (see 4611) (FF57+)
 ** 1217290 & 1409677 - enable fingerprinting resistance for WebGL (see 2010-12) (FF57+)
 ** 1382545 - reduce fingerprinting in Animation API (FF57+)
 ** 1354633 - limit MediaError.message to a whitelist (FF57+)
 ** 1382533 - enable fingerprinting resistance for Presentation API (FF57+)
      This blocks exposure of local IP Addresses via mDNS (Multicast DNS)
 **  967895 - enable site permission prompt before allowing canvas data extraction (FF58+)
      FF59: Added to site permissions panel (1413780) Only prompt when triggered by user input (1376865)
 ** 1372073 - spoof/block fingerprinting in MediaDevices API (FF59+)
      Spoof: enumerate devices reports one "Internal Camera" and one "Internal Microphone" if
             media.navigator.enabled is true (see 2505 which we chose to keep disabled)
      Block: suppresses the ondevicechange event (see 4612)
 ** 1039069 - warn when language prefs are set to non en-US (see 0207, 0208) (FF59+)
 ** 1222285 & 1433592 - spoof keyboard events and suppress keyboard modifier events (FF59+)
      Spoofing mimics the content language of the document. Currently it only supports en-US.
      Modifier events suppressed are SHIFT and both ALT keys. Chrome is not affected.
      FF60: Fix keydown/keyup events (1438795)
 ** 1337157 - disable WebGL debug renderer info (see 4613) (FF60+)
 ** 1459089 - disable OS locale in HTTP Accept-Language headers (ANDROID) (FF62+)
 ** 1479239 - return "no-preference" with prefers-reduced-motion (FF63+)
 ** 1363508 - spoof/suppress Pointer Events (see 4614) (FF64+)
      FF65: pointerEvent.pointerid (1492766)
 ** 1485266 - disable exposure of system colors to CSS or canvas (see 4615) (FF67+)
 ** 1407366 - enable inner window letterboxing (see 4504) (FF67+)
 ** 1540726 - return "light" with prefers-color-scheme (FF67+)
      [1] https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 ** 1564422 - spoof audioContext outputLatency (FF70+)
***/
user_pref("_user.js.parrot", "4500 syntax error: the parrot's popped 'is clogs");
/* 4501: enable privacy.resistFingerprinting [FF41+]
 * This pref is the master switch for all other privacy.resist* prefs unless stated
 * [SETUP-WEB] RFP can cause the odd website to break in strange ways, and has a few side affects,
 * but is largely robust nowadays. Give it a try. Your choice. Also see 4504 (letterboxing).
 * [NOTE] This feature currently breaks Text & Background colors settings ("Fonts & Colors"), see [2].
 * [1] https://bugzilla.mozilla.org/418986
 * [2] https://bugzilla.mozilla.org/1600074 ***/
user_pref("privacy.resistFingerprinting", true);
/* 4502: set new window sizes to round to hundreds [FF55+] [SETUP-CHROME]
 * Width will round down to multiples of 200s and height to 100s, to fit your screen.
 * The override values are a starting point to round from if you want some control
 * [1] https://bugzilla.mozilla.org/1330882
 * [2] https://hardware.metrics.mozilla.com/ ***/
   // user_pref("privacy.window.maxInnerWidth", 1000);
   // user_pref("privacy.window.maxInnerHeight", 1000);
/* 4503: disable mozAddonManager Web API [FF57+]
 * [NOTE] As a side-effect in FF57-59 this allowed extensions to work on AMO. In FF60+ you also need
 * to sanitize or clear extensions.webextensions.restrictedDomains (see 2662) to keep that side-effect
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true); // [HIDDEN PREF]

/*** [SECTION 4600]: RFP ALTERNATIVES
   * IF you DO use RFP (see 4500) then you DO NOT need these redundant prefs. In fact,
     some even cause RFP to not behave as you would expect and alter your fingerprint.
     Make sure they are RESET in about:config as per your Firefox version
   * IF you DO NOT use RFP or are on ESR... then turn on each ESR section below
***/
user_pref("_user.js.parrot", "4600 syntax error: the parrot's crossed the Jordan");
/* [SETUP-non-RFP] Non-RFP users replace the * with a slash on this line to enable these
// FF55+
// 4601: [2514] spoof (or limit?) number of CPU cores [FF48+]
   // [NOTE] *may* affect core chrome/Firefox performance, will affect content.
   // [1] https://bugzilla.mozilla.org/1008453
   // [2] https://trac.torproject.org/projects/tor/ticket/21675
   // [3] https://trac.torproject.org/projects/tor/ticket/22127
   // [4] https://html.spec.whatwg.org/multipage/workers.html#navigator.hardwareconcurrency
   // user_pref("dom.maxHardwareConcurrency", 2);
// * * * /
// FF56+
// 4602: [2411] disable resource/navigation timing
user_pref("dom.enable_resource_timing", false);
// 4603: [2412] disable timing attacks
   // [1] https://wiki.mozilla.org/Security/Reviews/Firefox/NavigationTimingAPI
user_pref("dom.enable_performance", false);
// 4604: [2512] disable device sensor API
   // Optional protection depending on your device
   // [1] https://trac.torproject.org/projects/tor/ticket/15758
   // [2] https://blog.lukaszolejnik.com/stealing-sensitive-browser-data-with-the-w3c-ambient-light-sensor-api/
   // [3] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1357733,1292751
   // user_pref("device.sensors.enabled", false);
// 4606: [2501] disable gamepad API - USB device ID enumeration
   // Optional protection depending on your connected devices
   // [1] https://trac.torproject.org/projects/tor/ticket/13023
   // user_pref("dom.gamepad.enabled", false);
// 4607: [2503] disable giving away network info [FF31+]
   // e.g. bluetooth, cellular, ethernet, wifi, wimax, other, mixed, unknown, none
   // [1] https://developer.mozilla.org/docs/Web/API/Network_Information_API
   // [2] https://wicg.github.io/netinfo/
   // [3] https://bugzilla.mozilla.org/960426
user_pref("dom.netinfo.enabled", false); // [DEFAULT: true on Android]
// 4608: [2021] disable the SpeechSynthesis (Text-to-Speech) part of the Web Speech API
   // [1] https://developer.mozilla.org/docs/Web/API/Web_Speech_API
   // [2] https://developer.mozilla.org/docs/Web/API/SpeechSynthesis
   // [3] https://wiki.mozilla.org/HTML5_Speech_API
user_pref("media.webspeech.synth.enabled", false);
// * * * /
// FF57+
// 4610: [2506] disable video statistics - JS performance fingerprinting [FF25+]
   // [1] https://trac.torproject.org/projects/tor/ticket/15757
   // [2] https://bugzilla.mozilla.org/654550
user_pref("media.video_stats.enabled", false);
// 4611: [2509] disable touch events
   // fingerprinting attack vector - leaks screen res & actual screen coordinates
   // 0=disabled, 1=enabled, 2=autodetect
   // Optional protection depending on your device
   // [1] https://developer.mozilla.org/docs/Web/API/Touch_events
   // [2] https://trac.torproject.org/projects/tor/ticket/10286
   // user_pref("dom.w3c_touch_events.enabled", 0);
// * * * /
// FF59+
// 4612: [2511] disable MediaDevices change detection [FF51+]
   // [1] https://developer.mozilla.org/docs/Web/Events/devicechange
   // [2] https://developer.mozilla.org/docs/Web/API/MediaDevices/ondevicechange
user_pref("media.ondevicechange.enabled", false);
// * * * /
// FF60+
// 4613: [2011] disable WebGL debug info being available to websites
   // [1] https://bugzilla.mozilla.org/1171228
   // [2] https://developer.mozilla.org/docs/Web/API/WEBGL_debug_renderer_info
user_pref("webgl.enable-debug-renderer-info", false);
// * * * /
// FF65+
// 4614: [2516] disable PointerEvents
   // [1] https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
user_pref("dom.w3c_pointer_events.enabled", false);
// * * * /
// FF67+
// 4615: [2618] disable exposure of system colors to CSS or canvas [FF44+]
  // [NOTE] See second listed bug: may cause black on black for elements with undefined colors
  // [SETUP-CHROME] Might affect CSS in themes and extensions
  // [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=232227,1330876
user_pref("ui.use_standins_for_native_colors", true);
// * * * /
// FF41+
// 4620: mitigate fingerprinting via canvas
  // [NOTE] This setting has been removed from gHacks v67 (see [1]) but is still enabled by default.
  // [1] https://github.com/ghacksuserjs/ghacks-user.js/commit/8b07fd57d0f8a31dab25661d51235fe1b0c6360c
user_pref("canvas.capturestream.enabled", false);
// * * * /
// ***/

/*** [SECTION 4700]: RFP ALTERNATIVES (NAVIGATOR / USER AGENT (UA) SPOOFING)
     This is FYI ONLY. These prefs are INSUFFICIENT(a) on their own, you need
     to use RFP (4500) or an extension, in which case they become POINTLESS.
     (a) Many of the components that make up your UA can be derived by other means.
         And when those values differ, you provide more bits and raise entropy.
         Examples of leaks include navigator objects, date locale/formats, iframes,
         headers, tcp/ip attributes, feature detection, and **many** more.
     ALL values below intentionally left blank - use RFP, or get a vetted, tested
         extension and mimic RFP values to *lower* entropy, or randomize to *raise* it
***/
user_pref("_user.js.parrot", "4700 syntax error: the parrot's taken 'is last bow");
/* 4701: navigator.userAgent ***/
   // user_pref("general.useragent.override", ""); // [HIDDEN PREF]
/* 4702: navigator.buildID
 * Revealed build time down to the second. In FF64+ it now returns a fixed timestamp
 * [1] https://bugzilla.mozilla.org/583181
 * [2] https://www.fxsitecompat.com/en-CA/docs/2018/navigator-buildid-now-returns-a-fixed-timestamp/ ***/
   // user_pref("general.buildID.override", ""); // [HIDDEN PREF]
/* 4703: navigator.appName ***/
   // user_pref("general.appname.override", ""); // [HIDDEN PREF]
/* 4704: navigator.appVersion ***/
   // user_pref("general.appversion.override", ""); // [HIDDEN PREF]
/* 4705: navigator.platform ***/
   // user_pref("general.platform.override", ""); // [HIDDEN PREF]
/* 4706: navigator.oscpu ***/
   // user_pref("general.oscpu.override", ""); // [HIDDEN PREF]
/* 4707: Limit user-agent data by imitating Firefox's user-agent */
   // user_pref("general.useragent.compatMode.firefox", true);

/*** [SECTION 5000]: PERSONAL
     Non-project related but useful. If any of these interest you, add them to your overrides ***/
user_pref("_user.js.parrot", "5000 syntax error: this is an ex-parrot!");
/* WELCOME & WHAT's NEW NOTICES ***/
   //user_pref("mailnews.start_page_override.mstone", "ignore"); // master switch
/* WARNINGS ***/
   // user_pref("full-screen-api.warning.delay", 0);
   // user_pref("full-screen-api.warning.timeout", 0);
   // user_pref("general.warnOnAboutConfig", false);
/* APPEARANCE ***/
   // user_pref("toolkit.cosmeticAnimations.enabled", false); // [FF55+]
   // user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // [FF68+] allow userChrome/userContent
/* CONTENT BEHAVIOR ***/
   // user_pref("accessibility.typeaheadfind", true); // enable "Find As You Type"
   // user_pref("clipboard.autocopy", false); // disable autocopy default [LINUX]
/* UX BEHAVIOR ***/
   // user_pref("general.autoScroll", false); // middle-click enabling auto-scrolling [WINDOWS] [MAC]
   // user_pref("ui.key.menuAccessKey", 0); // disable alt key toggling the menu bar [RESTART]
/* OTHER ***/
   // user_pref("network.manage-offline-status", false); // see bugzilla 620472
   // user_pref("xpinstall.signatures.required", false); // enforced extension signing (Nightly/ESR)
/* Set custom headers ***/
   // user_pref("mail.identity.id1.headers", "References, InReplyTo");
   // user_pref("mail.identity.id1.header.References", "References: <2ad46d80-c8ce-49a3-9896-16171788ac28@example.tld>\n <31ff00c2-b7cb-4063-beeb-a0bdd424c3a7@example1.tld>");
   // user_pref("mail.identity.id1.header.InReplyTo", "In-Reply-To: <31ff00c2-b7cb-4063-beeb-a0bdd424c3a7@example1.tld>");
user_pref("mail.identity.id1.headers", "");
user_pref("mail.identity.id1.header.References", "");
user_pref("mail.identity.id1.header.InReplyTo", "");

/*** [SECTION 6000]: THUNDERBIRD (AUTO CONFIG / UI / HEADERS / ADDRESS BOOK)
   Options general to Thunderbird's mail configuration and user interface

   [1] https://dxr.mozilla.org/comm-release/
   [2] http://kb.mozillazine.org/Mail_and_news_settings
***/
user_pref("_user.js.parrot", "6000 syntax error: this parrot is blind!");

/** AUTO CONFIG ***/
/* 6001: Disable auto-configuration
 * [SETUP-INSTALL] These options disable auto-configuration of mail servers in Thunderbird.
 * Such settings require a query to Mozilla which could have privacy implications
 * if the user wishes to keep the existence of the mail provider private.
 * [1] https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Autoconfiguration ***/
user_pref("mailnews.auto_config.guess.enabled", false);
user_pref("mailnews.auto_config.fetchFromISP.enabled", false);
user_pref("mailnews.auto_config.fetchFromISP.sendEmailAddress", false);
user_pref("mailnews.auto_config.fetchFromExchange.enabled", false);
user_pref("mailnews.auto_config_url", "");
user_pref("mailnews.auto_config.addons_url","");

/** UI (User Interface) ***/
/* 6002: Hide tab bar
 * false=Hides the tab bar if there is only one tab. (default) ***/
user_pref("mail.tabs.autoHide", true);
/* 6003: Show full email instead of just name from address book
 * true=Show just the display name for people in the address book (default)
 * false=Show both the email address and display name. ***/
user_pref("mail.showCondensedAddresses", false);
/* 6010: Disable "Filelink for Large Attachments" feature
 * [1] https://support.thunderbird.net/kb/filelink-large-attachments ***/
user_pref("mail.cloud_files.enabled", false);
user_pref("mail.cloud_files.inserted_urls.footer.link", "");
/* 6020: Don't hide cookies and passwords related (advanced?) buttons ***/
user_pref("pref.privacy.disable_button.view_cookies", false);
user_pref("pref.privacy.disable_button.cookie_exceptions", false);
user_pref("pref.privacy.disable_button.view_passwords", false);

/** HEADERS ***/
/* 6004:
 * true=Show Sender header in message pane.
 * false=Does nothing. (default) ***/
user_pref("mailnews.headers.showSender", true);
/* 6005:
 * true=Show User Agent header in message pane
 * false=Does nothing. (default) ***/
user_pref("mailnews.headers.showUserAgent", false);
/* 6006: Hello argument
 * Lets you replace your IP address with the specified string in Received: headers when your
 * IP address is not a "fully qualified domain name" (FQDN). Typically you only need to do this
 * when you have a NAT box to prevent it from using the NAT boxes IP address.
 * If you don't set it to something in your SMTP server's domain it may increase your spam
 * score. ***/
user_pref("mail.smtpserver.default.hello_argument", "[127.0.0.1]");
/* 6007: Displayed dates and times
 * [SETUP-INSTALL] When your e-mail program displays the e-mail's date and time, it normally
 * converts them to your time zone. If your computer's time zone settings are wrong, then you will
 * see the wrong time (and possibly the wrong date).
 * To turn this conversion off, you can use a preference setting.
 * It affects the headers that you see in e-mails that you open or preview, but it does not affect
 * the Date column in folders.
 * [1] http://kb.mozillazine.org/Time_and_time_zone_settings
 * [2] http://wiki.cacert.org/ThunderBirdAdvancedConfig
 * ***/
user_pref("mailnews.display.original_date", false);
/* 6008: Display the sender's Timezone when set to true ***/
user_pref("mailnews.display.date_senders_timezone", false);
/* 6009: Display Time Date based on Received Header
 * Thunderbird shows the time when the message was sent, according to the sender. It is possible
 * to make Thunderbird show the time when the message arrived on your mail server, based on the
 * "Received" header. Set the following preference. New messages will show the time the message
 * was received, rather than when it was sent. ***/
user_pref("mailnews.use_received_date", "true");

/** ADDRESS BOOK ***/
/* 6007: Address book collection
 * [SETUP-FEATURE] Disable address book email collection
 * Consider using https://addons.thunderbird.net/addon/cardbook instead ***/
user_pref("mail.collect_addressbook", false);
user_pref("mail.collect_email_address_outgoing", false);

/*** [SECTION 6100]: EMAIL COMPOSITION (ENCODING / FORMAT / VIEW)
   Options that relate to composition, formatting and viewing email
***/
user_pref("_user.js.parrot", "6100 syntax error: this parrot has got no mail!");

/** ENCODING ***/
/* 6101: Prevent fallback encoding to windows-1252, prefer 7bit or 8bit UTF-8
 * [1] http://forums.mozillazine.org/viewtopic.php?f=28&t=267341
 * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=214729
 * [3] https://stackoverflow.com/a/28531705 ***/
user_pref("intl.fallbackCharsetList.ISO-8859-1", "UTF-8");
/* 6102: Set encoding of incoming mail
 * [SETTING] Display > Advanced > Fonts & Encodings > Incoming Mail ***/
user_pref("mailnews.view_default_charset", "UTF-8");
/* 6103: Set encoding of outgoing mail
 * [SETTING] Display > Advanced > Fonts & Encodings > Outgoing Mail ***/
user_pref("mailnews.send_default_charset", "UTF-8");
/* 6104: Forces encoding in reply to be the default charset
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=234958#c2 ***/
user_pref("mailnews.reply_in_default_charset", true);

/** COMPOSITION ***/
/* 6105: Check spelling before sending [SETUP-FEATURE]
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=667133 ***/
user_pref("mail.SpellCheckBeforeSend", false);
/* 6106: Never send HTML only emails. (0=Ask, 1=Send as plain text, 2=Send as HTML anyway,
 *  3=Include both plain text and HTML message bodies in message)
 * Email that is HTML should also have plaintext multipart for plain text users.
 * [1] https://drewdevault.com/2016/04/11/Please-use-text-plain-for-emails.html
 * [SETTING] Edit > Preferences > Send Options > Send the message in both plain text and HTML ***/
user_pref("mail.default_html_action", 3);
/* 6107: Send email in plaintext unless expressly overridden.
 * [SETUP-FEATURE] Sometimes HTML is useful especially when used with Markdown Here
 * [NOTE] Holding down shift when you click on "Write" will bypass
 * [1] http://kb.mozillazine.org/Plain_text_e-mail_%28Thunderbird%29
 * [2] https://support.mozilla.org/en-US/questions/1004181
 * [3] https://markdown-here.com ***/
user_pref("mail.html_compose", false);
user_pref("mail.identity.default.compose_html", false);
/* 6108: Downgrade email to plaintext by default
 * [SETUP-FEATURE] Only use HTML email if you need it, see above
 * [SETTING] Edit > Preferences > Composition > Send Options > Send messages as plain-text if possible ***/
user_pref("mailnews.sendformat.auto_downgrade", false);
/* 6109: What classes can process incoming data.
 * (0=All classes (default), 1=Don't display HTML, 2=Don't display HTML and inline images,
 * 3=Don't display HTML, inline images and some other uncommon types, 100=Use a hard coded list)
 * In the past this has mitigated a vulnerability CVE-2008-0304 (rare)
 * [1] https://www.mozilla.org/en-US/security/advisories/mfsa2008-12/
 * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=677905 ***/
user_pref("mailnews.display.disallow_mime_handlers", 0);
/* 6110: How to display HTML parts of a message body
 * (0=Display the HTML normally (default), 1=Convert it to text and then back again
 * 2=Display the HTML source, 3=Sanitize the HTML, 4=Display all body parts)
 * (in trunk builds later than 2011-07-23)
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=602718
 * [2] https://hg.mozilla.org/comm-central/rev/c1ef44a22eb2
 * [3] https://www.bucksch.org/1/projects/mozilla/108153/ ***/
user_pref("mailnews.display.html_as", 3);
/* 6111: Prefer to view as plaintext or html [SETUP-FEATURE]
 * true=Display a message as plain text when there is both a HTML and a plain
 * text version of a message body
 * false=Display a message as HTML when there is both a HTML and a plain text
 * version of a message body. (default) ***/
user_pref("mailnews.display.prefer_plaintext", false);
/* 6112: Inline attachments [SETUP-FEATURE]
 * true=Show inlinable attachments (text, images, messages) after the message.
 * false=Do not display any attachments with the message ***/
user_pref("mail.inline_attachments", false);
/* 6113: Big attachment warning
 * [1] https://support.mozilla.org/en-US/questions/1081046
 * [2] http://forums.mozillazine.org/viewtopic.php?f=39&t=2949521 */
user_pref("mail.compose.big_attachments.notify", true); // [DEFAULT: true]
/* 6114: Set big attachment size to warn at */
   // user_pref("mailnews.message_warning_size", 20971520); // DEFAULT size

/** VIEW ***/
/* 6115: Disable JavaScript
 * [NOTE] JavaScript is already disabled in message content.
 * [1] https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Releases/3
 * [2] https://stackoverflow.com/questions/3054315/is-javascript-supported-in-an-email-message
 * ***/
user_pref("javascript.enabled", false);
/* 6116: Disable media source extensions
 * [1] https://www.ghacks.net/2014/05/10/enable-media-source-extensions-firefox ***/
user_pref("media.mediasource.enabled", false);
/* 6117: Disable hardware decoding support ***/
user_pref("media.hardware-video-decoding.enabled", false);
/* 6118: Default image permissions
 * 1=Allow all images to load, regardless of origin. (Default),
 * 2=Block all images from loading.
 * 3=Prevent third-party images from loading
 * [1] http://kb.mozillazine.org/Permissions.default.image ***/
user_pref("permissions.default.image", 2);

/*** [SECTION 6200]: OTHER THUNDERBIRD COMPONENTS (CHAT / CALENDAR / RSS)
   Options that relate to other Thunderbird components such as the chat client, calendar and rss)
***/
user_pref("_user.js.parrot", "6200 syntax error: this parrot is not tweeting!");

/** CHAT ***/
/* 6201: Disable chat functionality ***/
user_pref("mail.chat.enabled", false);
/* 6202: Disable logging of group chats ***/
user_pref("purple.logging.log_chats", false);
/* 6203: Disable logging of 1 to 1 conversations ***/
user_pref("purple.logging.log_ims", false);
/* 6204: Disable logging of system messages ***/
user_pref("purple.logging.log_system", false);
/* 6205: Disable typing notifications ***/
user_pref("purple.conversations.im.send_typing", false);
/* 6210: When chat is enabled, do not connect to accounts automatically
 * 0=Do not connect / show the account manager,
 * 1=Connect automatically. (Default) ***/
   // user_pref("messenger.startup.action", 0);

/** CALENDAR ***/
/* 6206: Disable calendar integration
  * [SETUP-FEATURE] Lightning calendar add-on is integrated in Thunderbird 38 and later.
  * Keeping this preference false allows us to properly show the opt-in/opt-out dialog
  * on new profiles fresh start, see [3].
  * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=401779
  * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1130854
  * [3] https://bugzilla.mozilla.org/show_bug.cgi?id=1130852 ***/
user_pref("mail.calendar-integration.opt-out", false);
/* 6207: Set user agent for calendar ***/
user_pref("calendar.useragent.extra", "");

/** RSS ***/
/** These features don't actually do anything as they aren't implemented
 * [1] https://dxr.mozilla.org/comm-release/source/mail/base/content/mailWindowOverlay.js#649
 * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=458606#c9
/* 6208: What classes can process incoming data.
 * (0=All classes (default), 1=Don't display HTML, 2=Don't display HTML and inline images,
 * 3=Don't display HTML, inline images and some other uncommon types, 100=Use a hard coded list)
 * [1] https://www.privacy-handbuch.de/handbuch_31j.htm
user_pref("rss.display.disallow_mime_handlers", 3);
/* 6209: How to display HTML parts of a message body
 * (0=Display the HTML normally (default), 1=Convert it to text and then back again
 * 2=Display the HTML source, 3=Sanitize the HTML, 4=Display all body parts)
 * (in trunk builds later than 2011-07-23)
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=602718
 * [2] https://hg.mozilla.org/comm-central/rev/c1ef44a22eb2
 * [3] https://www.bucksch.org/1/projects/mozilla/108153/
user_pref("rss.display.html_as", 1);
/* 6210: Prefer to view as plaintext or html
 * true=Display a message as plain text when there is both a HTML and a plain
 * text version of a message body
 * false=Display a message as HTML when there is both a HTML and a plain text
 * version of a message body. (default)
user_pref("rss.display.prefer_plaintext", true);
**/
/* 6211: Feed message display (summary or web page), on open.
 * Action on double click or enter in threadpane for a feed message.
 * 0=open content-base url in new window, 1=open summary in new window,
 * 2=toggle load summary and content-base url in message pane,
 * 3=load content-base url in browser
 * [1] http://forums.mozillazine.org/viewtopic.php?f=39&t=2502335 ***/
user_pref("rss.show.content-base", 3);
/* 6212: Feed message display (summary or web page), on select.
 * 0=global override, load web page, 1=global override, load summary,
 * 2=use default feed folder setting from Subscribe dialog; if no setting default to 1 ***/
user_pref("rss.show.summary", 1);
/* 6213: Feed message additional web page display.
 * 0=no action, 1=load web page in default browser, on select ***/
user_pref("rss.message.loadWebPageOnSelect", 0);

/*** [SECTION 6300]: THUNDERBIRD ENCRYPTION (ENIGMAIL / AUTOCRYPT)
   Options that relate the Enigmail addon and AutoCrypt
   [1] https://autocrypt.org
   [2] https://www.enigmail.net/index.php/en/user-manual/advanced-operations
***/
user_pref("_user.js.parrot", "6300 syntax error: this parrot is talking in codes!");

/** ENIGMAIL ***/
/* These used to be inversed, however it seems upstream has changed this behavior
 * [1] https://www.privacy-handbuch.de/handbuch_31f.htm ***/
/* 6301: Silence the Enigmail version header ***/
user_pref("extensions.enigmail.addHeaders", false); // Default
/* 6302: Silence the Enigmail comment ***/
user_pref("extensions.enigmail.useDefaultComment", true); // Default
/* 6303: Silence the version ***/
user_pref("extensions.enigmail.agentAdditionalParam", "--no-emit-version --no-comments");
/* 6304: Specifies the hash algorithm used by GnuPG for its cryptographic operations:
 * 0=automatic selection, let GnuPG choose (default, recommended), 1=SHA1, 2=RIPEMD160
 * 3=SHA256, 4=SHA384, 5=SHA512
 * [NOTE] You should probably have a decent gpg.conf with things set. Examples
 * [1] https://github.com/Whonix/anon-gpg-tweaks/blob/master/etc/skel/.gnupg/gpg.conf
 * [2] https://github.com/ioerror/torbirdy/blob/master/gpg.conf
 * ***/
user_pref("extensions.enigmail.mimeHashAlgorithm", 5);
/* 6305: Protect subject line
 * 0=Leave subject unprotected,
 * 1=Show dialog with "Leave subject unprotected" (changes value to 0)
 *                     or "Protect subject" (changes value to 2,
 * 2=Protect subject***/
user_pref("extensions.enigmail.protectedHeaders", 2);
/* 6306: Text to use as replacement for the subject, following the Memory Hole
 * standard. If nothing is defined, then "Encrypted Message" is used.
 ***/
user_pref("extensions.enigmail.protectedSubjectText", "Encrypted Message"); // Default

/** AUTOCRYPT ***/
/* 6307: Choose whether to enable AutoCrypt
 * [1] https://autocrypt.org/level1.html
 * [2] https://redmine.tails.boum.org/code/issues/16186
 * [SETTING] Edit > Account Settings > OpenPGP Security > Autocrypt > Enable Autocrypt ***/
user_pref("mail.server.default.enableAutocrypt", false);
/* 6308: Prefer email encryption with known contacts
 * [SETTING] Edit > Account Settings > OpenPGP Security > Autocrypt >
 *           Prefer encrypted emails from the people you exchange email with
 *  [1] https://redmine.tails.boum.org/code/issues/15923 ***/
user_pref("mail.server.default.acPreferEncrypt", 0);

/*** [SECTION 9999]: DEPRECATED / REMOVED / LEGACY / RENAMED
     Documentation denoted as [-]. Items deprecated prior to FF61 have been archived at [1], which
     also provides a link-clickable, viewer-friendly version of the deprecated bugzilla tickets
     [1] https://github.com/ghacksuserjs/ghacks-user.js/issues/123
***/
user_pref("_user.js.parrot", "9999 syntax error: the parrot's deprecated!");
/* ESR60.x still uses all the following prefs
// [NOTE] replace the * with a slash in the line above to re-enable them
// FF61
// 2612: disable remote JAR files being opened, regardless of content type [FF42+]
   // [1] https://bugzilla.mozilla.org/1173171
   // [2] https://www.fxsitecompat.com/en-CA/docs/2015/jar-protocol-support-has-been-disabled-by-default/
   // [-] https://bugzilla.mozilla.org/1427726
user_pref("network.jar.block-remote-files", true);
// 2613: disable JAR from opening Unsafe File Types
   // [-] https://bugzilla.mozilla.org/1427726
user_pref("network.jar.open-unsafe-types", false);
// * * * /
// FF62
// 1803: disable Java plugin
   // [-] (part5) https://bugzilla.mozilla.org/1461243
user_pref("plugin.state.java", 0);
// * * * /
// FF63
// 0202: disable GeoIP-based search results
   // [NOTE] May not be hidden if Firefox has changed your settings due to your locale
   // [-] https://bugzilla.mozilla.org/1462015
user_pref("browser.search.countryCode", "US"); // [HIDDEN PREF]
// 0301a: disable auto-update checks for Firefox
   // [SETTING] General>Firefox Updates>Never check for updates
   // [-] https://bugzilla.mozilla.org/1420514
   // user_pref("app.update.enabled", false);
// * * * /
// FF66
// 0380: disable Browser Error Reporter [FF60+]
   // [1] https://support.mozilla.org/en-US/kb/firefox-nightly-error-collection
   // [2] https://firefox-source-docs.mozilla.org/browser/browser/BrowserErrorReporter.html
   // [-] https://bugzilla.mozilla.org/1509888
user_pref("browser.chrome.errorReporter.enabled", false);
user_pref("browser.chrome.errorReporter.submitUrl", "");
// 0502: disable Mozilla permission to silently opt you into tests
   // [-] https://bugzilla.mozilla.org/1415625
user_pref("network.allow-experiments", false);
// * * * /
// FF68
// 0307: disable auto updating of lightweight themes (LWT)
   // Not to be confused with themes in 0301* + 0302*, which use the FF55+ Theme API
   // Mozilla plan to convert existing LWTs and remove LWT support in the future, see [1]
   // [1] https://blog.mozilla.org/addons/2018/09/20/future-themes-here/
   // [-] (part3b) https://bugzilla.mozilla.org/1525762
user_pref("lightweightThemes.update.enabled", false);
// 2682: enable CSP 1.1 experimental hash-source directive [FF29+]
   // [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=855326,883975
   // [-] https://bugzilla.mozilla.org/1386214
user_pref("security.csp.experimentalEnabled", true);
// * * * /
// ***/

/* END: internal custom pref to test for syntax errors ***/
user_pref("_user.js.parrot", "SUCCESS: No no he's not dead, he's, he's restin'!");
