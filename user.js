/******
* name: thunderbird user.js
* date: 12 September 2021
* version: v91-beta
* url: https://github.com/HorlogeSkynet/thunderbird-user.js
* license: MIT (https://github.com/HorlogeSkynet/thunderbird-user.js/blob/master/LICENSE)
* releases: https://github.com/HorlogeSkynet/thunderbird-user.js/releases

* README:

  1. Consider using Tor if it meets your needs or fits your threat model
       * https://www.torproject.org/about/torusers.html.en
  2. Required reading: Overview, Backing Up, and Implementation entries
       * https://github.com/HorlogeSkynet/thunderbird-user.js/wiki
  3. If you skipped step 2, return to step 2
  4. Make changes
       * There are often trade-offs and conflicts between security vs privacy vs anti-fingerprinting
         and these need to be balanced against functionality & convenience & breakage
       * Some site breakage and unintended consequences will happen. Everyone's experience will differ
         e.g. some user data is erased on close (section 2800), change this to suit your needs
       * While not 100% definitive, search for "[SETUP" tags
         e.g. wanna re-enable account auto configuration? check 9101 & 9102
       * Take the wiki link in step 2 and read the Troubleshooting entry
  5. Some tag info
        [SETUP-INSTALL] if you experience any issue during Thunderbird setting up, read it
        [SETUP-FEATURE] if you miss some (expected) Thunderbird features, read it
       [SETUP-SECURITY] it's one item, read it
            [SETUP-WEB] can cause some websites to break
         [SETUP-CHROME] changes how Thunderbird itself behaves (i.e. not directly website related)

* INDEX:

  0100: STARTUP
  0200: GEOLOCATION / LANGUAGE / LOCALE
  0300: QUIETER BIRD
  0400: SAFE BROWSING
  0600: BLOCK IMPLICIT OUTBOUND
  0700: DNS / DoH / PROXY / SOCKS / IPv6
  0800: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS
  0900: PASSWORDS
  1000: DISK AVOIDANCE
  1200: HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
  1400: FONTS
  1600: HEADERS / REFERERS
  1700: CONTAINERS
  2000: PLUGINS / MEDIA / WEBRTC
  2300: WEB WORKERS
  2400: DOM (DOCUMENT OBJECT MODEL)
  2500: FINGERPRINTING
  2600: MISCELLANEOUS
  2700: PERSISTENT STORAGE
  2800: SHUTDOWN
  4000: FPI (FIRST PARTY ISOLATION)
  4500: RFP (RESIST FINGERPRINTING)
  5000: OPTIONAL OPSEC
  5500: OPTIONAL HARDENING
  6000: DON'T TOUCH
  7000: DON'T BOTHER
  8000: DON'T BOTHER: NON-RFP
  9000: PERSONAL
  9100: THUNDERBIRD (AUTO CONFIG / UI / HEADERS / ADDRESS BOOK)
  9200: EMAIL COMPOSITION (ENCODING / FORMAT / VIEW)
  9300: OTHER THUNDERBIRD COMPONENTS (CHAT / CALENDAR / RSS)
  9400: THUNDERBIRD ENCRYPTION (ENIGMAIL / AUTOCRYPT / GNUPG)
  9999: DEPRECATED / REMOVED / LEGACY / RENAMED

******/

/* START: internal custom pref to test for syntax errors
 * [NOTE] Not all syntax errors cause parsing to abort i.e. reaching the last debug pref
 * no longer necessarily means that all prefs have been applied. Check the console right
 * after startup for any warnings/error messages related to non-applied prefs
 * [1] https://blog.mozilla.org/nnethercote/2018/03/09/a-new-preferences-parser-for-firefox/ ***/
user_pref("_user.js.parrot", "START: Oh yes, the Norwegian Blue... what's wrong with it?");

/* 0000: disable about:config warning ***/
user_pref("browser.aboutConfig.showWarning", false);

/*** [SECTION 0100]: STARTUP ***/
user_pref("_user.js.parrot", "0100 syntax error: the parrot's dead!");
/* 0101: disable default browser check
 * [SETTING] Edit>Preferences>Advanced>Always check to see if Thunderbird is the default mail client on startup ***/
user_pref("mail.shell.checkDefaultClient", false);
/* 0102: set START page [SETUP-CHROME]
 * [SETTING] Edit>Preferences>General>Thunderbird Start Page ***/
user_pref("mailnews.start_page.enabled", false);

/*** [SECTION 0200]: GEOLOCATION / LANGUAGE / LOCALE ***/
user_pref("_user.js.parrot", "0200 syntax error: the parrot's definitely deceased!");
/* 0201: use Mozilla geolocation service instead of Google if permission is granted [FF74+]
 * Optionally enable logging to the console (defaults to false) ***/
user_pref("geo.provider.network.url", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");
   // user_pref("geo.provider.network.logging.enabled", true); // [HIDDEN PREF]
/* 0202: disable using the OS's geolocation service ***/
user_pref("geo.provider.ms-windows-location", false); // [WINDOWS]
user_pref("geo.provider.use_corelocation", false); // [MAC]
user_pref("geo.provider.use_gpsd", false); // [LINUX]
/* 0203: disable region updates
 * [1] https://firefox-source-docs.mozilla.org/toolkit/modules/toolkit_modules/Region.html ***/
user_pref("browser.region.network.url", ""); // [FF78+]
user_pref("browser.region.update.enabled", false); // [[FF79+]
/* 0204: set search region
 * [NOTE] May not be hidden if Thunderbird has changed your settings due to your region (0203) ***/
   // user_pref("browser.search.region", "US"); // [HIDDEN PREF]
/* 0210: set preferred language for displaying web pages
 * [TEST] https://addons.mozilla.org/about ***/
user_pref("intl.accept_languages", "en-US, en");
/* 0210b: Set dictionary to US ***/
user_pref("spellchecker.dictionary", "en-US");
/* 0211: use US English locale regardless of the system locale
 * [SETUP-WEB] May break some input methods e.g xim/ibus for CJK languages [1]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=867501,1629630 ***/
user_pref("javascript.use_us_english_locale", true); // [HIDDEN PREF]

/*** [SECTION 0300]: QUIET BIRD
     Starting in user.js v68, we only disable the auto-INSTALL of Thunderbird.
     You still get prompts to update, in one click.
     We have NEVER disabled auto-CHECKING, and highly discourage that.
     There are many legitimate reasons to turn off auto-INSTALLS, including hijacked or monetized
     extensions, time constraints, legacy issues, dev/testing, and fear of breakage/bugs. It is
     still important to do updates for security reasons, please do so manually if you make changes.
***/
user_pref("_user.js.parrot", "0300 syntax error: the parrot's not pinin' for the fjords!");
/** UPDATES ***/
/* 0301: disable auto-INSTALLING Thunderbird updates [NON-WINDOWS]
 * [NOTE] You will still get prompts to update, and should do so in a timely manner
 * [SETTING] General>Thunderbird Updates>Check for updates but let you choose to install them... ***/
user_pref("app.update.auto", false);
/* 0302: disable auto-INSTALLING Thunderbird updates via a background service [FF90+] [WINDOWS]
 * [SETTING] General>Thunderbird Updates>Automatically install updates>Use a background service to install updates
 * [1] https://support.mozilla.org/kb/enable-background-updates-firefox-windows ***/
user_pref("app.update.background.scheduling.enabled", false);
/* 0303: disable auto-CHECKING for extension and theme updates ***/
   // user_pref("extensions.update.enabled", false);
/* 0304: disable auto-INSTALLING extension and theme updates (after the check in 0303)
 * [SETTING] about:addons>Extensions>[cog-wheel-icon]>Update Add-ons Automatically (toggle) ***/
   // user_pref("extensions.update.autoUpdateDefault", false);
/* 0305: disable extension metadata
 * used when installing/updating an extension, and in daily background update checks:
 * when false, extension detail tabs will have no description
 * [NOTE] Unlike arkenfox/user.js, we explicitly disable it ***/
user_pref("extensions.getAddons.cache.enabled", false);
/* 0306: disable search engine updates (e.g. OpenSearch)
 * [NOTE] This does not affect Mozilla's built-in or Web Extension search engines ***/
user_pref("browser.search.update", false);
/* 0307: disable System Add-on updates ***/
user_pref("extensions.systemAddon.update.enabled", false); // [FF62+]
user_pref("extensions.systemAddon.update.url", ""); // [FF44+]

/** RECOMMENDATIONS ***/
/* 0320: disable recommendation pane in about:addons (uses Google Analytics) ***/
user_pref("extensions.getAddons.showPane", false); // [HIDDEN PREF]
/* 0321: disable recommendations in about:addons' Extensions and Themes panes [FF68+] ***/
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);

/** TELEMETRY ***/
/* 0330: disable new data submission [FF41+]
 * If disabled, no policy is shown or upload takes place, ever
 * [1] https://bugzilla.mozilla.org/1195552 ***/
user_pref("datareporting.policy.dataSubmissionEnabled", false);
/* 0331: disable Health Reports
 * [SETTING] Privacy & Security>Thunderbird Data Collection & Use>Allow Thunderbird to send technical... data ***/
user_pref("datareporting.healthreport.uploadEnabled", false);
/* 0332: disable telemetry
 * The "unified" pref affects the behaviour of the "enabled" pref
 * - If "unified" is false then "enabled" controls the telemetry module
 * - If "unified" is true then "enabled" only controls whether to record extended data
 * [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
 * [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
 * [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
user_pref("toolkit.telemetry.prompted", 2);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
/* 0333: disable Telemetry Coverage
  * [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/ ***/
 user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
 user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
 user_pref("toolkit.coverage.endpoint.base", "");
/* 0334: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
 * Defense-in-depth: currently covered by 0331 ***/
user_pref("browser.ping-centre.telemetry", false);

/** STUDIES ***/
/* 0340: disable Studies
 * [NOTE] This option is missing from Thunderbird's preferences panel (hidden?) ***/
user_pref("app.shield.optoutstudies.enabled", false);
/* 0341: disable Normandy/Shield [FF60+]
 * Shield is a telemetry system that can push and test "recipes"
 * [1] https://mozilla.github.io/normandy/ ***/
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

/** CRASH REPORTS ***/
/* 0350: disable Crash Reports ***/
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false); // [FF44+]
   // user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // [FF51+] [DEFAULT: false]
/* 0351: enforce no submission of backlogged Crash Reports [FF58+]
 * [SETTING] Privacy & Security>Thunderbird Data Collection & Use>Allow Thunderbird to send backlogged crash reports  ***/
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [DEFAULT: false]

/** OTHER ***/
/* 0360: disable Captive Portal detection
 * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy ***/
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false); // [FF52+]
/* 0361: disable Network Connectivity checks [FF65+]
 * [1] https://bugzilla.mozilla.org/1460537 ***/
user_pref("network.connectivity-service.enabled", false);
/* 0362: enforce disabling of Web Compatibility Reporter [FF56+]
 * Web Compatibility Reporter adds a "Report Site Issue" button to send data to Mozilla ***/
user_pref("extensions.webcompat-reporter.enabled", false); // [DEFAULT: false]
/* 0370: disable UI instrumentation ***/
user_pref("mail.instrumentation.postUrl", "");
user_pref("mail.instrumentation.askUser", false);
user_pref("mail.instrumentation.userOptedIn", false);
/* 0371: disable about:rights notification on fresh profiles
 * When a profile is loaded for the first time, a bottom notification appears with a button
 * showing "Know your rights...". If clicked, the _special_ page about:rights appears.
 * When `mail.rights.override` is unset (default), Thunderbird falls-back on `mail.rights.version`
 * value. If it's unset (default too) or lower than the current version, notification is displayed.
 * false=always show the notification
 * true=never show the notification
 * [1] https://searchfox.org/comm-esr78/rev/384830b0570096c48770398060f87fbe556f6f01/mail/base/content/specialTabs.js#1218 ***/
user_pref("mail.rights.override", true);  // [DEFAULT: unset]
   // user_pref("mail.rights.version", 1)  // [DEFAULT: unset]

/*** [SECTION 0400]: SAFE BROWSING (SB)
   SB has taken many steps to preserve privacy. If required, a full url is never sent
   to Google, only a part-hash of the prefix, hidden with noise of other real part-hashes.
   Firefox takes measures such as stripping out identifying parameters and since SBv4 (FF57+)
   doesn't even use cookies. (#Turn on browser.safebrowsing.debug to monitor this activity)
   FWIW, Google also swear it is anonymized and only used to flag malicious sites.

   [1] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
   [2] https://wiki.mozilla.org/Security/Safe_Browsing
   [3] https://support.mozilla.org/kb/how-does-phishing-and-malware-protection-work
***/
user_pref("_user.js.parrot", "0400 syntax error: the parrot's passed on!");
/* 0401: disable SB (Safe Browsing)
 * [WARNING] Do this at your own risk! These are the master switches
 * [SETTING] Privacy & Security>Security>... Block dangerous and deceptive content ***/
   // user_pref("browser.safebrowsing.malware.enabled", false);
   // user_pref("browser.safebrowsing.phishing.enabled", false);
/* 0402: disable SB checks for downloads (both local lookups + remote)
 * This is the master switch for the safebrowsing.downloads* prefs (0403, 0404)
 * [SETTING] Privacy & Security>Security>... "Block dangerous downloads" ***/
   // user_pref("browser.safebrowsing.downloads.enabled", false);
/* 0403: disable SB checks for downloads (remote)
 * To verify the safety of certain executable files, Thunderbird may submit some information about the
 * file, including the name, origin, size and a cryptographic hash of the contents, to the Google
 * Safe Browsing service which helps Thunderbird determine whether or not the file should be blocked
 * [SETUP-SECURITY] If you do not understand this, or you want this protection, then override it ***/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.url", "");
/* 0404: disable SB checks for unwanted software
 * [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software" ***/
   // user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
   // user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
/* 0405: disable "ignore this warning" on SB warnings [FF45+]
 * If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
 * [TEST] see github wiki APPENDIX A: Test Sites: Section 5
 * [1] https://bugzilla.mozilla.org/1226490 ***/
   // user_pref("browser.safebrowsing.allowOverride", false);

/*** [SECTION 0600]: BLOCK IMPLICIT OUTBOUND [not explicitly asked for - e.g. clicked on] ***/
user_pref("_user.js.parrot", "0600 syntax error: the parrot's no more!");
/* 0601: disable link prefetching
 * [1] https://developer.mozilla.org/docs/Web/HTTP/Link_prefetching_FAQ ***/
user_pref("network.prefetch-next", false);
/* 0602: disable DNS prefetching
 * [1] https://developer.mozilla.org/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control ***/
user_pref("network.dns.disablePrefetch", true);
   // user_pref("network.dns.disablePrefetchFromHTTPS", true); // [DEFAULT: true]
/* 0603: disable predictor / prefetching ***/
user_pref("network.predictor.enabled", false);
   // user_pref("network.predictor.enable-prefetch", false); // [FF48+] [DEFAULT: false]
/* 0604: disable link-mouseover opening connection to linked server
 * [1] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests ***/
user_pref("network.http.speculative-parallel-limit", 0);
/* 0605: enforce no "Hyperlink Auditing" (click tracking)
 * [1] https://www.bleepingcomputer.com/news/software/major-browsers-to-prevent-disabling-of-click-tracking-privacy-risk/ ***/
   // user_pref("browser.send_pings", false); // [DEFAULT: false]
/* 0610: don't refresh nor reload pages when tab/window is not active or in idle state
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=518805 ***/
user_pref("browser.meta_refresh_when_inactive.disabled", true);

/*** [SECTION 0700]: DNS / DoH / PROXY / SOCKS / IPv6 ***/
user_pref("_user.js.parrot", "0700 syntax error: the parrot's given up the ghost!");
/* 0701: disable IPv6
 * IPv6 can be abused, especially with MAC addresses, and can leak with VPNs: assuming
 * your ISP and/or router and/or website is IPv6 capable. Most sites will fall back to IPv4
 * [STATS] Firefox telemetry (July 2021) shows ~10% of all connections are IPv6
 * [NOTE] This is an application level fallback. Disabling IPv6 is best done at an
 * OS/network level, and/or configured properly in VPN setups. If you are not masking your IP,
 * then this won't make much difference. If you are masking your IP, then it can only help.
 * [NOTE] PHP defaults to IPv6 with "localhost". Use "php -S 127.0.0.1:PORT"
 * [TEST] https://ipleak.org/
 * [1] https://www.internetsociety.org/tag/ipv6-security/ (Myths 2,4,5,6) ***/
user_pref("network.dns.disableIPv6", true);
user_pref("network.notify.IPv6", false);
/* 0702: set the proxy server to do any DNS lookups when using SOCKS
 * e.g. in Tor, this stops your local DNS server from knowing your Tor destination
 * as a remote Tor node will handle the DNS request
 * [1] https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers ***/
user_pref("network.proxy.socks_remote_dns", true);
/* 0703: disable using UNC (Uniform Naming Convention) paths [FF61+]
 * [SETUP-CHROME] Can break extensions for profiles on network shares
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/26424 ***/
user_pref("network.file.disable_unc_paths", true); // [HIDDEN PREF]
/* 0704: disable GIO as a potential proxy bypass vector
 * Gvfs/GIO has a set of supported protocols like obex, network, archive, computer, dav, cdda,
 * gphoto2, trash, etc. By default only smb and sftp protocols are accepted so far (as of FF64)
 * [1] https://bugzilla.mozilla.org/1433507
 * [2] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/23044
 * [3] https://en.wikipedia.org/wiki/GVfs
 * [4] https://en.wikipedia.org/wiki/GIO_(software) ***/
user_pref("network.gio.supported-protocols", ""); // [HIDDEN PREF]
/* 0705: disable DNS-over-HTTPS (DoH) rollout [FF60+]
 * 0=off by default, 2=TRR (Trusted Recursive Resolver) first, 3=TRR only, 5=explicitly off
 * see "doh-rollout.home-region": USA Feb 2020, Canada July 2021 [3]
 * [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
 * [2] https://wiki.mozilla.org/Security/DOH-resolver-policy
 * [3] https://blog.mozilla.org/mozilla/news/firefox-by-default-dns-over-https-rollout-in-canada/
 * [4] https://www.eff.org/deeplinks/2020/12/dns-doh-and-odoh-oh-my-year-review-2020 ***/
   // user_pref("network.trr.mode", 5);
/* 0706: disable proxy direct failover for system requests [FF91+] ***/
user_pref("network.proxy.failover_direct", false);

/*** [SECTION 0800]: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS ***/
user_pref("_user.js.parrot", "0800 syntax error: the parrot's ceased to be!");
/* 0801: disable location bar using search
 * Don't leak URL typos to a search engine, give an error message instead
 * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
 * [NOTE] This does not affect explicit user action such as using search buttons in the
 * dropdown, or using keyword search shortcuts you configure in options (e.g. "d" for DuckDuckGo)
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
/* 0804: disable live search suggestions
 * [NOTE] Both must be true for the location bar to work
 * [SETUP-CHROME] Change these if you trust and use a privacy respecting search engine
 * [SETTING] Search>Provide search suggestions | Show search suggestions in address bar results ***/
user_pref("browser.search.suggest.enabled", false);
/* 0808: disable search and form history
 * [SETUP-WEB] Be aware that autocomplete form data can be read by third parties [1][2]
 * [NOTE] We also clear formdata on exit (2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember search and form history
 * [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html
 * [2] https://bugzilla.mozilla.org/381681 ***/
user_pref("browser.formfill.enable", false);
/* 0809: disable Form Autofill
 * [NOTE] Stored data is NOT secure (uses a JSON file)
 * [NOTE] Heuristics controls Form Autofill on forms without @autocomplete attributes
 * [SETTING] Privacy & Security>Forms and Autofill>Autofill addresses
 * [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill ***/
user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
user_pref("extensions.formautofill.available", "off"); // [FF56+]
user_pref("extensions.formautofill.creditCards.available", false); // [FF57+]
user_pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
user_pref("extensions.formautofill.heuristics.enabled", false); // [FF55+]
/* 0810: disable coloring of visited links
 * Bulk rapid history sniffing was mitigated in 2010 [1][2]. Slower and more expensive
 * redraw timing attacks were largely mitigated in FF77+ [3]. Using RFP (4501) further hampers timing
 * attacks. Don't forget clearing history on close (2803). However, social engineering [2#limits][4][5]
 * and advanced targeted timing attacks could still produce usable results
 * [1] https://developer.mozilla.org/docs/Web/CSS/Privacy_and_the_:visited_selector
 * [2] https://dbaron.org/mozilla/visited-privacy
 * [3] https://bugzilla.mozilla.org/1632765
 * [4] https://earthlng.github.io/testpages/visited_links.html (see github wiki APPENDIX A on how to use)
 * [5] https://lcamtuf.blogspot.com/2016/08/css-mix-blend-mode-is-bad-for-keeping.html ***/
user_pref("layout.css.visited_links_enabled", false);

/*** [SECTION 0900]: PASSWORDS
   [1] https://support.mozilla.org/kb/use-primary-password-protect-stored-logins-and-pas
***/
user_pref("_user.js.parrot", "0900 syntax error: the parrot's expired!");
/* 0901: set when Thunderbird should prompt for the primary password
 * 0=once per session (default), 1=every time it's needed, 2=after n minutes (0902) ***/
user_pref("security.ask_for_password", 2);
/* 0902: set how long in minutes Thunderbird should remember the primary password (0901) ***/
   // user_pref("security.password_lifetime", 30); // [DEFAULT: 30]
/* 0903: disable auto-filling username & password form fields
 * can leak in cross-site forms *and* be spoofed
 * [NOTE] Username & password is still available when you enter the field
 * [1] https://freedom-to-tinker.com/2017/12/27/no-boundaries-for-user-identities-web-trackers-exploit-browser-login-managers/ ***/
user_pref("signon.autofillForms", false);
/* 0904: disable formless login capture for Password Manager [FF51+] ***/
user_pref("signon.formlessCapture.enabled", false);
/* 0905: limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources [FF41+]
 * hardens against potential credentials phishing
 * 0 = don't allow sub-resources to open HTTP authentication credentials dialogs
 * 1 = don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
 * 2 = allow sub-resources to open HTTP authentication credentials dialogs (default) ***/
user_pref("network.auth.subresource-http-auth-allow", 1);
/* 0906: enforce no automatic authentication on Microsoft sites [FF91+] [WINDOWS 10+]
 * [1] https://support.mozilla.org/kb/windows-sso ***/
user_pref("network.http.windows-sso.enabled", false); // [DEFAULT: false]
/* 0910: prevent access to emails until the master password is entered
 * If a master password has been set, Thunderbird will prevent access to locally available emails
 * until the secret is provided.
 * This preference MAY mitigate risk due to intimate relationship threat in some cases (see [2])...
 * [WARNING] This DOES NOT encrypt locally cached emails anyhow (poor man's application security)
 * [1] https://support.mozilla.org/en-US/kb/protect-your-thunderbird-passwords-master-password
 * [2] https://www.schneier.com/wp-content/uploads/2020/06/Privacy_Threats_in_Intimate_Relationships-1.pdf ***/
user_pref("mail.password_protect_local_cache", true);  // [HIDDEN PREF]

/*** [SECTION 1000]: DISK AVOIDANCE ***/
user_pref("_user.js.parrot", "1000 syntax error: the parrot's gone to meet 'is maker!");
/* 1001: disable disk cache
 * [SETUP-CHROME] If you think disk cache helps perf, then feel free to override this
 * [NOTE] We also clear cache on exit (2803) ***/
user_pref("browser.cache.disk.enable", false);
/* 1002: disable media cache from writing to disk in Private Browsing
 * [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB
 * [SETUP-WEB] ESR78: playback might break on subsequent loading (1650281) ***/
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true); // [FF75+]
user_pref("media.memory_cache_max_size", 65536);
/* 1003: disable storing extra session data [SETUP-CHROME]
 * define on which sites to save extra session data such as form content, cookies and POST data
 * 0=everywhere, 1=unencrypted sites, 2=nowhere ***/
user_pref("browser.sessionstore.privacy_level", 2);
/* 1004: set the minimum interval between session save operations
 * Increasing this can help on older machines and some websites, as well as reducing writes [1]
 * [1] https://bugzilla.mozilla.org/1304389 ***/
user_pref("browser.sessionstore.interval", 30000); // [DEFAULT: 15000]
/* 1006: disable favicons in shortcuts
 * URL shortcuts use a cached randomly named .ico file which is stored in your
 * profile/shortcutCache directory. The .ico remains after the shortcut is deleted
 * If set to false then the shortcuts use a generic Firefox icon ***/
user_pref("browser.shell.shortcutFavicons", false);

/*** [SECTION 1200]: HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
   Your cipher and other settings can be used in server side fingerprinting
   [TEST] https://www.ssllabs.com/ssltest/viewMyClient.html
   [TEST] https://browserleaks.com/ssl
   [TEST] https://ja3er.com/
   [1] https://www.securityartwork.es/2017/02/02/tls-client-fingerprinting-with-bro/
***/
user_pref("_user.js.parrot", "1200 syntax error: the parrot's a stiff!");
/** SSL (Secure Sockets Layer) / TLS (Transport Layer Security) ***/
/* 1201: require safe negotiation
 * Blocks connections (SSL_ERROR_UNSAFE_NEGOTIATION) to servers that don't support RFC 5746 [2]
 * as they're potentially vulnerable to a MiTM attack [3]. A server without RFC 5746 can be
 * safe from the attack if it disables renegotiations but the problem is that the browser can't
 * know that. Setting this pref to true is the only way for the browser to ensure there will be
 * no unsafe renegotiations on the channel between the browser and the server.
 * [STATS] SSL Labs (July 2021) reports over 99% of sites have secure renegotiation [4]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://tools.ietf.org/html/rfc5746
 * [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
 * [4] https://www.ssllabs.com/ssl-pulse/ ***/
user_pref("security.ssl.require_safe_negotiation", true);
/* 1203: reset TLS 1.0 and 1.1 downgrades i.e. session only ***/
user_pref("security.tls.version.enable-deprecated", false); // [DEFAULT: false]
/* 1206: disable TLS1.3 0-RTT (round-trip time) [FF51+]
 * [1] https://github.com/tlswg/tls13-spec/issues/1001
 * [2] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/ ***/
user_pref("security.tls.enable_0rtt_data", false);

/** OCSP (Online Certificate Status Protocol)
   [1] https://scotthelme.co.uk/revocation-is-broken/
   [2] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
***/
/* 1211: control when to use OCSP fetching (to confirm current validity of certificates)
 * 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
 * OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority)
 * It's a trade-off between security (checking) and privacy (leaking info to the CA)
 * [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
 * [1] https://en.wikipedia.org/wiki/Ocsp ***/
user_pref("security.OCSP.enabled", 1);
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
 * 0 = allow all
 * 1 = block all
 * 3 = only allow locally-added roots (e.g. anti-virus) (default)
 * 4 = only allow locally-added roots or for certs in 2015 and earlier
 * [SETUP-CHROME] If you have problems, update your software: SHA-1 is obsolete
 * [1] https://blog.mozilla.org/security/2016/10/18/phasing-out-sha-1-on-the-public-web/ ***/
user_pref("security.pki.sha1_enforcement_level", 1);
/* 1221: disable Windows 8.1's Microsoft Family Safety cert [FF50+] [WINDOWS]
 * 0=disable detecting Family Safety mode and importing the root
 * 1=only attempt to detect Family Safety mode (don't import the root)
 * 2=detect Family Safety mode and import the root
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/21686 ***/
user_pref("security.family_safety.mode", 0);
/* 1223: enable strict pinning
 * PKP (Public Key Pinning) 0=disabled 1=allow user MiTM (such as your antivirus), 2=strict
 * [SETUP-WEB] If you rely on an AV (antivirus) to protect your web browsing
 * by inspecting ALL your web traffic, then leave at current default=1
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16206 ***/
user_pref("security.cert_pinning.enforcement_level", 2);
/* 1224: enable CRLite [FF73+]
 * In FF84+ it covers valid certs and in mode 2 doesn't fall back to OCSP
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985
 * [2] https://blog.mozilla.org/security/tag/crlite/ ***/
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 2);

/** MIXED CONTENT ***/
/* 1241: disable insecure passive content (such as images) on https pages [SETUP-WEB] ***/
user_pref("security.mixed_content.block_display_content", true);
/* 1244: enable HTTPS-Only mode in all windows [FF76+]
 * When the top-level is HTTPS, insecure subresources are also upgraded (silent fail)
 * [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On (after "Continue to HTTP Site")
 * [SETTING] Privacy & Security>HTTPS-Only Mode (and manage exceptions)
 * [TEST] http://example.com [upgrade]
 * [TEST] http://neverssl.com/ [no upgrade] ***/
user_pref("dom.security.https_only_mode", true); // [FF76+]
user_pref("dom.security.https_only_mode_pbm", true); // [FF80+]
/* 1245: enable HTTPS-Only mode for local resources [FF77+] ***/
user_pref("dom.security.https_only_mode.upgrade_local", true);
/* 1246: disable HTTP background requests [FF82+]
 * When attempting to upgrade, if the server doesn't respond within 3 seconds,
 * Firefox sends HTTP requests in order to check if the server supports HTTPS or not
 * This is done to avoid waiting for a timeout which takes 90 seconds
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1642387,1660945 ***/
user_pref("dom.security.https_only_mode_send_http_background_request", false);

/** UI (User Interface) ***/
/* 1270: display warning on the padlock for "broken security" (if 1201 is false)
 * Bug: warning padlock not indicated for subresources on a secure page! [2]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://bugzilla.mozilla.org/1353705 ***/
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
/* 1273: display "Not Secure" text on HTTP sites ***/
user_pref("security.insecure_connection_text.enabled", true); // [FF60+]
/* 1280: display warnings when insecure HTTP connections are made ***/
user_pref("security.warn_entering_weak", true);
user_pref("security.warn_leaving_secure", true);
user_pref("security.warn_viewing_mixed", true);

/*** [SECTION 1400]: FONTS ***/
user_pref("_user.js.parrot", "1400 syntax error: the parrot's bereft of life!");
/* 1401: disable rendering of SVG OpenType fonts ***/
user_pref("gfx.font_rendering.opentype_svg.enabled", false);
/* 1402: limit font visibility (Windows, Mac, some Linux) [FF79+]
 * [NOTE] In FF80+ RFP ignores the pref and uses value 1
 * Uses hardcoded lists with two parts: kBaseFonts + kLangPackFonts [1], bundled fonts are auto-allowed
 * 1=only base system fonts, 2=also fonts from optional language packs, 3=also user-installed fonts
 * [1] https://searchfox.org/mozilla-central/search?path=StandardFonts*.inc ***/
user_pref("layout.css.font-visibility.level", 1);

/*** [SECTION 1600]: HEADERS / REFERERS
   Expect some breakage e.g. banks: use an extension if you need precise control
                  full URI: https://example.com:8888/foo/bar.html?id=1234
     scheme+host+port+path: https://example.com:8888/foo/bar.html
          scheme+host+port: https://example.com:8888
   [1] https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/
***/
user_pref("_user.js.parrot", "1600 syntax error: the parrot rests in peace!");
/* 1601: control when to send a cross-origin referer
 * 0=always (default), 1=only if base domains match, 2=only if hosts match
 * [SETUP-WEB] Known to cause issues with older modems/routers and some sites e.g vimeo, icloud, instagram ***/
user_pref("network.http.referer.XOriginPolicy", 2);
/* 1602: control the amount of cross-origin information to send [FF52+]
 * 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);
/* 1603: enable the DNT (Do Not Track) HTTP header
 * [NOTE] DNT is enforced with Enhanced Tracking Protection (2710)
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Send websites a "Do Not Track" signal... ***/
user_pref("privacy.donottrackheader.enabled", true);

/*** [SECTION 1700]: CONTAINERS
   Check out Temporary Containers [2], read the article [3], and visit the wiki/repo [4]
   [1] https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers
   [2] https://addons.mozilla.org/firefox/addon/temporary-containers/
   [3] https://medium.com/@stoically/enhance-your-privacy-in-firefox-with-temporary-containers-33925cd6cd21
   [4] https://github.com/stoically/temporary-containers/wiki
***/
user_pref("_user.js.parrot", "1700 syntax error: the parrot's bit the dust!");
/* 1701: enable Container Tabs and its UI setting [FF50+]
 * [SETTING] General>Tabs>Enable Container Tabs ***/
user_pref("privacy.userContext.enabled", true);
user_pref("privacy.userContext.ui.enabled", true);
/* 1702: set behaviour on "+ Tab" button to display container menu on left click [FF74+]
 * [NOTE] The menu is always shown on long press and right click
 * [SETTING] General>Tabs>Enable Container Tabs>Settings>Select a container for each new tab ***/
   // user_pref("privacy.userContext.newTabContainerOnLeftClick.enabled", true);

/*** [SECTION 2000]: PLUGINS / MEDIA / WEBRTC ***/
user_pref("_user.js.parrot", "2000 syntax error: the parrot's snuffed it!");
/* 2001: disable WebRTC (Web Real-Time Communication)
 * [SETUP-WEB] WebRTC can leak your IP address from behind your VPN, but if this is not
 * in your threat model, and you want Real-Time Communication, this is the pref for you
 * [1] https://www.privacytools.io/#webrtc ***/
user_pref("media.peerconnection.enabled", false);
/* 2002: limit WebRTC IP leaks if using WebRTC
 * In FF70+ these settings match Mode 4 (Mode 3 in older versions) [3]
 * [TEST] https://browserleaks.com/webrtc
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1189041,1297416,1452713
 * [2] https://wiki.mozilla.org/Media/WebRTC/Privacy
 * [3] https://tools.ietf.org/html/draft-ietf-rtcweb-ip-handling-12#section-5.2 ***/
user_pref("media.peerconnection.ice.default_address_only", true);
user_pref("media.peerconnection.ice.no_host", true); // [FF51+]
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true); // [FF70+]
/* 2020: disable GMP (Gecko Media Plugins)
 * [1] https://wiki.mozilla.org/GeckoMediaPlugins ***/
user_pref("media.gmp-provider.enabled", false);
/* 2021: disable widevine CDM (Content Decryption Module)
 * [NOTE] This is covered by the EME master switch (2022) ***/
user_pref("media.gmp-widevinecdm.enabled", false);
/* 2022: disable all DRM content (EME: Encryption Media Extension)
 * [SETUP-WEB] e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
 * [SETTING] General>DRM Content>Play DRM-controlled content
 * [TEST] https://bitmovin.com/demos/drm
 * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
user_pref("media.eme.enabled", false);
/* 2030: disable autoplay of HTML5 media [FF63+]
 * 0=Allow all, 1=Block non-muted media (default), 5=Block all
 * [NOTE] You can set exceptions under site permissions
 * [SETTING] Privacy & Security>Permissions>Autoplay>Settings>Default for all websites ***/
user_pref("media.autoplay.default", 5);
/* 2031: disable autoplay of HTML5 media if you interacted with the site [FF78+]
 * 0=sticky (default), 1=transient, 2=user
 * Firefox's Autoplay Policy Documentation [PDF] is linked below via SUMO
 * [NOTE] If you have trouble with some video sites, then add an exception (2030)
 * [1] https://support.mozilla.org/questions/1293231 ***/
user_pref("media.autoplay.blocking_policy", 2);

/*** [SECTION 2300]: WEB WORKERS
   A worker is a JS "background task" running in a global context, i.e. it is different from
   the current window. Workers can spawn new workers (must be the same origin & scheme),
   including service and shared workers. Shared workers can be utilized by multiple scripts and
   communicate between browsing contexts (windows/tabs/iframes) and can even control your cache.

   [1]    Web Workers: https://developer.mozilla.org/docs/Web/API/Web_Workers_API
   [2]         Worker: https://developer.mozilla.org/docs/Web/API/Worker
   [3] Service Worker: https://developer.mozilla.org/docs/Web/API/Service_Worker_API
   [4]   SharedWorker: https://developer.mozilla.org/docs/Web/API/SharedWorker
   [5]   ChromeWorker: https://developer.mozilla.org/docs/Web/API/ChromeWorker
   [6]  Notifications: https://support.mozilla.org/questions/1165867#answer-981820
***/
user_pref("_user.js.parrot", "2300 syntax error: the parrot's off the twig!");
/* 2302: disable service workers [FF32, FF44-compat]
 * Service workers essentially act as proxy servers that sit between web apps, and the
 * browser and network, are event driven, and can control the web page/site they are associated
 * with, intercepting and modifying navigation and resource requests, and caching resources.
 * [NOTE] Service workers require HTTPS, have no DOM access, and are not supported in PB mode [1]
 * [SETUP-WEB] Disabling service workers will break some sites. This pref is required true for
 * service worker notifications (2304), push notifications (disabled, 2305) and service worker
 * cache (2740). If you enable this pref, then check those settings as well
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1320796#c7 ***/
user_pref("dom.serviceWorkers.enabled", false);
/* 2304: disable Web Notifications
 * [NOTE] Web Notifications can also use service workers (2302) and are behind a prompt (7002)
 * [1] https://developer.mozilla.org/docs/Web/API/Notifications_API ***/
user_pref("dom.webnotifications.enabled", false); // [FF22+]
user_pref("dom.webnotifications.serviceworker.enabled", false); // [FF44+]
/* 2305: disable Push Notifications [FF44+]
 * Push is an API that allows websites to send you (subscribed) messages even when the site
 * isn't loaded, by pushing messages to your userAgentID through Mozilla's Push Server
 * [NOTE] Push requires service workers (2302) to subscribe to and display, and is behind
 * a prompt (7002). Disabling service workers alone doesn't stop Thunderbird polling the
 * Mozilla Push Server. To remove all subscriptions, reset your userAgentID.
 * [1] https://support.mozilla.org/kb/push-notifications-firefox
 * [2] https://developer.mozilla.org/docs/Web/API/Push_API ***/
user_pref("dom.push.enabled", false);
   // user_pref("dom.push.userAgentID", "");

/*** [SECTION 2400]: DOM (DOCUMENT OBJECT MODEL) ***/
user_pref("_user.js.parrot", "2400 syntax error: the parrot's kicked the bucket!");
/* 2401: disable "Confirm you want to leave" dialog on page close
 * Does not prevent JS leaks of the page close event
 * [1] https://developer.mozilla.org/docs/Web/Events/beforeunload ***/
user_pref("dom.disable_beforeunload", true);
/* 2402: prevent scripts from moving and resizing open windows ***/
user_pref("dom.disable_window_move_resize", true);
/* 2403: block popup windows
 * [SETTING] Privacy & Security>Permissions>Block pop-up windows ***/
user_pref("dom.disable_open_during_load", true);
/* 2404: limit events that can cause a popup [SETUP-WEB] ***/
user_pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");

/*** [SECTION 2500]: FINGERPRINTING ***/
user_pref("_user.js.parrot", "2500 syntax error: the parrot's shuffled off 'is mortal coil!");
/* 2501: enforce no system colors
 * [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors ***/
user_pref("browser.display.use_system_colors", false); // [DEFAULT: false]
/* 2502: enforce non-native widget theme
 * Security: removes/reduces system API calls, e.g. win32k API [1]
 * Fingerprinting: provides a uniform look and feel across platforms [2]
 * [1] https://bugzilla.mozilla.org/1381938
 * [2] https://bugzilla.mozilla.org/1411425 ***/
user_pref("widget.non-native-theme.enabled", true); // [DEFAULT: true FF89+]
/* 2503: open links targeting new windows in a new tab instead
 * Stops malicious window sizes and some screen resolution leaks.
 * You can still right-click a link and open in a new window
 * [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/9881 ***/
user_pref("browser.link.open_newwindow", 3); // 1=most recent window or tab 2=new window, 3=new tab
user_pref("browser.link.open_newwindow.restriction", 0);
/* 2504: disable WebGL (Web Graphics Library)
 * [SETUP-WEB] If you need it then enable it. RFP still randomizes canvas for naive scripts ***/
user_pref("webgl.disabled", true);

/*** [SECTION 2600]: MISCELLANEOUS ***/
user_pref("_user.js.parrot", "2600 syntax error: the parrot's run down the curtain!");
/* 2601: prevent accessibility services from accessing your browser [RESTART]
 * [SETTING] Privacy & Security>Permissions>Prevent accessibility services from accessing your browser (FF80 or lower)
 * [1] https://support.mozilla.org/kb/accessibility-services ***/
user_pref("accessibility.force_disabled", 1);
/* 2602: disable sending additional analytics to web servers
 * [1] https://developer.mozilla.org/docs/Web/API/Navigator/sendBeacon ***/
user_pref("beacon.enabled", false);
/* 2603: remove temp files opened with an external application
 * [1] https://bugzilla.mozilla.org/302433 ***/
user_pref("browser.helperApps.deleteTempFileOnExit", true);
/* 2604: disable page thumbnail collection ***/
user_pref("browser.pagethumbnails.capturing_disabled", true); // [HIDDEN PREF]
/* 2606: disable UITour backend so there is no chance that a remote page can use it ***/
user_pref("browser.uitour.enabled", false);
user_pref("browser.uitour.url", "");
/* 2607: disable various developer tools in browser context
 * [SETTING] Devtools>Advanced Settings>Enable browser chrome and add-on debugging toolboxes
 * [1] https://github.com/pyllyukko/user.js/issues/179#issuecomment-246468676 ***/
user_pref("devtools.chrome.enabled", false);
/* 2608: reset remote debugging to disabled
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16222 ***/
user_pref("devtools.debugger.remote-enabled", false); // [DEFAULT: false]
/* 2611: disable middle mouse click opening links from clipboard
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/10089 ***/
user_pref("middlemouse.contentLoadURL", false);
/* 2615: disable websites overriding Thunderbird's keyboard shortcuts [FF58+]
 * 0 (default) or 1=allow, 2=block ***/
user_pref("permissions.default.shortcuts", 2);
/* 2616: remove special permissions for certain mozilla domains [FF35+]
 * [1] resource://app/defaults/permissions ***/
user_pref("permissions.manager.defaultsUrl", "");
/* 2617: remove webchannel whitelist ***/
user_pref("webchannel.allowObject.urlWhitelist", "");
/* 2619: use Punycode in Internationalized Domain Names to eliminate possible spoofing
 * [SETUP-WEB] Might be undesirable for non-latin alphabet users since legitimate IDN's are also punycoded
 * [TEST] https://www.xn--80ak6aa92e.com/ (www.apple.com)
 * [1] https://wiki.mozilla.org/IDN_Display_Algorithm
 * [2] https://en.wikipedia.org/wiki/IDN_homograph_attack
 * [3] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=punycode+firefox
 * [4] https://www.xudongz.com/blog/2017/idn-phishing/ ***/
user_pref("network.IDN_show_punycode", true);
/* 2620: enforce PDFJS, disable PDFJS scripting [SETUP-CHROME]
 * This setting controls if the option "Display in Thunderbird" is available in the setting below
 *   and by effect controls whether PDFs are handled in-browser or externally ("Ask" or "Open With")
 * PROS: pdfjs is lightweight, open source, and more secure/vetted than most
 *   Exploits are rare (one serious case in seven years), treated seriously and patched quickly.
 *   It doesn't break "state separation" of browser content (by not sharing with OS, independent apps).
 *   It maintains disk avoidance and application data isolation. It's convenient. You can still save to disk.
 * CONS: You may prefer a different pdf reader for security reasons
 * CAVEAT: JS can still force a pdf to open in-browser by bundling its own code
 * [SETTING] General>Applications>Portable Document Format (PDF) ***/
user_pref("pdfjs.disabled", false); // [DEFAULT: false]
user_pref("pdfjs.enableScripting", false); // [FF86+]
/* 2621: disable links launching Windows Store on Windows 8/8.1/10 [WINDOWS] ***/
user_pref("network.protocol-handler.external.ms-windows-store", false);
/* 2623: disable permissions delegation [FF73+]
 * Currently applies to cross-origin geolocation, camera, mic and screen-sharing
 * permissions, and fullscreen requests. Disabling delegation means any prompts
 * for these will show/use their correct 3rd party origin
 * [1] https://groups.google.com/forum/#!topic/mozilla.dev.platform/BdFOMAuCGW8/discussion ***/
user_pref("permissions.delegation.enabled", false);

/*** [SECTION 2700]: PERSISTENT STORAGE
   Data SET by websites including
          cookies : profile\cookies.sqlite
     localStorage : profile\webappsstore.sqlite
        indexedDB : profile\storage\default
   serviceWorkers :

   [NOTE] indexedDB and serviceWorkers are not available in Private Browsing Mode
   [NOTE] Blocking cookies also blocks websites access to: localStorage (incl. sessionStorage),
   indexedDB, sharedWorker, and serviceWorker (and therefore service worker cache and notifications)
   If you set a site exception for cookies (either "Allow" or "Allow for Session") then they become
   accessible to websites except shared/service workers where the cookie setting must be "Allow"
***/
user_pref("_user.js.parrot", "2700 syntax error: the parrot's joined the bleedin' choir invisible!");
/* 2701: disable or isolate 3rd-party cookies and site-data [SETUP-WEB]
 * 0 = Accept cookies and site data
 * 1 = (Block) All third-party cookies
 * 2 = (Block) All cookies
 * 3 = (Block) Cookies from unvisited websites
 * 4 = (Block) Cross-site tracking cookies (default)
 * 5 = (Isolate All) Cross-site cookies (TCP: Total Cookie Protection / dFPI: dynamic FPI) [1] (FF86+)
 * Option 5 with FPI enabled (4001) is ignored and not shown, and option 4 used instead
 * [NOTE] You can set cookie exceptions under site permissions or use an extension
 * [NOTE] Enforcing category to custom ensures ETP related prefs are always honored
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Custom>Cookies
 * [1] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/ ***/
user_pref("network.cookie.cookieBehavior", 2);
user_pref("browser.contentblocking.category", "custom");
/* 2702: set third-party cookies (if enabled, see 2701) to session-only
 * [NOTE] .sessionOnly overrides .nonsecureSessionOnly except when .sessionOnly=false and
 * .nonsecureSessionOnly=true. This allows you to keep HTTPS cookies, but session-only HTTP ones
 * [1] https://feeding.cloud.geek.nz/posts/tweaking-cookies-for-privacy-in-firefox/ ***/
user_pref("network.cookie.thirdparty.sessionOnly", true);
user_pref("network.cookie.thirdparty.nonsecureSessionOnly", true); // [FF58+]
/* 2703: delete cookies and site data on close
 * 0=keep until they expire (default), 2=keep until you close Thunderbird
 * [NOTE] The setting below is disabled (but not changed) if you block all cookies (2701 = 2)
 * [SETTING] Privacy & Security>Cookies and Site Data>Delete cookies and site data when Thunderbird is closed ***/
user_pref("network.cookie.lifetimePolicy", 2);
/* 2710: enable Enhanced Tracking Protection (ETP) in all windows
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Custom>Tracking content
 * [SETTING] to add site exceptions: Urlbar>ETP Shield
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Enhanced Tracking Protection>Manage Exceptions ***/
user_pref("privacy.trackingprotection.enabled", true);
/* 2711: enable various ETP lists ***/
user_pref("privacy.trackingprotection.socialtracking.enabled", true);
user_pref("privacy.trackingprotection.cryptomining.enabled", true); // [DEFAULT: true]
user_pref("privacy.trackingprotection.fingerprinting.enabled", true); // [DEFAULT: true]
/* 2740: disable service worker cache and cache storage
 * [NOTE] We clear service worker cache on exit (2803)
 * [1] https://w3c.github.io/ServiceWorker/#privacy ***/
user_pref("dom.caches.enabled", false);
/* 2750: disable Storage API [FF51+]
 * The API gives sites the ability to find out how much space they can use, how much
 * they are already using, and even control whether or not they need to be alerted
 * before the user agent disposes of site data in order to make room for other things.
 * [1] https://developer.mozilla.org/docs/Web/API/StorageManager
 * [2] https://developer.mozilla.org/docs/Web/API/Storage_API
 * [3] https://blog.mozilla.org/l10n/2017/03/07/firefox-l10n-report-aurora-54/ ***/
user_pref("dom.storageManager.enabled", false);
/* 2755: disable Storage Access API [FF65+]
 * [1] https://developer.mozilla.org/docs/Web/API/Storage_Access_API ***/
user_pref("dom.storage_access.enabled", false);
/* 2760: enable Local Storage Next Generation (LSNG) [FF65+] ***/
user_pref("dom.storage.next_gen", true); // [DEFAULT: true FF92+]

/*** [SECTION 2800]: SHUTDOWN
   * Sanitizing on shutdown is all or nothing. It does not use Managed Exceptions under
     Privacy & Security>Delete cookies and site data when Thunderbird is closed (1681701)
   * If you want to keep some sites' cookies (exception as "Allow") and optionally other site
     data but clear all the rest on close, then you need to set the "cookie" and optionally the
     "offlineApps" prefs below to false, and to set the cookie lifetime pref to 2 (2703)
***/
user_pref("_user.js.parrot", "2800 syntax error: the parrot's bleedin' demised!");
/* 2802: enable Thunderbird to clear items on shutdown (2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Thunderbird closes ***/
user_pref("privacy.sanitize.sanitizeOnShutdown", true);
/* 2803: set what items to clear on shutdown (if 2802 is true) [SETUP-CHROME]
 * [NOTE] If "history" is true, downloads will also be cleared
 * [NOTE] Active Logins: does not refer to logins via cookies, but rather HTTP Basic Authentication [1]
 * [NOTE] Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Thunderbird closes>Settings
 * [1] https://en.wikipedia.org/wiki/Basic_access_authentication ***/
user_pref("privacy.clearOnShutdown.cache", true);
user_pref("privacy.clearOnShutdown.cookies", true);
user_pref("privacy.clearOnShutdown.downloads", true); // see note above
user_pref("privacy.clearOnShutdown.formdata", true); // Form & Search History
user_pref("privacy.clearOnShutdown.history", true); // Browsing & Download History
user_pref("privacy.clearOnShutdown.offlineApps", true); // Offline Website Data
user_pref("privacy.clearOnShutdown.sessions", true); // Active Logins
user_pref("privacy.clearOnShutdown.siteSettings", false); // Site Preferences
/* 2804: reset default items to clear with Ctrl-Shift-Del (to match 2803) [SETUP-CHROME]
 * This dialog can also be accessed from the menu History>Clear Recent History
 * Thunderbird remembers your last choices. This will reset them when you start Thunderbird
 * [NOTE] Regardless of what you set "downloads" to, as soon as the dialog
 * for "Clear Recent History" is opened, it is synced to the same as "history" ***/
user_pref("privacy.cpd.cache", true);
user_pref("privacy.cpd.cookies", true);
   // user_pref("privacy.cpd.downloads", true); // not used, see note above
user_pref("privacy.cpd.formdata", true); // Form & Search History
user_pref("privacy.cpd.history", true); // Browsing & Download History
user_pref("privacy.cpd.offlineApps", true); // Offline Website Data
user_pref("privacy.cpd.passwords", false); // this is not listed
user_pref("privacy.cpd.sessions", true); // Active Logins
user_pref("privacy.cpd.siteSettings", false); // Site Preferences
/* 2805: clear Session Restore data when sanitizing on shutdown or manually [FF34+]
 * [NOTE] Not needed if Session Restore is not used (0102) or is already cleared with history (2803)
 * [NOTE] privacy.clearOnShutdown.openWindows prevents resuming from crashes (also see 5008)
 * [NOTE] privacy.cpd.openWindows has a bug that causes an additional window to open ***/
   // user_pref("privacy.clearOnShutdown.openWindows", true);
   // user_pref("privacy.cpd.openWindows", true);
/* 2806: reset default "Time range to clear" for "Clear Recent History" (2804)
 * Thunderbird remembers your last choice. This will reset the value when you start Thunderbird
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
 * [NOTE] Values 5 (last 5 minutes) and 6 (last 24 hours) are not listed in the dropdown,
 * which will display a blank value, and are not guaranteed to work ***/
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
 ** 1542309 - isolate top-level domain URLs when host is in the public suffix list (FF68+)
 ** 1506693 - isolate pdfjs range-based requests (FF68+)
 ** 1330467 - isolate site permissions (FF69+)
 ** 1534339 - isolate IPv6 (FF73+)
***/
user_pref("_user.js.parrot", "4000 syntax error: the parrot's pegged out");
/* 4001: enable First Party Isolation [FF51+]
 * [SETUP-WEB] May break cross-domain logins and site functionality until perfected
 * [1] https://bugzilla.mozilla.org/1260931 ***/
user_pref("privacy.firstparty.isolate", true);
/* 4002: enforce FPI restriction for window.opener [FF54+]
 * [NOTE] Setting this to false may reduce the breakage in 4001
 * [NOTE] Unlike arkenfox/user.js, we explicitly set them
 * FF65+ blocks postMessage with targetOrigin "*" if originAttributes don't match. But
 * to reduce breakage it ignores the 1st-party domain (FPD) originAttribute. (see [2],[3])
 * The 2nd pref removes that limitation and will only allow communication if FPDs also match.
 * [1] https://bugzilla.mozilla.org/1319773#c22
 * [2] https://bugzilla.mozilla.org/1492607
 * [3] https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage ***/
user_pref("privacy.firstparty.isolate.restrict_opener_access", true); // [DEFAULT: true]
user_pref("privacy.firstparty.isolate.block_post_message", true); // [HIDDEN PREF ESR]

/*** [SECTION 4500]: RFP (RESIST FINGERPRINTING)
   This master switch will be used for a wide range of items, many of which will
   **override** existing prefs from FF55+, often providing a **better** solution

   IMPORTANT: As existing prefs become redundant, and some of them WILL interfere
   with how RFP works, they will be moved to section 4600 and made inactive

 ** 418986 - limit window.screen & CSS media queries leaking identifiable info (FF41+)
      [NOTE] Info only: To set a size, open a XUL (chrome) page (such as about:config) which is at
      100% zoom, hit Shift+F4 to open the scratchpad, type window.resizeTo(1366,768), hit Ctrl+R to run.
      Test your window size, do some math, resize to allow for all the non inner window elements
      [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
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
 ** 1333651 & 1383495 & 1396468 - spoof User Agent & Navigator API (see section 4700) (FF56+)
      FF56: Version: rounded down to the nearest multiple of 10
      FF57: Version: match current ESR (1393283, 1418672, 1418162, 1511763)
      FF59: OS: Windows, OSX, Android, or Linux (to reduce breakage) (1404608)
      FF66: OS: HTTP Headers reduced to Windows or Android (1509829)
      FF68: OS: updated to Windows 10, OS 10.14, and Android 8.1 (1511434)
      FF78: OS: updated to OS 10.15 and Android 9.0 (1635011)
 ** 1369319 - disable device sensor API (see 4604) (FF56+)
 ** 1369357 - disable site specific zoom (see 4605) (FF56+)
 ** 1337161 - hide gamepads from content (see 4606) (FF56+)
 ** 1372072 - spoof network information API as "unknown" when dom.netinfo.enabled = true (see 4607) (FF56+)
 ** 1333641 - reduce fingerprinting in WebSpeech API (see 4608) (FF56+)
 ** 1372069 & 1403813 & 1441295 - block geolocation requests (same as denying a site permission) (see 0201 ** 1372069 & 1403813 & 1441295 - block geolocation requests (same as denying a site permission) (see 0201, 0202) (FF56-62)
 ** 1369309 - spoof media statistics (see 4610) (FF57+)
 ** 1382499 - reduce screen co-ordinate fingerprinting in Touch API (see 4611) (FF57+)
 ** 1217290 & 1409677 - enable fingerprinting resistance for WebGL (see 2010-12) (FF57+)
 ** 1382545 - reduce fingerprinting in Animation API (FF57+)
 ** 1354633 - limit MediaError.message to a whitelist (FF57+)
 ** 1382533 - enable fingerprinting resistance for Presentation API (FF57+)
      This blocks exposure of local IP Addresses via mDNS (Multicast DNS)
 **  967895 - spoof canvas and enable site permission prompt before allowing canvas data extraction (FF58+)
      FF59: Added to site permissions panel (1413780) Only prompt when triggered by user input (1376865)
 ** 1372073 - spoof/block fingerprinting in MediaDevices API (FF59+)
      Spoof: enumerate devices reports one "Internal Camera" and one "Internal Microphone" if
             media.navigator.enabled is true (see 2505 which we chose to keep disabled)
      Block: suppresses the ondevicechange event (see 4612)
 ** 1039069 - warn when language prefs are set to non en-US (see 0210, 0211) (FF59+)
 ** 1222285 & 1433592 - spoof keyboard events and suppress keyboard modifier events (FF59+)
      Spoofing mimics the content language of the document. Currently it only supports en-US.
      Modifier events suppressed are SHIFT and both ALT keys. Chrome is not affected.
      FF60: Fix keydown/keyup events (1438795)
 ** 1337157 - disable WebGL debug renderer info (see 4613) (FF60+)
 ** 1459089 - disable OS locale in HTTP Accept-Language headers (ANDROID) (FF62+)
 ** 1479239 - return "no-preference" with prefers-reduced-motion (see 4617) (FF63+)
 ** 1363508 - spoof/suppress Pointer Events (see 4614) (FF64+)
      FF65: pointerEvent.pointerid (1492766)
 ** 1485266 - disable exposure of system colors to CSS or canvas (see 4615) (FF67+)
 ** 1407366 - enable inner window letterboxing (see 4504) (FF67+)
 ** 1494034 - return "light" with prefers-color-scheme (see 4616) (FF67+)
      [1] https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 ** 1564422 - spoof audioContext outputLatency (FF70+)
 ** 1595823 - spoof audioContext sampleRate (FF72+)
 ** 1607316 - spoof pointer as coarse and hover as none (ANDROID) (FF74+)
 ** 1621433 - randomize canvas (previously FF58+ returned an all-white canvas) (FF78+)
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
/* 4520: disable chrome animations [FF77+] [RESTART]
 * [NOTE] pref added in FF63, but applied to chrome in FF77. RFP spoofs this for web content ***/
user_pref("ui.prefersReducedMotion", 1); // [HIDDEN PREF]

/*** [SECTION 4600]: RFP ALTERNATIVES
   * non-RFP users:
       Enable the whole section (see the SETUP tag below)
   * RFP users:
       Make sure these are reset in about:config. They are redundant. In fact, some
       even cause RFP to not behave as you would expect and alter your fingerprint
   * ESR RFP users:
       Reset those *up to and including* your version. Add those *after* your version
       as active prefs in your overrides. This is assuming that the patch wasn't also
       backported to Firefox ESR. Backporting RFP patches to ESR is rare.
***/
user_pref("_user.js.parrot", "4600 syntax error: the parrot's crossed the Jordan");
/* [SETUP-non-RFP] Non-RFP users replace the * with a slash on this line to enable these
// FF55+
// 4601: [2514] spoof (or limit?) number of CPU cores [FF48+]
   // [NOTE] *may* affect core chrome/Firefox performance, will affect content.
   // [1] https://bugzilla.mozilla.org/1008453
   // [2] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/21675
   // [3] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/22127
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
   // [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/15758
   // [2] https://blog.lukaszolejnik.com/stealing-sensitive-browser-data-with-the-w3c-ambient-light-sensor-api/
   // [3] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1357733,1292751
   // user_pref("device.sensors.enabled", false);
// 4606: [2501] disable gamepad API - USB device ID enumeration
   // Optional protection depending on your connected devices
   // [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/13023
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
   // [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/15757
   // [2] https://bugzilla.mozilla.org/654550
user_pref("media.video_stats.enabled", false);
// 4611: [2509] disable touch events
   // fingerprinting attack vector - leaks screen res & actual screen coordinates
   // 0=disabled, 1=enabled, 2=autodetect
   // Optional protection depending on your device
   // [1] https://developer.mozilla.org/docs/Web/API/Touch_events
   // [2] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/10286
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
   // [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=232227,133087
user_pref("ui.use_standins_for_native_colors", true);
// 4616: enforce prefers-color-scheme as light [FF67+]
   // 0=light, 1=dark : This overrides your OS value
user_pref("ui.systemUsesDarkTheme", 0); // [HIDDEN PREF]
// 4617: enforce prefers-reduced-motion as no-preference [FF63+] [RESTART]
   // 0=no-preference, 1=reduce
user_pref("ui.prefersReducedMotion", 0); // [HIDDEN PREF]
// * * * /
// FF41+
// 4620: mitigate fingerprinting via canvas
  // [NOTE] This setting has been removed from gHacks v67 (see [1]) but is still enabled by default.
  // [1] https://github.com/arkenfox/user.js/commit/8b07fd57d0f8a31dab25661d51235fe1b0c6360c
user_pref("canvas.capturestream.enabled", false);
// * * * /
// ***/

/*** [SECTION 4700]: RFP ALTERNATIVES (NAVIGATOR / USER AGENT (UA) SPOOFING)
     This is FYI ONLY. These prefs are INSUFFICIENT(a) on their own, you need
     to use RFP (4500) or an extension, in which case they become POINTLESS.
     (a) Many of the components that make up your UA can be derived by other means.
         And when those values differ, you provide more bits and raise entropy.
         Examples of leaks include workers, navigator objects, date locale/formats,
         iframes, headers, tcp/ip attributes, feature detection, and **many** more.
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

/*** [SECTION 9000]: PERSONAL
     Non-project related but useful. If any of these interest you, add them to your overrides ***/
user_pref("_user.js.parrot", "9000 syntax error: this is an ex-parrot!");
/* WELCOME & WHAT's NEW NOTICES ***/
   //user_pref("mailnews.start_page_override.mstone", "ignore"); // master switch
/* WARNINGS ***/
   // user_pref("full-screen-api.warning.delay", 0);
   // user_pref("full-screen-api.warning.timeout", 0);
/* APPEARANCE ***/
   // user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // [FF68+] allow userChrome/userContent
/* CONTENT BEHAVIOR ***/
   // user_pref("accessibility.typeaheadfind", true); // enable "Find As You Type"
   // user_pref("clipboard.autocopy", false); // disable autocopy default [LINUX]
/* RETURN RECEIPT BEHAVIOR ***/
   // user_pref("mail.mdn.report.enabled", false); // disable return receipt sending unconditionally
/* UX BEHAVIOR ***/
   // user_pref("general.autoScroll", false); // middle-click enabling auto-scrolling [DEFAULT: false on Linux]
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

/*** [SECTION 9100]: THUNDERBIRD (AUTO CONFIG / UI / HEADERS / ADDRESS BOOK)
   Options general to Thunderbird's mail configuration and user interface

   [1] https://searchfox.org/comm-esr91/source/
   [2] http://kb.mozillazine.org/Mail_and_news_settings
***/
user_pref("_user.js.parrot", "9100 syntax error: this parrot is blind!");

/** AUTO CONFIG ***/
/* 9101: Disable auto-configuration [SETUP-INSTALL]
 * These options disable auto-configuration of mail servers in Thunderbird.
 * Such settings require a query to Mozilla which could have privacy implications
 * if the user wishes to keep the existence of the mail provider private.
 * [1] https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Autoconfiguration ***/
user_pref("mailnews.auto_config.guess.enabled", false);
user_pref("mailnews.auto_config.fetchFromISP.enabled", false);
user_pref("mailnews.auto_config.fetchFromISP.sendEmailAddress", false);
user_pref("mailnews.auto_config.fetchFromExchange.enabled", false);
user_pref("mailnews.auto_config_url", "");
user_pref("mailnews.auto_config.addons_url","");
/* 9102: Disable account provisioning [SETUP-INSTALL]
 * This option allows users to create a new email account through partner providers.
 * [1] https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Account_Provisioner ***/
user_pref("mail.provider.enabled", false);

/** UI (User Interface) ***/
/* 9110: Hide tab bar
 * false=Hides the tab bar if there is only one tab. (default) ***/
user_pref("mail.tabs.autoHide", true);
/* 9111: Show full email instead of just name from address book
 * true=Show just the display name for people in the address book (default)
 * false=Show both the email address and display name. ***/
user_pref("mail.showCondensedAddresses", false);
/* 9112: Disable "Filelink for Large Attachments" feature
 * [1] https://support.thunderbird.net/kb/filelink-large-attachments ***/
user_pref("mail.cloud_files.enabled", false);
user_pref("mail.cloud_files.inserted_urls.footer.link", "");
/* 9113: Don't hide cookies and passwords related (advanced?) buttons ***/
user_pref("pref.privacy.disable_button.view_cookies", false);
user_pref("pref.privacy.disable_button.cookie_exceptions", false);
user_pref("pref.privacy.disable_button.view_passwords", false);

/** HEADERS ***/
/* 9120:
 * true=Show Sender header in message pane.
 * false=Does nothing. (default) ***/
user_pref("mailnews.headers.showSender", true);
/* 9121:
 * true=Show User Agent header in message pane
 * false=Does nothing. (default) ***/
user_pref("mailnews.headers.showUserAgent", false);
/* 9122: Hello argument
 * Lets you replace your IP address with the specified string in Received: headers when your
 * IP address is not a "fully qualified domain name" (FQDN). Typically you only need to do this
 * when you have a NAT box to prevent it from using the NAT boxes IP address.
 * If you don't set it to something in your SMTP server's domain it may increase your spam
 * score. ***/
user_pref("mail.smtpserver.default.hello_argument", "[127.0.0.1]");
/* 9123: Displayed dates and times
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
/* 9124: Display the sender's Timezone when set to true ***/
user_pref("mailnews.display.date_senders_timezone", false);
/* 9125: Display Time Date based on Received Header
 * Thunderbird shows the time when the message was sent, according to the sender. It is possible
 * to make Thunderbird show the time when the message arrived on your mail server, based on the
 * "Received" header. Set the following preference. New messages will show the time the message
 * was received, rather than when it was sent. ***/
   // user_pref("mailnews.use_received_date", true);

/** ADDRESS BOOK ***/
/* 9130: Address book collection [SETUP-FEATURE]
 * Disable Thunderbird internal address book email collection
 * Consider using CardBook extension instead (https://addons.thunderbird.net/addon/cardbook/)
 * [SETTING] Preferences>Composition>Addressing>Automatically add outgoing e-mail addresses...
 * [SETTING][CARDBOOK] CardBook>Preferences>Email>Collect Outgoing Email ***/
user_pref("mail.collect_addressbook", "");  // [DEFAULT: "jsaddrbook://history.sqlite"]
user_pref("mail.collect_email_address_outgoing", false);
/* 9131: Only use email addresses, without their Display Names [CARDBOOK] [SETUP-FEATURE]
 * By default, CardBook extension incorporates contacts display names in addresses fields.
 * This could leak sensitive information to all recipients.
 * [SETTING][CARDBOOK] CardBook>Preferences>Email>Sending Emails>Only use email addresses... ***/
user_pref("extensions.cardbook.useOnlyEmail", true);

/*** [SECTION 9200]: EMAIL COMPOSITION (ENCODING / FORMAT / VIEW)
   Options that relate to composition, formatting and viewing email
***/
user_pref("_user.js.parrot", "9200 syntax error: this parrot has got no mail!");

/** ENCODING ***/
/* 9201: Prevent fallback encoding to windows-1252, prefer 7bit or 8bit UTF-8
 * [1] http://forums.mozillazine.org/viewtopic.php?f=28&t=267341
 * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=214729
 * [3] https://stackoverflow.com/a/28531705 ***/
user_pref("intl.fallbackCharsetList.ISO-8859-1", "UTF-8");
/* 9202: Set encoding of incoming mail
 * [SETTING] Display > Advanced > Fonts & Encodings > Incoming Mail ***/
user_pref("mailnews.view_default_charset", "UTF-8");
/* 9203: Set encoding of outgoing mail
 * [SETTING] Display > Advanced > Fonts & Encodings > Outgoing Mail ***/
user_pref("mailnews.send_default_charset", "UTF-8");
/* 9204: Forces encoding in reply to be the default charset
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=234958#c2 ***/
user_pref("mailnews.reply_in_default_charset", true);
/* 9205: Avoid information leakage in reply header
 * Reply header may contain sensitive information about system locale (date and/or language)
 * 0=no header
 * 1="<author> wrote:" (see `reply_header_authorwrotesingle` below)
 * 2="On <date> <author> wrote:" (see `reply_header_ondateauthorwrote` below [DEFAULT])
 * 3="<author> wrote On <date>:" (see `reply_header_authorwroteondate` below`)
 * 4=user specified (you may use below tokens to forge your own format [DISCOURAGED]) ***/
user_pref("mailnews.reply_header_type", 1);
user_pref("mailnews.reply_header_authorwrotesingle", "#1 wrote:");
   // user_pref("mailnews.reply_header_ondateauthorwrote", "On #2 #3, #1 wrote:");
   // user_pref("mailnews.reply_header_authorwroteondate", "#1 wrote on #2 #3:");

/** COMPOSITION ***/
/* 9210: Check spelling before sending [SETUP-FEATURE]
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=667133 ***/
user_pref("mail.SpellCheckBeforeSend", false);
/* 9211: Behavior when sending HTML message [SETUP-FEATURE]
 * (0=Ask, 1=Send as plain text, 2=Send as HTML anyway,
 * 3=Include both plain text and HTML message bodies in message)
 * Email that is HTML should also have plaintext multipart for plain text users.
 * [1] https://drewdevault.com/2016/04/11/Please-use-text-plain-for-emails.html
 * [SETTING] Edit > Preferences > Send Options > Send the message in both plain text and HTML ***/
user_pref("mail.default_html_action", 1);
/* 9212: Send email in plaintext unless expressly overridden.
 * [SETUP-FEATURE] Sometimes HTML is useful especially when used with Markdown Here
 * [NOTE] Holding down shift when you click on "Write" will bypass
 * [1] http://kb.mozillazine.org/Plain_text_e-mail_%28Thunderbird%29
 * [2] https://support.mozilla.org/en-US/questions/1004181
 * [3] https://markdown-here.com ***/
user_pref("mail.html_compose", false);
user_pref("mail.identity.default.compose_html", false);
/* 9213: Downgrade email to plaintext by default
 * [SETUP-FEATURE] Only use HTML email if you need it, see above
 * [SETTING] Edit > Preferences > Composition > Send Options > Send messages as plain-text if possible ***/
user_pref("mailnews.sendformat.auto_downgrade", false);
/* 9214: What classes can process incoming data.
 * (0=All classes (default), 1=Don't display HTML, 2=Don't display HTML and inline images,
 * 3=Don't display HTML, inline images and some other uncommon types, 100=Use a hard coded list)
 * In the past this has mitigated a vulnerability CVE-2008-0304 (rare)
 * [1] https://www.mozilla.org/en-US/security/advisories/mfsa2008-12/
 * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=677905 ***/
user_pref("mailnews.display.disallow_mime_handlers", 3);
/* 9215: How to display HTML parts of a message body
 * (0=Display the HTML normally (default), 1=Convert it to text and then back again
 * 2=Display the HTML source, 3=Sanitize the HTML, 4=Display all body parts)
 * (in trunk builds later than 2011-07-23)
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=602718
 * [2] https://hg.mozilla.org/comm-central/rev/c1ef44a22eb2
 * [3] https://www.bucksch.org/1/projects/mozilla/108153/ ***/
user_pref("mailnews.display.html_as", 3);
/* 9216: Prefer to view as plaintext or html [SETUP-FEATURE]
 * true=Display a message as plain text when there is both a HTML and a plain
 * text version of a message body
 * false=Display a message as HTML when there is both a HTML and a plain text
 * version of a message body. (default) ***/
user_pref("mailnews.display.prefer_plaintext", false);
/* 9217: Inline attachments [SETUP-FEATURE]
 * true=Show inlinable attachments (text, images, messages) after the message.
 * false=Do not display any attachments with the message ***/
user_pref("mail.inline_attachments", false);
/* 9218: Big attachment warning
 * [1] https://support.mozilla.org/en-US/questions/1081046
 * [2] http://forums.mozillazine.org/viewtopic.php?f=39&t=2949521 */
user_pref("mail.compose.big_attachments.notify", true); // [DEFAULT: true]
/* 9219: Set big attachment size to warn at */
   // user_pref("mailnews.message_warning_size", 20971520); // [DEFAULT: 20971520]

/** VIEW ***/
/* 9230: Disable JavaScript
 * [NOTE] JavaScript is already disabled in message content.
 * [1] https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Releases/3
 * [2] https://stackoverflow.com/questions/3054315/is-javascript-supported-in-an-email-message
 * ***/
user_pref("javascript.enabled", false);
/* 9231: Disable media source extensions
 * [1] https://www.ghacks.net/2014/05/10/enable-media-source-extensions-firefox ***/
user_pref("media.mediasource.enabled", false);
/* 9232: Disable hardware decoding support ***/
user_pref("media.hardware-video-decoding.enabled", false);
/* 9233: Default image permissions
 * 1=Allow all images to load, regardless of origin. (Default),
 * 2=Block all images from loading.
 * 3=Prevent third-party images from loading
 * [1] http://kb.mozillazine.org/Permissions.default.image ***/
user_pref("permissions.default.image", 2);

/*** [SECTION 9300]: OTHER THUNDERBIRD COMPONENTS (CHAT / CALENDAR / RSS)
   Options that relate to other Thunderbird components such as the chat client, calendar and RSS)
***/
user_pref("_user.js.parrot", "9300 syntax error: this parrot is not tweeting!");

/** CHAT ***/
/* 9301: Disable chat functionality [SETUP-FEATURE] ***/
user_pref("mail.chat.enabled", false);
/* 9302: Disable logging of group chats ***/
user_pref("purple.logging.log_chats", false);
/* 9303: Disable logging of 1 to 1 conversations ***/
user_pref("purple.logging.log_ims", false);
/* 9304: Disable logging of system messages ***/
user_pref("purple.logging.log_system", false);
/* 9305: Disable typing notifications ***/
user_pref("purple.conversations.im.send_typing", false);
/* 9306: When chat is enabled, do not connect to accounts automatically
 * 0=Do not connect / show the account manager,
 * 1=Connect automatically. (Default) ***/
   // user_pref("messenger.startup.action", 0);
/* 9307: When chat is enabled, do not report idle status ***/
   // user_pref("messenger.status.reportIdle", false);

/** CALENDAR ***/
/* 9310: Disable calendar integration
 * [SETUP-FEATURE] Lightning calendar add-on is integrated in Thunderbird 38 and later.
 * Keeping this preference false allows us to properly show the opt-in/opt-out dialog
 * on new profiles fresh start, see [3].
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=401779
 * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1130854
 * [3] https://bugzilla.mozilla.org/show_bug.cgi?id=1130852 ***/
user_pref("mail.calendar-integration.opt-out", false);
/* 9311: Set user agent for calendar ***/
user_pref("calendar.useragent.extra", "");
/* 9312: Set calendar timezone to avoid system detection [SETUP-INSTALL]
 * By default, extensive system detection would be performed to find user's current timezone.
 * Setting this preference to "UTC" should disable it.
 * You may also directly set it to your timezone, i.e. "Pacific/Fakaofo"
 * [SETTING] Edit>Preferences>Calendar>Calendar>Timezone ***/
user_pref("calendar.timezone.local", "UTC");  // [DEFAULT: ""]

/** RSS ***/
/** These features don't actually do anything as they aren't implemented
 * [1] https://searchfox.org/comm-esr78/rev/384830b0570096c48770398060f87fbe556f6f01/mail/base/content/mailWindowOverlay.js#925
 * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=458606#c9
/* 9320: What classes can process incoming data.
 * (0=All classes (default), 1=Don't display HTML, 2=Don't display HTML and inline images,
 * 3=Don't display HTML, inline images and some other uncommon types, 100=Use a hard coded list)
 * [1] https://www.privacy-handbuch.de/handbuch_31j.htm
user_pref("rss.display.disallow_mime_handlers", 3);
/* 9321: How to display HTML parts of a message body
 * (0=Display the HTML normally (default), 1=Convert it to text and then back again
 * 2=Display the HTML source, 3=Sanitize the HTML, 4=Display all body parts)
 * (in trunk builds later than 2011-07-23)
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=602718
 * [2] https://hg.mozilla.org/comm-central/rev/c1ef44a22eb2
 * [3] https://www.bucksch.org/1/projects/mozilla/108153/
user_pref("rss.display.html_as", 1);
/* 9322: Prefer to view as plaintext or html
 * true=Display a message as plain text when there is both a HTML and a plain
 * text version of a message body
 * false=Display a message as HTML when there is both a HTML and a plain text
 * version of a message body. (default)
user_pref("rss.display.prefer_plaintext", true);
**/
/* 9323: Feed message display (summary or web page), on open.
 * Action on double click or enter in threadpane for a feed message.
 * 0=open content-base url in new window, 1=open summary in new window,
 * 2=toggle load summary and content-base url in message pane,
 * 3=load content-base url in browser
 * [1] http://forums.mozillazine.org/viewtopic.php?f=39&t=2502335 ***/
user_pref("rss.show.content-base", 3);
/* 9324: Feed message display (summary or web page), on select.
 * 0=global override, load web page, 1=global override, load summary,
 * 2=use default feed folder setting from Subscribe dialog; if no setting default to 1 ***/
user_pref("rss.show.summary", 1);
/* 9325: Feed message additional web page display.
 * 0=no action, 1=load web page in default browser, on select ***/
user_pref("rss.message.loadWebPageOnSelect", 0);

/*** [SECTION 9400]: THUNDERBIRD ENCRYPTION (ENIGMAIL / AUTOCRYPT / GNUPG)
   Options that relate to Enigmail addon and AutoCrypt.
   GnuPG (and RNP) specific options should also land there.
   [1] https://autocrypt.org
   [2] https://www.enigmail.net/index.php/en/user-manual/advanced-operations
   [3] https://wiki.mozilla.org/Thunderbird:OpenPGP
***/
user_pref("_user.js.parrot", "9400 syntax error: this parrot is talking in codes!");

/** ENIGMAIL ***/
/* These used to be inversed, however it seems upstream has changed this behavior
 * [1] https://www.privacy-handbuch.de/handbuch_31f.htm ***/
/* 9401: Silence the Enigmail version header ***/
user_pref("extensions.enigmail.addHeaders", false); // [DEFAULT: false]
/* 9402: Silence the Enigmail comment ***/
user_pref("extensions.enigmail.useDefaultComment", true); // [DEFAULT: true]
/* 9403: Silence the version ***/
user_pref("extensions.enigmail.agentAdditionalParam", "--no-emit-version --no-comments");
/* 9404: Specifies the hash algorithm used by GnuPG for its cryptographic operations:
 * 0=automatic selection, let GnuPG choose (default, recommended), 1=SHA1, 2=RIPEMD160
 * 3=SHA256, 4=SHA384, 5=SHA512
 * [NOTE] You should probably have a decent gpg.conf with things set. Examples
 * [1] https://github.com/Whonix/anon-gpg-tweaks/blob/master/etc/skel/.gnupg/gpg.conf
 * [2] https://github.com/ioerror/torbirdy/blob/master/gpg.conf
 * ***/
user_pref("extensions.enigmail.mimeHashAlgorithm", 5);
/* 9405: Protect subject line
 * 0=Leave subject unprotected,
 * 1=Show dialog with "Leave subject unprotected" (changes value to 0)
 *                     or "Protect subject" (changes value to 2,
 * 2=Protect subject***/
user_pref("extensions.enigmail.protectedHeaders", 2);
/* 9406: Text to use as replacement for the subject, following the Memory Hole
 * standard. If nothing is defined, then "Encrypted Message" is used.
 ***/
user_pref("extensions.enigmail.protectedSubjectText", "Encrypted Message"); // [DEFAULT: "Encrypted Message"]

/** AUTOCRYPT ***/
/* 9407: Choose whether to enable AutoCrypt
 * [1] https://autocrypt.org/level1.html
 * [2] https://redmine.tails.boum.org/code/issues/16186
 * [SETTING] Edit > Account Settings > OpenPGP Security > Autocrypt > Enable Autocrypt ***/
user_pref("mail.server.default.enableAutocrypt", false);
/* 9408: Prefer email encryption with known contacts
 * [SETTING] Edit > Account Settings > OpenPGP Security > Autocrypt >
 *           Prefer encrypted emails from the people you exchange email with
 *  [1] https://redmine.tails.boum.org/code/issues/15923 ***/
user_pref("mail.server.default.acPreferEncrypt", 0);

/** GNUPG ***/
/* 9409: Allow the use of external GnuPG
 * Whenever RNP fails to decrypt a message, Thunderbird will tray against system GnuPG
 * [1] https://wiki.mozilla.org/Thunderbird:OpenPGP:Smartcards#Allow_the_use_of_external_GnuPG ***/
user_pref("mail.openpgp.allow_external_gnupg", true);  // [HIDDEN PREF]

/*** [SECTION 9999]: DEPRECATED / REMOVED / LEGACY / RENAMED
     Documentation denoted as [-]. Items deprecated in FF68 or earlier have been archived at [1],
     which also provides a link-clickable, viewer-friendly version of the deprecated bugzilla tickets
     [1] https://github.com/ghacksuserjs/ghacks-user.js/issues/123
***/
user_pref("_user.js.parrot", "9999 syntax error: the parrot's deprecated!");
/* ESR68.x still uses all the following prefs
// [NOTE] replace the * with a slash in the line above to re-enable them
// FF69
// 1405: disable WOFF2 (Web Open Font Format) [FF35+]
   // [-] https://bugzilla.mozilla.org/1556991
   // user_pref("gfx.downloadable_fonts.woff2.enabled", false);
// 1802: enforce click-to-play for plugins
   // [-] https://bugzilla.mozilla.org/1519434
user_pref("plugins.click_to_play", true); // [DEFAULT: true FF25+]
// 2033: disable autoplay for muted videos [FF63+] - replaced by 'media.autoplay.default' options (2030)
   // [-] https://bugzilla.mozilla.org/1562331
   // user_pref("media.autoplay.allow-muted", false);
// * * * /
// FF71
// 2608: disable WebIDE and ADB extension download
   // [1] https://trac.torproject.org/projects/tor/ticket/16222
   // [-] https://bugzilla.mozilla.org/1539462
user_pref("devtools.webide.enabled", false); // [DEFAULT: false FF70+]
user_pref("devtools.webide.autoinstallADBExtension", false); // [FF64+]
// 2731: enforce websites to ask to store data for offline use
   // [1] https://support.mozilla.org/questions/1098540
   // [2] https://bugzilla.mozilla.org/959985
   // [-] https://bugzilla.mozilla.org/1574480
user_pref("offline-apps.allow_by_default", false);
// * * * /
// FF72
// 0105a: disable Activity Stream telemetry
   // [-] https://bugzilla.mozilla.org/1597697
user_pref("browser.newtabpage.activity-stream.telemetry.ping.endpoint", "");
// 0330: disable Hybdrid Content telemetry
   // [-] https://bugzilla.mozilla.org/1520491
user_pref("toolkit.telemetry.hybridContent.enabled", false); // [FF59+]
// 2720: enforce IndexedDB (IDB) as enabled
   // IDB is required for extensions and Firefox internals (even before FF63 in [1])
   // To control *website* IDB data, control allowing cookies and service workers, or use
   // Temporary Containers. To mitigate *website* IDB, FPI helps (4001), and/or sanitize
   // on close (Offline Website Data, see 2800) or on-demand (Ctrl-Shift-Del), or automatically
   // via an extension. Note that IDB currently cannot be sanitized by host.
   // [1] https://blog.mozilla.org/addons/2018/08/03/new-backend-for-storage-local-api/
   // [-] https://bugzilla.mozilla.org/1488583
user_pref("dom.indexedDB.enabled", true); // [DEFAULT: true]
// * * * /
// FF74
// 0203: use Mozilla geolocation service instead of Google when geolocation is enabled
   // Optionally enable logging to the console (defaults to false)
   // [-] https://bugzilla.mozilla.org/1613627
user_pref("geo.wifi.uri", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");
   // user_pref("geo.wifi.logging.enabled", true); // [HIDDEN PREF]
// 1704: set behaviour on "+ Tab" button to display container menu [FF53+] [SETUP-CHROME]
   // 0=no menu (default), 1=show when clicked, 2=show on long press
   // [1] https://bugzilla.mozilla.org/1328756
   // [-] https://bugzilla.mozilla.org/1606265
user_pref("privacy.userContext.longPressBehavior", 2);
// 2012: limit WebGL
   // [-] https://bugzilla.mozilla.org/1477756
user_pref("webgl.disable-extensions", true);
// * * * /
// FF76
// 0401: sanitize blocklist url
   // [2] https://trac.torproject.org/projects/tor/ticket/16931
   // [-] https://bugzilla.mozilla.org/1618188
user_pref("extensions.blocklist.url", "https://blocklists.settings.services.mozilla.com/v1/blocklist/3/%APP_ID%/%APP_VERSION%/");
// * * * /
// FF77
// 0850e: disable location bar one-off searches [FF51+]
   // [1] https://www.ghacks.net/2016/08/09/firefox-one-off-searches-address-bar/
   // [-] https://bugzilla.mozilla.org/1628926
   // user_pref("browser.urlbar.oneOffSearches", false);
// 2605: block web content in file processes [FF55+]
   // [SETUP-WEB] You may want to disable this for corporate or developer environments
   // [1] https://bugzilla.mozilla.org/1343184
   // [-] https://bugzilla.mozilla.org/1603007
user_pref("browser.tabs.remote.allowLinkedWebInFileUriProcess", false);
// * * * /
// FF78
// 2031: disable autoplay of HTML5 media if you interacted with the site [FF66+] - replaced by 'media.autoplay.blocking_policy'
   // [-] https://bugzilla.mozilla.org/1509933
user_pref("media.autoplay.enabled.user-gestures-needed", false);
// 5000's: disable chrome animations - replaced FF77+ by 'ui.prefersReducedMotion' (4520)
   // [-] https://bugzilla.mozilla.org/1640501
   // user_pref("toolkit.cosmeticAnimations.enabled", false); // [FF55+]
// * * * /
// ***/

/* END: internal custom pref to test for syntax errors ***/
user_pref("_user.js.parrot", "SUCCESS: No no he's not dead, he's, he's restin'!");
