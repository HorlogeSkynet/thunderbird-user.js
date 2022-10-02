/******
* name: thunderbird user.js
* date: 2 October 2022
* version: v102.1
* url: https://github.com/HorlogeSkynet/thunderbird-user.js
* license: MIT (https://github.com/HorlogeSkynet/thunderbird-user.js/blob/master/LICENSE)

* README:

  1. Consider using Tor if it meets your needs or fits your threat model
       * https://2019.www.torproject.org/about/torusers.html
  2. Read the entire wiki
       * https://github.com/HorlogeSkynet/thunderbird-user.js/wiki
  3. If you skipped step 2, return to step 2
  4. Make changes
       * There are often trade-offs and conflicts between security vs privacy vs anti-tracking
         and these need to be balanced against functionality & convenience & breakage
       * Some site breakage and unintended consequences will happen. Everyone's experience will differ
         e.g. some user data is erased on exit (section 2800), change this to suit your needs
       * While not 100% definitive, search for "[SETUP" tags
         e.g. wanna re-enable account auto configuration? check 9101 & 9102
  5. Some tag info
        [SETUP-INSTALL] if you experience any issue during Thunderbird setting up, read it
        [SETUP-FEATURE] if you miss some (expected) Thunderbird features, read it
       [SETUP-SECURITY] it's one item, read it
            [SETUP-WEB] can cause some websites to break
         [SETUP-CHROME] changes how Thunderbird itself behaves (i.e. not directly website related)

* RELEASES: https://github.com/HorlogeSkynet/thunderbird-user.js/releases
   * It is best to use the release that is optimized for and matches your Thunderbird version
   * ESR91 users
     - If you are not using thunderbird-user.js v91... (not a definitive list)
     - 9999: switch the appropriate deprecated section(s) back on

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
  2400: DOM (DOCUMENT OBJECT MODEL)
  2600: MISCELLANEOUS
  2700: PERSISTENT STORAGE & ETP (ENHANCED TRACKING PROTECTION)
  2800: SHUTDOWN & SANITIZING
  4000: FPI (FIRST PARTY ISOLATION)
  4500: RFP (RESIST FINGERPRINTING)
  5000: OPTIONAL OPSEC
  5500: OPTIONAL HARDENING
  6000: DON'T TOUCH
  7000: DON'T BOTHER
  8000: DON'T BOTHER: FINGERPRINTING
  9000: PERSONAL
  9100: THUNDERBIRD (AUTO CONFIG / UI / HEADERS / ADDRESS BOOK)
  9200: EMAIL COMPOSITION (ENCODING / FORMAT / VIEW)
  9300: OTHER THUNDERBIRD COMPONENTS (CHAT / CALENDAR / RSS)
  9400: THUNDERBIRD ENCRYPTION (OPENPGP / GNUPG)
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
 * [SETTING] General > System Integration > Always check to see if Thunderbird is the default... ***/
user_pref("mail.shell.checkDefaultClient", false);
/* 0102: set START page [SETUP-CHROME]
 * [SETTING] General > Thunderbird Start Page ***/
user_pref("mailnews.start_page.enabled", false);
/* 0104: set NEWTAB page
 * true=Activity Stream (default), false=blank page ***/
user_pref("browser.newtabpage.enabled", false);

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
user_pref("browser.region.update.enabled", false); // [FF79+]
/* 0204: set search region
 * [NOTE] May not be hidden if Thunderbird has changed your settings due to your region (0203) ***/
   // user_pref("browser.search.region", "US"); // [HIDDEN PREF]
/* 0210: set preferred language for displaying pages
 * [SETTING] General > Language & Appearance > Language > Choose the language used to display...
 * [TEST] https://addons.mozilla.org/about ***/
user_pref("intl.accept_languages", "en-US, en");
/* 0210b: Set dictionary to US ***/
user_pref("spellchecker.dictionary", "en-US");
/* 0211: use en-US locale regardless of the system or region locale
 * [SETUP-WEB] May break some input methods e.g xim/ibus for CJK languages [1]
 * [TEST] https://arkenfox.github.io/TZP/tests/formatting.html
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=867501,1629630 ***/
user_pref("javascript.use_us_english_locale", true); // [HIDDEN PREF]

/*** [SECTION 0300]: QUIETER BIRD ***/
user_pref("_user.js.parrot", "0300 syntax error: the parrot's not pinin' for the fjords!");
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
 * [SETTING] Privacy & Security > Thunderbird Data Collection and Use > Allow Thunderbird to send technical... ***/
user_pref("datareporting.healthreport.uploadEnabled", false);
/* 0332: disable telemetry
 * The "unified" pref affects the behavior of the "enabled" pref
 * - If "unified" is false then "enabled" controls the telemetry module
 * - If "unified" is true then "enabled" only controls whether to record extended data
 * [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
 * [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
 * [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
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
 * [SETTING] Privacy & Security > Thunderbird Data Collection and Use > Allow Thunderbird to send backlogged crash reports... ***/
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [DEFAULT: false]

/** OTHER ***/
/* 0360: disable Captive Portal detection
 * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy ***/
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false); // [FF52+]
/* 0361: disable Network Connectivity checks [FF65+]
 * [1] https://bugzilla.mozilla.org/1460537 ***/
user_pref("network.connectivity-service.enabled", false);
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
 * [1] https://searchfox.org/comm-esr102/source/mail/base/content/specialTabs.js#1266 ***/
user_pref("mail.rights.override", true);  // [DEFAULT: unset]
   // user_pref("mail.rights.version", 1)  // [DEFAULT: unset]
/* 0372: allow Thunderbird usage without any configured email account [SETUP-INSTALL]
 * [NOTE] Only enable this if you don't plan to use emails at all and want to hide the account setup ***/
   // user_pref("app.use_without_mail_account", true);
/* 0380: disable the new/unread message count badge on taskbar icon
 * [1] https://www.thunderbird.net/en-US/thunderbird/91.0.2/releasenotes/#whatsnew */
  // user_pref("mail.biff.show_badge", false); // [WINDOWS]
/* 0381: show the number of "new" messages on taskbar icon (not the number of unread ones) ***/
  // user_pref("mail.biff.use_new_count_in_badge", true);
/* 0390: disable new email alerts
 * [SETTING] General > Incoming Mails > When new messages arrive > Show an alert ***/
   // user_pref("mail.biff.show_alert", false);
/* 0391: control the kind of information disclosed in new email alerts
 * These preferences MAY be appreciated in environments with inquisitive eyes wandering behind your screen.
 * [SETTING] General > Incoming Mails > When new messages arrive > Show an alert > Customize... ***/
   // user_pref("mail.biff.alert.show_preview", false);
   // user_pref("mail.biff.alert.show_subject", false);
   // user_pref("mail.biff.alert.show_sender", false);
   // user_pref("mail.biff.alert.preview_length", 40);  // [HIDDEN PREF]

/*** [SECTION 0400]: SAFE BROWSING (SB)
   SB has taken many steps to preserve privacy. If required, a full url is never sent
   to Google, only a part-hash of the prefix, hidden with noise of other real part-hashes.
   Thunderbird takes measures such as stripping out identifying parameters and since SBv4 (FF57+)
   doesn't even use cookies. (#Turn on browser.safebrowsing.debug to monitor this activity)

   [1] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
   [2] https://wiki.mozilla.org/Security/Safe_Browsing
   [3] https://support.mozilla.org/kb/how-does-phishing-and-malware-protection-work
***/
user_pref("_user.js.parrot", "0400 syntax error: the parrot's passed on!");
/* 0401: disable SB (Safe Browsing)
 * [WARNING] Do this at your own risk! These are the master switches ***/
   // user_pref("browser.safebrowsing.malware.enabled", false);
   // user_pref("browser.safebrowsing.phishing.enabled", false);
/* 0402: disable SB checks for downloads (both local lookups + remote)
 * This is the master switch for the safebrowsing.downloads* prefs (0403, 0404) ***/
   // user_pref("browser.safebrowsing.downloads.enabled", false);
/* 0403: disable SB checks for downloads (remote)
 * To verify the safety of certain executable files, Thunderbird may submit some information about the
 * file, including the name, origin, size and a cryptographic hash of the contents, to the Google
 * Safe Browsing service which helps Thunderbird determine whether or not the file should be blocked
 * [SETUP-SECURITY] If you do not understand this, or you want this protection, then override this ***/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
   // user_pref("browser.safebrowsing.downloads.remote.url", ""); // Defense-in-depth
/* 0404: disable SB checks for unwanted software ***/
   // user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
   // user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
/* 0405: disable "ignore this warning" on SB warnings [FF45+]
 * If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
 * [TEST] see https://github.com/arkenfox/user.js/wiki/Appendix-A-Test-Sites#-mozilla
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
user_pref("network.predictor.enable-prefetch", false); // [FF48+] [DEFAULT: false]
/* 0604: disable link-mouseover opening connection to linked server
 * [1] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests ***/
user_pref("network.http.speculative-parallel-limit", 0);
/* 0610: enforce no "Hyperlink Auditing" (click tracking)
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
/* 0704: disable GIO as a potential proxy bypass vector [FF60+]
 * Gvfs/GIO has a set of supported protocols like obex, network, archive, computer,
 * dav, cdda, gphoto2, trash, etc. By default only sftp is accepted (FF87+)
 * [1] https://bugzilla.mozilla.org/1433507
 * [2] https://en.wikipedia.org/wiki/GVfs
 * [3] https://en.wikipedia.org/wiki/GIO_(software) ***/
user_pref("network.gio.supported-protocols", ""); // [HIDDEN PREF]
/* 0705: disable proxy direct failover for system requests [FF91+]
 * [WARNING] Default true is a security feature against malicious extensions [1]
 * [SETUP-CHROME] If you use a proxy and you trust your extensions
 * [1] https://blog.mozilla.org/security/2021/10/25/securing-the-proxy-api-for-firefox-add-ons/ ***/
   // user_pref("network.proxy.failover_direct", false);
/* 0706: disable proxy bypass for system request failures [FF95+]
 * RemoteSettings, UpdateService, Telemetry [1]
 * [WARNING] If false, this will break the fallback for some security features
 * [SETUP-CHROME] If you use a proxy and you understand the security impact
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1732792,1733994,1733481 ***/
   // user_pref("network.proxy.allow_bypass", false); // [HIDDEN PREF FF95-96]
/* 0710: disable DNS-over-HTTPS (DoH) rollout [FF60+]
 * 0=off by default, 2=TRR (Trusted Recursive Resolver) first, 3=TRR only, 5=explicitly off
 * see "doh-rollout.home-region": USA 2019, Canada 2021, Russia/Ukraine 2022 [3]
 * [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
 * [2] https://wiki.mozilla.org/Security/DOH-resolver-policy
 // * [3] https://support.mozilla.org/en-US/kb/firefox-dns-over-https
 * [4] https://www.eff.org/deeplinks/2020/12/dns-doh-and-odoh-oh-my-year-review-2020 ***/
   // user_pref("network.trr.mode", 5);
/* 0706: disable proxy direct failover for system requests [FF91+]
 * [WARNING] Default true is a security feature against malicious extensions [1]
 * [SETUP-CHROME] If you use a proxy and you trust your extensions
 * [1] https://blog.mozilla.org/security/2021/10/25/securing-the-proxy-api-for-firefox-add-ons/ ***/
   // user_pref("network.proxy.failover_direct", false);

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
user_pref("browser.fixup.alternate.enabled", false); // [DEFAULT: false FF104+]
/* 0804: disable live search suggestions
 * [NOTE] Both must be true for the location bar to work
 * [SETUP-CHROME] Override this if you trust and use a privacy respecting search engine ***/
user_pref("browser.search.suggest.enabled", false);
/* 0810: disable search and form history
 * [SETUP-WEB] Be aware that autocomplete form data can be read by third parties [1][2]
 * [NOTE] We also clear formdata on exit (2811)
 * [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html
 * [2] https://bugzilla.mozilla.org/381681 ***/
user_pref("browser.formfill.enable", false);
/* 0811: disable Form Autofill
 * [NOTE] Stored data is NOT secure (uses a JSON file)
 * [NOTE] Heuristics controls Form Autofill on forms without @autocomplete attributes
 * [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill ***/
user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
user_pref("extensions.formautofill.available", "off"); // [FF56+]
user_pref("extensions.formautofill.creditCards.available", false); // [FF57+]
user_pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
user_pref("extensions.formautofill.heuristics.enabled", false); // [FF55+]
/* 0820: disable coloring of visited links
 * Bulk rapid history sniffing was mitigated in 2010 [1][2]. Slower and more expensive
 * redraw timing attacks were largely mitigated in FF77+ [3]. Using RFP (4501) further hampers timing
 * attacks. Don't forget clearing history on exit (2811). However, social engineering [2#limits][4][5]
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
/* 0903: disable auto-filling username & password form fields
 * can leak in cross-site forms *and* be spoofed
 * [NOTE] Username & password is still available when you enter the field
 * [1] https://freedom-to-tinker.com/2017/12/27/no-boundaries-for-user-identities-web-trackers-exploit-browser-login-managers/
 * [2] https://homes.esat.kuleuven.be/~asenol/leaky-forms/ ***/
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
 * [WARNING] This preference is very buggy, you might not manage to start Thunderbird when it's switched on
 * [1] https://support.mozilla.org/en-US/kb/protect-your-thunderbird-passwords-master-password
 * [2] https://www.schneier.com/wp-content/uploads/2020/06/Privacy_Threats_in_Intimate_Relationships-1.pdf ***/
  // user_pref("mail.password_protect_local_cache", true);  // [HIDDEN PREF]

/*** [SECTION 1000]: DISK AVOIDANCE ***/
user_pref("_user.js.parrot", "1000 syntax error: the parrot's gone to meet 'is maker!");
/* 1001: disable disk cache
 * [SETUP-CHROME] If you think disk cache helps perf, then feel free to override this
 * [NOTE] We also clear cache on exit (2811) ***/
user_pref("browser.cache.disk.enable", false);
/* 1002: disable media cache from writing to disk in Private Browsing
 * [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB ***/
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
 * Blocks connections to servers that don't support RFC 5746 [2] as they're potentially vulnerable to a
 * MiTM attack [3]. A server without RFC 5746 can be safe from the attack if it disables renegotiations
 * but the problem is that the browser can't know that. Setting this pref to true is the only way for the
 * browser to ensure there will be no unsafe renegotiations on the channel between the browser and the server
 * [SETUP-WEB] SSL_ERROR_UNSAFE_NEGOTIATION: is it worth overriding this for that one site?
 * [STATS] SSL Labs (July 2021) reports over 99% of top sites have secure renegotiation [4]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://datatracker.ietf.org/doc/html/rfc5746
 * [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
 * [4] https://www.ssllabs.com/ssl-pulse/ ***/
user_pref("security.ssl.require_safe_negotiation", true);
/* 1206: disable TLS1.3 0-RTT (round-trip time) [FF51+]
 * This data is not forward secret, as it is encrypted solely under keys derived using
 * the offered PSK. There are no guarantees of non-replay between connections
 * [1] https://github.com/tlswg/tls13-spec/issues/1001
 * [2] https://www.rfc-editor.org/rfc/rfc9001.html#name-replay-attacks-with-0-rtt
 * [3] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/ ***/
user_pref("security.tls.enable_0rtt_data", false);

/** OCSP (Online Certificate Status Protocol)
   [1] https://scotthelme.co.uk/revocation-is-broken/
   [2] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
***/
/* 1211: enforce OCSP fetching to confirm current validity of certificates
 * 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
 * OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority)
 * It's a trade-off between security (checking) and privacy (leaking info to the CA)
 * [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
 * [SETTING] Privacy & Security > Security > Certificates > Query OCSP responder servers...
 * [1] https://en.wikipedia.org/wiki/Ocsp ***/
user_pref("security.OCSP.enabled", 1); // [DEFAULT: 1]
/* 1212: set OCSP fetch failures (non-stapled, see 1211) to hard-fail [SETUP-WEB]
 * When a CA cannot be reached to validate a cert, Thunderbird's just continues the connection (=soft-fail)
 * Setting this pref to true tells Thunderbird's to instead terminate the connection (=hard-fail)
 * It is pointless to soft-fail when an OCSP fetch fails: you cannot confirm a cert is still valid (it
 * could have been revoked) and/or you could be under attack (e.g. malicious blocking of OCSP servers)
 * [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
 * [2] https://www.imperialviolet.org/2014/04/19/revchecking.html ***/
user_pref("security.OCSP.require", true);

/** CERTS / HPKP (HTTP Public Key Pinning) ***/
/* 1221: disable Windows 8.1's Microsoft Family Safety cert [FF50+] [WINDOWS]
 * 0=disable detecting Family Safety mode and importing the root
 * 1=only attempt to detect Family Safety mode (don't import the root)
 * 2=detect Family Safety mode and import the root
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/21686 ***/
user_pref("security.family_safety.mode", 0);
/* 1223: enable strict PKP (Public Key Pinning)
 * 0=disabled, 1=allow user MiTM (default; such as your antivirus), 2=strict
 * [SETUP-WEB] MOZILLA_PKIX_ERROR_KEY_PINNING_FAILURE: If you rely on an AV (antivirus) to protect
 * your web browsing by inspecting ALL your web traffic, then override to current default ***/
user_pref("security.cert_pinning.enforcement_level", 2);
/* 1224: enable CRLite [FF73+]
 * 0 = disabled
 * 1 = consult CRLite but only collect telemetry
 * 2 = consult CRLite and enforce both "Revoked" and "Not Revoked" results
 * 3 = consult CRLite and enforce "Not Revoked" results, but defer to OCSP for "Revoked" (FF99+, default FF100+)
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985,1753071
 * [2] https://blog.mozilla.org/security/tag/crlite/ ***/
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 2);
/* 1225: enable loading of client certificates stored in OS certificate storage
 * Bug: this does **NOT** work for S/MIME [1]
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1726442 ***/
   // user_pref("security.osclientcerts.autoload", true);

/** MIXED CONTENT ***/
/* 1241: disable insecure passive content (such as images) on https pages [SETUP-WEB] ***/
user_pref("security.mixed_content.block_display_content", true);
/* 1244: enable HTTPS-Only mode in all windows [FF76+]
 * When the top-level is HTTPS, insecure subresources are also upgraded (silent fail)
 * [TEST] http://example.com [upgrade]
 * [TEST] http://httpforever.com/ [no upgrade] ***/
user_pref("dom.security.https_only_mode", true); // [FF76+]
user_pref("dom.security.https_only_mode_pbm", true); // [FF80+]
/* 1245: enable HTTPS-Only mode for local resources [FF77+] ***/
user_pref("dom.security.https_only_mode.upgrade_local", true);
/* 1246: disable HTTP background requests [FF82+]
 * When attempting to upgrade, if the server doesn't respond within 3 seconds, Thunderbird sends
 * a top-level HTTP request without path in order to check if the server supports HTTPS or not
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
 * 0=do neither, 1=pre-populate url, 2=pre-populate url + pre-fetch cert (default)
 * [1] https://github.com/pyllyukko/user.js/issues/210 ***/
user_pref("browser.ssl_override_behavior", 1);
/* 1272: display advanced information on Insecure Connection warning pages
 * only works when it's possible to add an exception
 * i.e. it doesn't work for HSTS discrepancies (https://subdomain.preloaded-hsts.badssl.com/)
 * [TEST] https://expired.badssl.com/ ***/
user_pref("browser.xul.error_pages.expert_bad_cert", true);
/* 1280: display warnings when insecure HTTP connections are made ***/
user_pref("security.warn_entering_weak", true);
user_pref("security.warn_leaving_secure", true);
user_pref("security.warn_viewing_mixed", true);

/*** [SECTION 1400]: FONTS ***/
user_pref("_user.js.parrot", "1400 syntax error: the parrot's bereft of life!");
/* 1401: disable rendering of SVG OpenType fonts ***/
user_pref("gfx.font_rendering.opentype_svg.enabled", false);
/* 1402: limit font visibility (Windows, Mac, some Linux) [FF94+]
 * Uses hardcoded lists with two parts: kBaseFonts + kLangPackFonts [1], bundled fonts are auto-allowed
 * In normal windows: uses the first applicable: RFP (4506) over TP over Standard
 * In Private Browsing windows: uses the most restrictive between normal and private
 * 1=only base system fonts, 2=also fonts from optional language packs, 3=also user-installed fonts
 * [1] https://searchfox.org/mozilla-central/search?path=StandardFonts*.inc ***/
   // user_pref("layout.css.font-visibility.private", 1);
   // user_pref("layout.css.font-visibility.standard", 1);
   // user_pref("layout.css.font-visibility.trackingprotection", 1);

/*** [SECTION 1600]: HEADERS / REFERERS
                  full URI: https://example.com:8888/foo/bar.html?id=1234
     scheme+host+port+path: https://example.com:8888/foo/bar.html
          scheme+host+port: https://example.com:8888
   [1] https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/
***/
user_pref("_user.js.parrot", "1600 syntax error: the parrot rests in peace!");
/* 1601: control when to send a cross-origin referer
 * 0=always (default), 1=only if base domains match, 2=only if hosts match
 * [SETUP-WEB] Breakage: older modems/routers and some sites e.g banks, vimeo, icloud, instagram
 * If "2" is too strict, then override to "0" and use Smart Referer extension (Strict mode + add exceptions) ***/
user_pref("network.http.referer.XOriginPolicy", 2);
/* 1602: control the amount of cross-origin information to send [FF52+]
 * 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);
/* 1603: enable the DNT (Do Not Track) HTTP header
 * [SETTING] Privacy & Security > Privacy > Web Content > Send websites a "Do Not Track" signal... ***/
user_pref("privacy.donottrackheader.enabled", true);

 /*** [SECTION 1700]: CONTAINERS ***/
user_pref("_user.js.parrot", "1700 syntax error: the parrot's bit the dust!");
/* 1701: enable Container Tabs and its UI setting [FF50+]
 * https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers ***/
user_pref("privacy.userContext.enabled", true);
user_pref("privacy.userContext.ui.enabled", true);

/*** [SECTION 2000]: PLUGINS / MEDIA / WEBRTC ***/
user_pref("_user.js.parrot", "2000 syntax error: the parrot's snuffed it!");
/* 2001: disable WebRTC (Web Real-Time Communication)
 * Thunderbird uses mDNS hostname obfuscation on desktop (except Windows7/8) and the
 * private IP is NEVER exposed, except if required in TRUSTED scenarios; i.e. after
 * you grant device (microphone or camera) access
 * [SETUP-HARDEN] Test first. Windows7/8 users only: behind a proxy who never use WebRTC
 * [TEST] https://browserleaks.com/webrtc
 * [1] https://groups.google.com/g/discuss-webrtc/c/6stQXi72BEU/m/2FwZd24UAQAJ
 * [2] https://datatracker.ietf.org/doc/html/draft-ietf-mmusic-mdns-ice-candidates#section-3.1.1 ***/
user_pref("media.peerconnection.enabled", false);
/* 2002: force WebRTC inside the proxy [FF70+] ***/
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);
/* 2003: force a single network interface for ICE candidates generation [FF42+]
 * When using a system-wide proxy, it uses the proxy interface
 * [1] https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate
 * [2] https://wiki.mozilla.org/Media/WebRTC/Privacy ***/
user_pref("media.peerconnection.ice.default_address_only", true);
/* 2004: force exclusion of private IPs from ICE candidates [FF51+]
 * [SETUP-HARDEN] This will protect your private IP even in TRUSTED scenarios after you
 * grant device access, but often results in breakage on video-conferencing platforms ***/
user_pref("media.peerconnection.ice.no_host", true);
/* 2020: disable GMP (Gecko Media Plugins)
 * [1] https://wiki.mozilla.org/GeckoMediaPlugins ***/
user_pref("media.gmp-provider.enabled", false);
/* 2021: disable widevine CDM (Content Decryption Module)
 * [NOTE] This is covered by the EME master switch (2022) ***/
user_pref("media.gmp-widevinecdm.enabled", false);
/* 2022: disable all DRM content (EME: Encryption Media Extension)
 * Optionally hide the setting which also disables the DRM prompt
 * [SETUP-WEB] e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
 * [TEST] https://bitmovin.com/demos/drm
 * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
user_pref("media.eme.enabled", false);
    // user_pref("browser.eme.ui.enabled", false);
/* 2030: disable autoplay of HTML5 media [FF63+]
 * 0=Allow all, 1=Block non-muted media (default), 5=Block all
 * [NOTE] You can set exceptions under site permissions ***/
user_pref("media.autoplay.default", 5);
/* 2031: disable autoplay of HTML5 media if you interacted with the site [FF78+]
 * 0=sticky (default), 1=transient, 2=user
 * Thunderbird's Autoplay Policy Documentation (PDF) is linked below via SUMO
 * [NOTE] If you have trouble with some video sites, then add an exception (2030)
 * [1] https://support.mozilla.org/questions/1293231 ***/
user_pref("media.autoplay.blocking_policy", 2);

/*** [SECTION 2400]: DOM (DOCUMENT OBJECT MODEL) ***/
user_pref("_user.js.parrot", "2400 syntax error: the parrot's kicked the bucket!");
/* 2401: disable "Confirm you want to leave" dialog on page close
 * Does not prevent JS leaks of the page close event
 * [1] https://developer.mozilla.org/docs/Web/Events/beforeunload ***/
user_pref("dom.disable_beforeunload", true);
/* 2402: prevent scripts from moving and resizing open windows ***/
user_pref("dom.disable_window_move_resize", true);
/* 2403: block popup windows ***/
user_pref("dom.disable_open_during_load", true);
/* 2404: limit events that can cause a popup [SETUP-WEB] ***/
user_pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");

/*** [SECTION 2600]: MISCELLANEOUS ***/
user_pref("_user.js.parrot", "2600 syntax error: the parrot's run down the curtain!");
/* 2601: prevent accessibility services from accessing your browser [RESTART]
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
 * [1] https://github.com/pyllyukko/user.js/issues/179#issuecomment-246468676 ***/
user_pref("devtools.chrome.enabled", false);
/* 2608: reset remote debugging to disabled
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16222 ***/
user_pref("devtools.debugger.remote-enabled", false); // [DEFAULT: false]
/* 2611: disable middle mouse click opening links from clipboard
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/10089 ***/
user_pref("middlemouse.contentLoadURL", false);
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
 * CAVEAT: JS can still force a pdf to open in-browser by bundling its own code ***/
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

/** DOWNLOADS ***/
/* 2651: enable user interaction for security by always asking where to download
 * [SETUP-CHROME] On Android this blocks longtapping and saving images ***/
user_pref("browser.download.useDownloadDir", false);
/* 2653: disable adding downloads to the system's "recent documents" list ***/
user_pref("browser.download.manager.addToRecentDocs", false);
/* 2654: enable user interaction for security by always asking how to handle new mimetypes [FF101+]
 * [SETTING] General>Files and Applications>What should Thunderbird do with other files ***/
user_pref("browser.download.always_ask_before_handling_new_types", true);

/** EXTENSIONS ***/
/* 2660: lock down allowed extension directories
 * [SETUP-CHROME] This will break extensions, language packs, themes and any other
 * XPI files which are installed outside of profile and application directories
 * [1] https://mike.kaply.com/2012/02/21/understanding-add-on-scopes/
 * [1] https://archive.is/DYjAM (archived) ***/
user_pref("extensions.enabledScopes", 5); // [HIDDEN PREF]
user_pref("extensions.autoDisableScopes", 15); // [DEFAULT: 15]
/* 2662: disable webextension restrictions on certain mozilla domains (you also need 4503) [FF60+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
   // user_pref("extensions.webextensions.restrictedDomains", "");

/*** [SECTION 2700]: PERSISTENT STORAGE & ETP (ENHANCED TRACKING PROTECTION)
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

   [NOTE] As Thunderbird lacks of ETP Strict Mode support at the moment, we still enable FPI (4000),
   have to deal with persistent storage here and enable state partitioning of service workers (2790)
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
 * [SETTING] Privacy & Security > Privacy > Web Content > Accept cookies from sites
 * [1] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/ ***/
user_pref("network.cookie.cookieBehavior", 2);
/* 2702: set third-party cookies (if enabled, see 2701) to session-only
 * [NOTE] .sessionOnly overrides .nonsecureSessionOnly except when .sessionOnly=false and
 * .nonsecureSessionOnly=true. This allows you to keep HTTPS cookies, but session-only HTTP ones
 * [1] https://feeding.cloud.geek.nz/posts/tweaking-cookies-for-privacy-in-firefox/ ***/
user_pref("network.cookie.thirdparty.sessionOnly", true);
user_pref("network.cookie.thirdparty.nonsecureSessionOnly", true); // [FF58+]
/* 2703: delete cookies and site data on close
 * 0=keep until they expire (default), 2=keep until you close Thunderbird
 * [NOTE] The setting below is disabled (but not changed) if you block all cookies (2701 = 2)
 * [SETTING] Privacy & Security > Privacy > Web Content > Keep until: "I close Thunderbird" ***/
user_pref("network.cookie.lifetimePolicy", 2);
/* 2710: enable Enhanced Tracking Protection (ETP) in all windows ***/
user_pref("privacy.trackingprotection.enabled", true);
/* 2711: enable various ETP lists ***/
user_pref("privacy.trackingprotection.socialtracking.enabled", true);
user_pref("privacy.trackingprotection.cryptomining.enabled", true); // [DEFAULT: true]
user_pref("privacy.trackingprotection.fingerprinting.enabled", true); // [DEFAULT: true]
/* 2712: disable ETP web compat features [FF93+]
 * [SETUP-HARDEN] Includes skip lists, heuristics (SmartBlock) and automatic grants
 * Opener and redirect heuristics are granted for 30 days, see [3]
 * [1] https://blog.mozilla.org/security/2021/07/13/smartblock-v2/
 * [2] https://hg.mozilla.org/mozilla-central/rev/e5483fd469ab#l4.12
 * [3] https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning#storage_access_heuristics ***/
   // user_pref("privacy.antitracking.enableWebcompat", false);
/* 2720: customize ETP settings (as Strict Mode is not available) */
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault", true); // [DEFAULT: true]
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.top_navigation", true); // [DEFAULT: true FF100+]
user_pref("privacy.partition.network_state.ocsp_cache", true);
user_pref("privacy.query_stripping.enabled", true); // [FF101+]
/* 2740: disable service worker cache and cache storage
 * [NOTE] We clear service worker cache on exit (2811)
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
user_pref("dom.storage_access.enabled", false); // [DEFAULT: false]
/* 2790: enable state partitioning of service workers [FF96+] ***/
user_pref("privacy.partition.serviceWorkers", true);

/*** [SECTION 2800]: SHUTDOWN & SANITIZING ***/
user_pref("_user.js.parrot", "2800 syntax error: the parrot's bleedin' demised!");
/** COOKIES + SITE DATA : ALLOWS EXCEPTIONS ***/
/* 2801: delete cookies and site data on exit
 * 0=keep until they expire (default), 2=keep until you close Thunderbird
 * [NOTE] A "cookie" block permission also controls localStorage/sessionStorage, indexedDB,
 * sharedWorkers and serviceWorkers. serviceWorkers require an "Allow" permission
 * [SETTING] Privacy & Security>Cookies and Site Data>Delete cookies and site data when Thunderbird is closed
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Cookies>Allow
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Settings ***/
user_pref("network.cookie.lifetimePolicy", 2);
/* 2802: delete cache on exit [FF96+]
 * [NOTE] We already disable disk cache (1001) and clear on exit (2811) which is more robust
 * [1] https://bugzilla.mozilla.org/1671182 ***/
   // user_pref("privacy.clearsitedata.cache.enabled", true);

/** SANITIZE ON SHUTDOWN : ALL OR NOTHING ***/
/* 2810: enable Thunderbird to clear items on shutdown (2811)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Thunderbird closes ***/
user_pref("privacy.sanitize.sanitizeOnShutdown", true);
/* 2811: set/enforce what items to clear on shutdown (if 2810 is true) [SETUP-CHROME]
 * These items do not use exceptions, it is all or nothing (1681701)
 * [NOTE] If "history" is true, downloads will also be cleared
 * [NOTE] "sessions": Active Logins: refers to HTTP Basic Authentication [1], not logins via cookies
 * [NOTE] "offlineApps": Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache)
 * [1] https://en.wikipedia.org/wiki/Basic_access_authentication ***/
user_pref("privacy.clearOnShutdown.cache", true);     // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.downloads", true); // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.formdata", true);  // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.history", true);   // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.sessions", true);  // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.offlineApps", true); // [DEFAULT: false]
user_pref("privacy.clearOnShutdown.cookies", true);
   // user_pref("privacy.clearOnShutdown.siteSettings", false);

/** SANITIZE MANUAL: ALL OR NOTHING ***/
/* 2820: reset default items to clear with Ctrl-Shift-Del [SETUP-CHROME]
 * This dialog can also be accessed from the menu History>Clear Recent History
 * Thunderbird remembers your last choices. This will reset them when you start Thunderbird
 * [NOTE] Regardless of what you set "downloads" to, as soon as the dialog
 * for "Clear Recent History" is opened, it is synced to the same as "history" ***/
user_pref("privacy.cpd.cache", true);    // [DEFAULT: true]
user_pref("privacy.cpd.formdata", true); // [DEFAULT: true]
user_pref("privacy.cpd.history", true);  // [DEFAULT: true]
user_pref("privacy.cpd.sessions", true); // [DEFAULT: true]
user_pref("privacy.cpd.offlineApps", true); // [DEFAULT: false]
user_pref("privacy.cpd.cookies", true);
   // user_pref("privacy.cpd.downloads", true); // not used, see note above
   // user_pref("privacy.cpd.passwords", false);
   // user_pref("privacy.cpd.siteSettings", false);
/* 2821: clear Session Restore data when sanitizing on shutdown or manually [FF34+]
 * [NOTE] Not needed if Session Restore is not used (0102) or it is already cleared with history (2811)
 * [NOTE] privacy.clearOnShutdown.openWindows prevents resuming from crashes (also see 5008) ***/
   // user_pref("privacy.clearOnShutdown.openWindows", true);
   // user_pref("privacy.cpd.openWindows", true);
/* 2822: reset default "Time range to clear" for "Clear Recent History" (2820)
 * Thunderbird remembers your last choice. This will reset the value when you start Thunderbird
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
 * [NOTE] Values 5 (last 5 minutes) and 6 (last 24 hours) are not listed in the dropdown,
 * which will display a blank value, and are not guaranteed to work ***/
user_pref("privacy.sanitize.timeSpan", 0);

/*** [SECTION 4000]: FPI (FIRST PARTY ISOLATION)
   1278037 - indexedDB (FF51+)
   1277803 - favicons (FF52+)
   1264562 - OCSP cache (FF52+)
   1268726 - Shared Workers (FF52+)
   1316283 - SSL session cache (FF52+)
   1317927 - media cache (FF53+)
   1323644 - HSTS and HPKP (FF54+)
   1334690 - HTTP Alternative Services (FF54+)
   1334693 - SPDY/HTTP2 (FF55+)
   1337893 - DNS cache (FF55+)
   1344170 - blob: URI (FF55+)
   1300671 - data:, about: URLs (FF55+)
   1473247 - IP addresses (FF63+)
   1542309 - top-level domain URLs when host is in the public suffix list (FF68+)
   1506693 - pdfjs range-based requests (FF68+)
   1330467 - site permissions (FF69+)
   1534339 - IPv6 (FF73+)
   1721858 - WebSocket (FF92+)
***/
user_pref("_user.js.parrot", "4000 syntax error: the parrot's pegged out");
/* 4001: enable First Party Isolation [FF51+]
 * [SETUP-WEB] Breaks some cross-origin logins
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1260931,1299996 ***/
user_pref("privacy.firstparty.isolate", true);
/* 4002: enforce FPI restriction for window.opener [FF54+]
 * [NOTE] Setting this to false may reduce the breakage in 4001
 * FF65+ blocks postMessage with targetOrigin "*" if originAttributes don't match. But
 * to reduce breakage it ignores the 1st-party domain (FPD) originAttribute [2][3]
 * The 2nd pref removes that limitation and will only allow communication if FPDs also match
 * [1] https://bugzilla.mozilla.org/1319773#c22
 * [2] https://bugzilla.mozilla.org/1492607
 * [3] https://developer.mozilla.org/docs/Web/API/Window/postMessage ***/
user_pref("privacy.firstparty.isolate.restrict_opener_access", true); // [DEFAULT: true]
user_pref("privacy.firstparty.isolate.block_post_message", true);
/* 4003: enable scheme with FPI [FF78+]
 * [NOTE] Experimental: existing data and site permissions are incompatible
 * and some site exceptions may not work e.g. HTTPS-only mode (1244) ***/
user_pref("privacy.firstparty.isolate.use_site", true);

/*** [SECTION 4500]: RFP (RESIST FINGERPRINTING)
   RFP covers a wide range of ongoing fingerprinting solutions.
   It is an all-or-nothing buy in: you cannot pick and choose what parts you want

   [WARNING] DO NOT USE extensions to alter RFP protected metrics

    418986 - limit window.screen & CSS media queries (FF41)
      [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
   1281949 - spoof screen orientation (FF50)
   1281963 - hide the contents of navigator.plugins and navigator.mimeTypes (FF50-99)
      FF53: fixes GetSupportedNames in nsMimeTypeArray and nsPluginArray (1324044)
   1330890 - spoof timezone as UTC0 (FF55)
   1360039 - spoof navigator.hardwareConcurrency as 2 (FF55)
   1217238 - reduce precision of time exposed by javascript (FF55)
 FF56
   1369303 - spoof/disable performance API
   1333651 - spoof User Agent & Navigator API
      version: spoofed as ESR (FF102+ this is limited to Android)
      OS: JS spoofed as Windows 10, OS 10.15, Android 10, or Linux | HTTP Headers spoofed as Windows or Android
   1369319 - disable device sensor API
   1369357 - disable site specific zoom
   1337161 - hide gamepads from content
   1372072 - spoof network information API as "unknown" when dom.netinfo.enabled = true
   1333641 - reduce fingerprinting in WebSpeech API
 FF57
   1369309 - spoof media statistics
   1382499 - reduce screen co-ordinate fingerprinting in Touch API
   1217290 & 1409677 - enable some fingerprinting resistance for WebGL
   1382545 - reduce fingerprinting in Animation API
   1354633 - limit MediaError.message to a whitelist
 FF58-90
    967895 - spoof canvas and enable site permission prompt (FF58)
   1372073 - spoof/block fingerprinting in MediaDevices API (FF59)
      Spoof: enumerate devices as one "Internal Camera" and one "Internal Microphone"
      Block: suppresses the ondevicechange event
   1039069 - warn when language prefs are not set to "en*" (also see 0210, 0211) (FF59)
   1222285 & 1433592 - spoof keyboard events and suppress keyboard modifier events (FF59)
      Spoofing mimics the content language of the document. Currently it only supports en-US.
      Modifier events suppressed are SHIFT and both ALT keys. Chrome is not affected.
   1337157 - disable WebGL debug renderer info (FF60)
   1459089 - disable OS locale in HTTP Accept-Language headers (ANDROID) (FF62)
   1479239 - return "no-preference" with prefers-reduced-motion (FF63)
   1363508 - spoof/suppress Pointer Events (FF64)
   1492766 - spoof pointerEvent.pointerid (FF65)
   1485266 - disable exposure of system colors to CSS or canvas (FF67)
   1494034 - return "light" with prefers-color-scheme (FF67)
   1564422 - spoof audioContext outputLatency (FF70)
   1595823 - return audioContext sampleRate as 44100 (FF72)
   1607316 - spoof pointer as coarse and hover as none (ANDROID) (FF74)
   1621433 - randomize canvas (previously FF58+ returned an all-white canvas) (FF78)
   1653987 - limit font visibility to bundled and "Base Fonts" (Windows, Mac, some Linux) (FF80)
   1461454 - spoof smooth=true and powerEfficient=false for supported media in MediaCapabilities (FF82)
 FF91+
    531915 - use fdlibm's sin, cos and tan in jsmath (FF93, ESR91.1)
   1756280 - enforce navigator.pdfViewerEnabled as true and plugins/mimeTypes as hard-coded values (FF100)
   1692609 - reduce JS timing precision to 16.67ms (previously FF55+ was capped at 100ms) (FF102)
***/
user_pref("_user.js.parrot", "4500 syntax error: the parrot's popped 'is clogs");
/* 4501: enable privacy.resistFingerprinting [FF41+]
 * [SETUP-WEB] RFP can cause some website breakage: mainly canvas, use a site exception via the urlbar
 * RFP also has a few side effects: mainly timezone is UTC0, and websites will prefer light theme
 * [1] https://bugzilla.mozilla.org/418986 ***/
user_pref("privacy.resistFingerprinting", true);
/* 4502: set new window size rounding max values [FF55+]
 * [SETUP-CHROME] sizes round down in hundreds: width to 200s and height to 100s, to fit your screen
 * [1] https://bugzilla.mozilla.org/1330882 ***/
user_pref("privacy.window.maxInnerWidth", 1600);
user_pref("privacy.window.maxInnerHeight", 900);
/* 4503: disable mozAddonManager Web API [FF57+]
 * [NOTE] To allow extensions to work on AMO, you also need 2662
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true); // [HIDDEN PREF]
/* 4504: enable RFP letterboxing [FF67+]
 * Dynamically resizes the inner window by applying margins in stepped ranges [2]
 * If you use the dimension pref, then it will only apply those resolutions.
 * The format is "width1xheight1, width2xheight2, ..." (e.g. "800x600, 1000x1000")
 * [SETUP-WEB] This is independent of RFP (4501). If you're not using RFP, or you are but
 * dislike the margins, then flip this pref, keeping in mind that it is effectively fingerprintable
 * [WARNING] DO NOT USE: the dimension pref is only meant for testing
 * [1] https://bugzilla.mozilla.org/1407366
 * [2] https://hg.mozilla.org/mozilla-central/rev/6d2d7856e468#l2.32 ***/
user_pref("privacy.resistFingerprinting.letterboxing", true); // [HIDDEN PREF]
   // user_pref("privacy.resistFingerprinting.letterboxing.dimensions", ""); // [HIDDEN PREF]
/* 4505: experimental RFP [FF91+]
 * [WARNING] DO NOT USE unless testing, see [1] comment 12
 * [1] https://bugzilla.mozilla.org/1635603 ***/
   // user_pref("privacy.resistFingerprinting.exemptedDomains", "*.example.invalid");
   // user_pref("privacy.resistFingerprinting.testGranularityMask", 0);
/* 4506: set RFP's font visibility level (1402) [FF94+] ***/
   // user_pref("layout.css.font-visibility.resistFingerprinting", 1); // [DEFAULT: 1]
/* 4510: disable using system colors
 * [SETTING] General > Language and Appearance > Fonts and Colors > Colors > Use system colors ***/
user_pref("browser.display.use_system_colors", false); // [DEFAULT false NON-WINDOWS]
/* 4511: enforce non-native widget theme
 * Security: removes/reduces system API calls, e.g. win32k API [1]
 * Fingerprinting: provides a uniform look and feel across platforms [2]
 * [1] https://bugzilla.mozilla.org/1381938
 * [2] https://bugzilla.mozilla.org/1411425 ***/
user_pref("widget.non-native-theme.enabled", true); // [DEFAULT: true]
/* 4512: enforce links targeting new windows to open in a new tab instead
 * 1=most recent window or tab, 2=new window, 3=new tab
 * Stops malicious window sizes and some screen resolution leaks.
 * You can still right-click a link and open in a new window
 * [NOTE] Thunderbird only supports 3 (see [2])
 * [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/9881
 * [2] https://searchfox.org/comm-esr102/source/mail/app/profile/all-thunderbird.js#721 ***/
user_pref("browser.link.open_newwindow", 3); // [DEFAULT: 3]
/* 4513: set all open window methods to abide by "browser.link.open_newwindow" (4512)
 * [NOTE] Thunderbird only supports 0 (see [2])
 * [1] https://searchfox.org/mozilla-central/source/dom/tests/browser/browser_test_new_window_from_content.js
 * [2] https://searchfox.org/comm-esr102/source/mail/app/profile/all-thunderbird.js#730 ***/
user_pref("browser.link.open_newwindow.restriction", 0);
/* 4520: disable WebGL (Web Graphics Library)
 * [SETUP-WEB] If you need it then override it. RFP still randomizes canvas for naive scripts ***/
user_pref("webgl.disabled", true);

/*** [SECTION 5000]: OPTIONAL OPSEC
   Disk avoidance, application data isolation, eyeballs...
***/
user_pref("_user.js.parrot", "5000 syntax error: the parrot's taken 'is last bow");
/* 5001: start Thunderbird in PB (Private Browsing) mode
 * [NOTE] In this mode all windows are "private windows" and the PB mode icon is not displayed
 * [NOTE] The P in PB mode can be misleading: it means no "persistent" disk state such as history,
 * caches, searches, cookies, localStorage, IndexedDB etc (which you can achieve in normal mode).
 * In fact, PB mode limits or removes the ability to control some of these, and you need to quit
 * Thunderbird to clear them. PB is best used as a one off window (Menu>New Private Window) to provide
 * a temporary self-contained new session. Close all Private Windows to clear the PB mode session.
 * [1] https://wiki.mozilla.org/Private_Browsing
 * [2] https://support.mozilla.org/kb/common-myths-about-private-browsing ***/
   // user_pref("browser.privatebrowsing.autostart", true);
/* 5002: disable memory cache
 * capacity: -1=determine dynamically (default), 0=none, n=memory capacity in kibibytes ***/
user_pref("browser.cache.memory.enable", false);
user_pref("browser.cache.memory.capacity", 0);
/* 5003: disable saving passwords
 * [NOTE] This does not clear any passwords already saved ***/
user_pref("signon.rememberSignons", false);
/* 5004: disable permissions manager from reading or writing to disk [FF41+] [RESTART]
 * [SETUP-CHROME] This means any permission changes (cookie or mail remote content) are session only
 * [1] https://bugzilla.mozilla.org/967812 ***/
user_pref("permissions.memory_only", true); // [HIDDEN PREF]
/* 5005: disable intermediate certificate caching [FF41+] [RESTART]
 * [NOTE] This affects login/cert/key dbs. The effect is all credentials are session-only.
 * Saved logins and passwords are not available. Reset the pref and restart to return them ***/
    // user_pref("security.nocertdb", true); // [HIDDEN PREF in FF101 or lower]
/* 5006: disable favicons in history and bookmarks
 * [NOTE] Stored as data blobs in favicons.sqlite, these don't reveal anything that your
 * actual history (and bookmarks) already do. Your history is more detailed, so
 * control that instead; e.g. disable history, clear history on exit, use PB mode
 * [NOTE] favicons.sqlite is sanitized on Thunderbird close ***/
user_pref("browser.chrome.site_icons", false);
/* 5007: exclude "Undo Closed Tabs" in Session Restore ***/
user_pref("browser.sessionstore.max_tabs_undo", 0);
/* 5008: disable resuming session from crash
 * [TEST] about:crashparent ***/
user_pref("browser.sessionstore.resume_from_crash", false);
/* 5009: disable "open with" in download dialog [FF50+]
 * Application data isolation [1]
 * [1] https://bugzilla.mozilla.org/1281959 ***/
   // user_pref("browser.download.forbid_open_with", true);
/* 5013: disable browsing and download history
 * [NOTE] We also clear history and downloads on exit (2811) ***/
user_pref("places.history.enabled", false);
/* 5016: discourage downloading to desktop
 * 0=desktop, 1=downloads (default), 2=last used ***/
   // user_pref("browser.download.folderList", 2);

/*** [SECTION 5500]: OPTIONAL HARDENING
   Thunderbird-User.JS maintainer here :
        Whereas not recommended by upstream arkenfox, we disable each one of those Web
        features as we focus on keeping Thunderbird an email client and not a browser.
***/
user_pref("_user.js.parrot", "5500 syntax error: this is an ex-parrot!");
/* 5501: disable MathML (Mathematical Markup Language) [FF51+]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=mathml ***/
user_pref("mathml.disabled", true); // 1173199
/* 5502: disable in-content SVG (Scalable Vector Graphics) [FF53+]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+svg ***/
user_pref("svg.disabled", true); // 1216893
/* 5503: disable graphite
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+graphite
 * [2] https://en.wikipedia.org/wiki/Graphite_(SIL) ***/
user_pref("gfx.font_rendering.graphite.enabled", false);
/* 5504: disable asm.js [FF22+]
 * [1] http://asmjs.org/
 * [2] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=asm.js
 * [3] https://rh0dev.github.io/blog/2017/the-return-of-the-jit/ ***/
user_pref("javascript.options.asmjs", false);
/* 5505: disable Ion and baseline JIT to harden against JS exploits
 * [NOTE] When both Ion and JIT are disabled, and trustedprincipals
 * is enabled, then Ion can still be used by extensions (1599226)
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+jit
 * [2] https://microsoftedge.github.io/edgevr/posts/Super-Duper-Secure-Mode/ ***/
user_pref("javascript.options.ion", false);
user_pref("javascript.options.baselinejit", false);
user_pref("javascript.options.jit_trustedprincipals", true); // [FF75+] [HIDDEN PREF]
/* 5506: disable WebAssembly [FF52+]
 * Vulnerabilities [1] have increasingly been found, including those known and fixed
 * in native programs years ago [2]. WASM has powerful low-level access, making
 * certain attacks (brute-force) and vulnerabilities more possible
 * [STATS] ~0.2% of websites, about half of which are for crytomining / malvertising [2][3]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=wasm
 * [2] https://spectrum.ieee.org/tech-talk/telecom/security/more-worries-over-the-security-of-web-assembly
 * [3] https://www.zdnet.com/article/half-of-the-websites-using-webassembly-use-it-for-malicious-purposes ***/
user_pref("javascript.options.wasm", false);
/* 5590: show a prompt when opening a link in external applications ***/
user_pref("security.external_protocol_requires_permission", true);

/*** [SECTION 6000]: DON'T TOUCH ***/
user_pref("_user.js.parrot", "6000 syntax error: the parrot's 'istory!");
/* 6001: enforce Mozilla's blocklist
 * [WHY] It includes updates for "revoked certificates"
 * [1] https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/ ***/
user_pref("extensions.blocklist.enabled", true); // [DEFAULT: true]
/* 6002: enforce no referer spoofing
 * [WHY] Spoofing can affect CSRF (Cross-Site Request Forgery) protections ***/
user_pref("network.http.referer.spoofSource", false); // [DEFAULT: false]
/* 6004: enforce a security delay on some confirmation dialogs such as install, open/save
 * [1] https://www.squarefree.com/2004/07/01/race-conditions-in-security-dialogs/ ***/
user_pref("security.dialog_enable_delay", 1000); // [DEFAULT: 1000]
/* 6009: enforce SmartBlock shims [FF81+]
 * In FF96+ these are listed in about:compat
 * [1] https://blog.mozilla.org/security/2021/03/23/introducing-smartblock/ ***/
user_pref("extensions.webcompat.enable_shims", true); // [DEFAULT: true]
/* 6010: enforce/reset TLS 1.0/1.1 downgrades to session only
 * [NOTE] In FF97+ the TLS 1.0/1.1 downgrade UX was removed
 * [TEST] https://tls-v1-1.badssl.com:1010/ ***/
user_pref("security.tls.version.enable-deprecated", false); // [DEFAULT: false]
/* 6011: enforce disabling of Web Compatibility Reporter [FF56+]
 * Web Compatibility Reporter adds a "Report Site Issue" button to send data to Mozilla
 * [WHY] To prevent wasting Mozilla's time with a custom setup ***/
user_pref("extensions.webcompat-reporter.enabled", false); // [DEFAULT: false]
/* 6012: disable SHA-1 certificates ***/
user_pref("security.pki.sha1_enforcement_level", 1); // [DEFAULT: 1 FF102+]
/* 6050: prefsCleaner: reset items removed from arkenfox FF92+ ***/
   // user_pref("browser.urlbar.trimURLs", "");
   // user_pref("dom.targetBlankNoOpener.enabled", "");
   // user_pref("privacy.window.name.update.enabled", "");
   // user_pref("security.insecure_connection_text.enabled", "");

/*** [SECTION 7000]: DON'T BOTHER
   Thunderbird-User.JS maintainer here :
        Actually we do, TB is an e-mail client, not a (bloated) browser.
        Thus some of below preferences have been set, despite upstream (Arkenfox) warnings.
***/
user_pref("_user.js.parrot", "7000 syntax error: the parrot's pushing up daisies!");
/* 7001: disable APIs
 * Location-Aware Browsing, Full Screen, offline cache (appCache), Virtual Reality
 * [WHY] The API state is easily fingerprintable. Geo and VR are behind prompts (7002).
 * appCache storage capability was removed in FF90. Full screen requires user interaction ***/
user_pref("geo.enabled", false);
user_pref("full-screen-api.enabled", false);
user_pref("browser.cache.offline.enable", false);
user_pref("dom.vr.enabled", false); // [DEFAULT: false FF97+]
/* 7003: disable non-modern cipher suites [1]
 * [WHY] Passive fingerprinting. Minimal/non-existent threat of downgrade attacks
 * [1] https://browserleaks.com/ssl ***/
   // user_pref("security.ssl3.ecdhe_ecdsa_aes_256_sha", false);
   // user_pref("security.ssl3.ecdhe_ecdsa_aes_128_sha", false);
   // user_pref("security.ssl3.ecdhe_rsa_aes_128_sha", false);
   // user_pref("security.ssl3.ecdhe_rsa_aes_256_sha", false);
   // user_pref("security.ssl3.rsa_aes_128_gcm_sha256", false); // no PFS
   // user_pref("security.ssl3.rsa_aes_256_gcm_sha384", false); // no PFS
   // user_pref("security.ssl3.rsa_aes_128_sha", false); // no PFS
   // user_pref("security.ssl3.rsa_aes_256_sha", false); // no PFS
/* 7004: control TLS versions
 * [WHY] Passive fingerprinting and security ***/
   // user_pref("security.tls.version.min", 3); // [DEFAULT: 3]
   // user_pref("security.tls.version.max", 4);
/* 7005: disable SSL session IDs [FF36+]
 * [WHY] Passive fingerprinting and perf costs. These are session-only
 * and isolated with network partitioning (FF85+) and/or containers ***/
   // user_pref("security.ssl.disable_session_identifiers", true); // [HIDDEN PREF in FF101 or lower]
/* 7006: onions
 * [WHY] Thunderbird doesn't support hidden services. Use Tor Browser ***/
   // user_pref("dom.securecontext.allowlist_onions", true); // [FF97+] 1382359/1744006
   // user_pref("network.http.referer.hideOnionSource", true); // 1305144
/* 7007: referers
 * [WHY] Only cross-origin referers (1600s) need control ***/
user_pref("network.http.sendRefererHeader", 0);
user_pref("network.http.referer.trimmingPolicy", 0);
/* 7008: set the default Referrer Policy [FF59+]
 * 0=no-referer, 1=same-origin, 2=strict-origin-when-cross-origin, 3=no-referrer-when-downgrade
 * [WHY] Defaults are fine. They can be overridden by a site-controlled Referrer Policy ***/
user_pref("network.http.referer.defaultPolicy", 0); // [DEFAULT: 2]
user_pref("network.http.referer.defaultPolicy.pbmode", 0); // [DEFAULT: 2]
/* 7010: disable HTTP Alternative Services [FF37+]
 * [WHY] Already isolated with network partitioning (FF85+) ***/
user_pref("network.http.altsvc.enabled", false);
   // user_pref("network.http.altsvc.oe", false); // [DEFAULT: false FF94+]
/* 7011: disable website control over browser right-click context menu
 * [WHY] Just use Shift-Right-Click ***/
user_pref("dom.event.contextmenu.enabled", false);
/* 7012: disable icon fonts (glyphs) and local fallback rendering
 * [WHY] Breakage, font fallback is equivalency, also RFP
 * [1] https://bugzilla.mozilla.org/789788
 * [2] https://gitlab.torproject.org/legacy/trac/-/issues/8455 ***/
user_pref("gfx.downloadable_fonts.enabled", false); // [FF41+]
user_pref("gfx.downloadable_fonts.fallback_delay", -1);
/* 7013: disable Clipboard API
 * [WHY] Fingerprintable. Breakage. Cut/copy/paste require user
 * interaction, and paste is limited to focused editable fields ***/
user_pref("dom.event.clipboardevents.enabled", false);
/* 7014: disable System Add-on updates
 * [WHY] It can compromise security. System addons ship with prefs, use those ***/
   // user_pref("extensions.systemAddon.update.enabled", false); // [FF62+]
   // user_pref("extensions.systemAddon.update.url", ""); // [FF44+]
/* 7017: disable service workers
 * [WHY] Already isolated (FF96+) with TCP (2701) behind a pref (2710)
 * or blocked with TCP in 3rd parties (FF95 or lower) ***/
   // user_pref("dom.serviceWorkers.enabled", false);
/* 7018: disable Web Notifications
 * [WHY] Web Notifications are behind a prompt (7002)
 * [1] https://blog.mozilla.org/en/products/firefox/block-notification-requests/ ***/
   // user_pref("dom.webnotifications.enabled", false); // [FF22+]
   // user_pref("dom.webnotifications.serviceworker.enabled", false); // [FF44+]
/* 7019: disable Push Notifications [FF44+]
 * [WHY] Push requires subscription
 * [NOTE] To remove all subscriptions, reset "dom.push.userAgentID"
 * [1] https://support.mozilla.org/kb/push-notifications-firefox ***/
   // user_pref("dom.push.enabled", false);

/*** [SECTION 8000]: DON'T BOTHER: FINGERPRINTING
   [WHY] They are insufficient to help anti-fingerprinting and do more harm than good
   [WARNING] DO NOT USE with RFP. RFP already covers these and they can interfere
   [NOTE] An empty User-Agent may break Microsoft Exchange OAuth2 login
***/
user_pref("_user.js.parrot", "8000 syntax error: the parrot's crossed the Jordan");
/* 8001: disable APIs ***/
   // user_pref("device.sensors.enabled", false);
   // user_pref("dom.enable_performance", false);
   // user_pref("dom.enable_resource_timing", false);
   // user_pref("dom.gamepad.enabled", false);
   // user_pref("dom.netinfo.enabled", false); // [DEFAULT: false NON-ANDROID: false ANDROID FF99+]
   // user_pref("dom.webaudio.enabled", false);
/* 8002: disable other ***/
   // user_pref("browser.display.use_document_fonts", 0);
   // user_pref("dom.w3c_touch_events.enabled", 0);
   // user_pref("media.navigator.enabled", false);
   // user_pref("media.ondevicechange.enabled", false);
   // user_pref("media.video_stats.enabled", false);
   // user_pref("media.webspeech.synth.enabled", false);
   // user_pref("webgl.enable-debug-renderer-info", false);
/* 8003: spoof ***/
   // user_pref("dom.maxHardwareConcurrency", 2);
   // user_pref("font.system.whitelist", ""); // [HIDDEN PREF]
   // user_pref("general.appname.override", ""); // [HIDDEN PREF]
   // user_pref("general.appversion.override", ""); // [HIDDEN PREF]
   // user_pref("general.buildID.override", ""); // [HIDDEN PREF]
   // user_pref("general.oscpu.override", ""); // [HIDDEN PREF]
   // user_pref("general.platform.override", ""); // [HIDDEN PREF]
   // user_pref("general.useragent.override", ""); // [HIDDEN PREF]
   // user_pref("ui.use_standins_for_native_colors", true);

/*** [SECTION 9000]: PERSONAL
   Non-project related but useful. If any interest you, add them to your overrides
***/
user_pref("_user.js.parrot", "9000 syntax error: the parrot's cashed in 'is chips!");
/* WELCOME & WHAT'S NEW NOTICES ***/
user_pref("mailnews.start_page_override.mstone", "ignore"); // master switch
/* WARNINGS ***/
   // user_pref("browser.tabs.warnOnClose", false); // [DEFAULT false FF94+]
   // user_pref("browser.tabs.warnOnOpen", false);
   // user_pref("full-screen-api.warning.delay", 0);
   // user_pref("full-screen-api.warning.timeout", 0);
/* UPDATES ***/
   // user_pref("app.update.auto", false); // [NON-WINDOWS] disable auto app updates
      // [NOTE] You will still get prompts to update, and should do so in a timely manner
   // user_pref("browser.search.update", false); // disable search engine updates (e.g. OpenSearch)
      // [NOTE] This does not affect Mozilla's built-in or Web Extension search engines
   // user_pref("extensions.update.enabled", false); // disable extension and theme update checks
   // user_pref("extensions.update.autoUpdateDefault", false); // disable installing extension and theme updates
      // [SETTING] about:addons>Extensions>[cog-wheel-icon]>Update Add-ons Automatically (toggle)
   // user_pref("extensions.getAddons.cache.enabled", false); // disable extension metadata (extension detail tab)
/* APPEARANCE ***/
   // user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // [FF68+] allow userChrome/userContent
   // user_pref("ui.prefersReducedMotion", 1); // disable chrome animations [FF77+] [RESTART] [HIDDEN PREF]
      // 0=no-preference, 1=reduce: with RFP this only affects chrome
   // user_pref("ui.systemUsesDarkTheme", 1); // [FF67+] [HIDDEN PREF]
      // 0=light, 1=dark: with RFP this only affects chrome
/* CONTENT BEHAVIOR ***/
   // user_pref("accessibility.typeaheadfind", true); // enable "Find As You Type"
   // user_pref("clipboard.autocopy", false); // disable autocopy default [LINUX]
/* UX BEHAVIOR ***/
   // user_pref("general.autoScroll", false); // middle-click enabling auto-scrolling [DEFAULT: false on Linux]
   // user_pref("mail.tabs.autoHide", true); // hides the tab bar if there is only one tab
   // user_pref("ui.key.menuAccessKey", 0); // disable alt key toggling the menu bar [RESTART]
/* UX FEATURES ***/
   // user_pref("reader.parse-on-load.enabled", false); // Reader View
/* OTHER ***/
   // user_pref("browser.bookmarks.max_backups", 2);
   // user_pref("network.manage-offline-status", false); // see bugzilla 620472
   // user_pref("xpinstall.signatures.required", false); // enforced extension signing (Nightly/ESR)
/* RETURN RECEIPT BEHAVIOR ***/
   // user_pref("mail.mdn.report.enabled", false); // disable return receipt sending unconditionally
/* CUSTOM HEADERS ***/
   // user_pref("mail.compose.other.header", "X-Custom-Header,X-Another-Custom-Header"); // corresponding values can be set in compose window ("double-arrow" drop-down)
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
/* 9111: Show full email instead of just name from address book
 * true=Show just the display name for people in the address book (default)
 * false=Show both the email address and display name. ***/
user_pref("mail.showCondensedAddresses", false);
/* 9112: Disable "Filelink for Large Attachments" feature
 * [1] https://support.thunderbird.net/kb/filelink-large-attachments ***/
user_pref("mail.cloud_files.enabled", false);
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
 * [SETTING] Preferences > Composition > Addressing > Automatically add outgoing e-mail addresses...
 * [SETTING][CARDBOOK] CardBook > Preferences > Email > Collect Outgoing Email ***/
   // user_pref("mail.collect_addressbook", "jsaddrbook://history.sqlite");
user_pref("mail.collect_email_address_outgoing", false);
/* 9131: Only use email addresses, without their Display Names [CARDBOOK] [SETUP-FEATURE]
 * By default, CardBook extension incorporates contacts display names in addresses fields.
 * This could leak sensitive information to all recipients.
 * [SETTING][CARDBOOK] CardBook > Preferences > Email > Sending Emails > Only use email addresses... ***/
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
/* 9202: Set encoding of incoming mail ***/
user_pref("mailnews.view_default_charset", "UTF-8");
/* 9203: Set encoding of outgoing mail ***/
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
/* 9206: Prevent spellchecking dictionary leakage through Content-Language header
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1370217 ***/
user_pref("mail.suppress_content_language", true);
/* 9207: Sanitize Date header to convert date to UTC and round to closest minute
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1603359 ***/
user_pref("mail.sanitize_date_header", true);

/** COMPOSITION ***/
/* 9210: Check spelling before sending [SETUP-FEATURE]
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=667133 ***/
user_pref("mail.SpellCheckBeforeSend", false);
/* 9212: Compose email in plaintext unless expressly overridden
 * [SETUP-FEATURE] Sometimes HTML is useful especially when used with Markdown Here
 * [SETTING] Account Settings > Composition & Addressing > Composition > Compose messages in HTML format
 * [NOTE] Holding down shift when you click on "Write" will bypass
 * [1] http://kb.mozillazine.org/Plain_text_e-mail_%28Thunderbird%29
 * [2] https://support.mozilla.org/en-US/questions/1004181
 * [3] https://markdown-here.com ***/
user_pref("mail.html_compose", false);
user_pref("mail.identity.default.compose_html", false);
/* 9213: Send only plaintext email by default
 * [SETUP-FEATURE] Only use HTML email if you need it, see [1]
 * [SETTING] Composition > Composition > Sending Format
 * Email that is HTML should also have plaintext multipart for plain text users.
 * 0=auto (default, send only plain text if the message is free of any rich formatting
   or inserted elements. Otherwise send both a HTML part and plain text alternative part)
 * 1=plain text (only send a plain text part, losing any rich formatting or inserted elements)
 * 2=HTML (only send a HTML part)
 * 3=both (send both the HTML part and the plain text alternative part)
 * [1] https://drewdevault.com/2016/04/11/Please-use-text-plain-for-emails.html ***/
user_pref("mail.default_send_format", 1);
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
/* 9216: Prefer to view as plaintext or HTML [SETUP-FEATURE]
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
user_pref("mail.compose.big_attachments.threshold_kb", 9220); // [DEFAULT: 5120]
   // user_pref("mailnews.message_warning_size", 20971520); // [DEFAULT: 20971520]
/* 9220: Set public recipients number from which BCC is advised ***/
   // user_pref("mail.compose.warn_public_recipients.threshold", 15); // [DEFAULT: 15]
/* 9221: Show an alert if the warning above has not been addressed ***/
user_pref("mail.compose.warn_public_recipients.aggressive", true);
/* 9222: Disable link previews
 * [SETTING] Composition > Composition > Add link previews when pasting URLs ***/
user_pref("mail.compose.add_link_preview", false); // [DEFAULT: false]

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
/* 9240: Builtin phishing/scamming detection
 * [NOTE] These preferences are enabled by default and should not usually be touched.
 * [1] https://searchfox.org/comm-central/source/mail/modules/PhishingDetector.jsm ***/
user_pref("mail.phishing.detection.enabled", true);
user_pref("mail.phishing.detection.disallow_form_actions", true);
user_pref("mail.phishing.detection.ipaddresses", true);
user_pref("mail.phishing.detection.mismatched_hosts", true);
/* 9250: Disable remote content loading
 * [SETTING] Privacy & Security > Privacy > Mail content > Allow remote content in messages ***/
user_pref("mailnews.message_display.disable_remote_image", true); // [DEFAULT: true]

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
/* 9308: Disable chat desktop notifications ***/
   // user_pref("mail.chat.show_desktop_notifications", false);
/* 9309: Decide how much information will be shown in chat notifications
 * 0=Show all info (sender, chat message message preview),
 * 1=Show sender's info only (not message preview),
 * 2=No info (fill dummy values). ***/
user_pref("mail.chat.notification_info", 2);

/** CALENDAR ***/
/* 9312: Set calendar timezone to avoid system detection [SETUP-INSTALL]
 * By default, extensive system detection would be performed to find user's current timezone.
 * Setting this preference to "UTC" should disable it.
 * You may also directly set it to your timezone, i.e. "Pacific/Fakaofo"
 * [SETTING] Calendar > Calendar > Timezone ***/
user_pref("calendar.timezone.local", "UTC");  // [DEFAULT: ""]
/* 9313: Disable calendar service performing event "extraction" from email content ***/
user_pref("calendar.extract.service.enabled", false);  // [DEFAULT: false]

/** RSS ***/
/** These features don't actually do anything as they aren't implemented
 * [1] https://searchfox.org/comm-esr102/source/mail/base/content/mailWindowOverlay.js#1082
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
/* 9322: Prefer to view as plaintext or HTML
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

/*** [SECTION 9400]: THUNDERBIRD ENCRYPTION (OPENPGP / GNUPG)
   Options that relate to e-mail encryption in Thunderbird.
   [1] https://wiki.mozilla.org/Thunderbird:OpenPGP
   [2] https://support.mozilla.org/kb/openpgp-thunderbird-howto-and-faq
***/
user_pref("_user.js.parrot", "9400 syntax error: this parrot is talking in codes!");

/** OPENPGP ***/
/* 9400: disable OpenPGP "encryption is possible" reminder ***/
   // user_pref("mail.openpgp.remind_encryption_possible", false); // [TB102+]

/** GNUPG ***/
/* 9409: Allow the use of external GnuPG
 * Whenever RNP fails to decrypt a message, Thunderbird will tray against system GnuPG
 * [1] https://wiki.mozilla.org/Thunderbird:OpenPGP:Smartcards#Allow_the_use_of_external_GnuPG ***/
user_pref("mail.openpgp.allow_external_gnupg", true);  // [HIDDEN PREF]

/*** [SECTION 9999]: DEPRECATED / REMOVED / LEGACY / RENAMED
   Documentation denoted as [-]. Items deprecated prior to FF91 have been archived at [1]
   [1] https://github.com/arkenfox/user.js/issues/123
***/
user_pref("_user.js.parrot", "9999 syntax error: the parrot's shuffled off 'is mortal coil!");
/* ESR91.x still uses all the following prefs
// [NOTE] replace the * with a slash in the line above to re-enable them
// FF93
// 7003: disable non-modern cipher suites
   // [-] https://bugzilla.mozilla.org/1724072
   // user_pref("security.ssl3.rsa_des_ede3_sha", false); // 3DES
// FF94
// 1402: limit font visibility (Windows, Mac, some Linux) [FF79+] - replaced by new 1402
   // [-] https://bugzilla.mozilla.org/1715507
   // user_pref("layout.css.font-visibility.level", 1);
// FF96
// 0302: disable auto-INSTALLING Thunderbird updates via a background service + hide the setting [FF90+] [WINDOWS]
   // [1] https://support.mozilla.org/kb/enable-background-updates-firefox-windows
   // [-] https://bugzilla.mozilla.org/1738983
user_pref("app.update.background.scheduling.enabled", false);
// FF97
// 7006: onions - replaced by new 7006 "allowlist"
   // [-] https://bugzilla.mozilla.org/1744006
   // user_pref("dom.securecontext.whitelist_onions", true); // 1382359
// FF99
// 6003: enforce CSP (Content Security Policy)
   // [1] https://developer.mozilla.org/docs/Web/HTTP/CSP
   // [-] https://bugzilla.mozilla.org/1754301
user_pref("security.csp.enable", true); // [DEFAULT: true]
// FF100
// 7009: disable HTTP2 - replaced by network.http.http2* prefs
   // [WHY] Passive fingerprinting. ~50% of sites use HTTP2 [1]
   // [1] https://w3techs.com/technologies/details/ce-http2/all/all
   // [-] https://bugzilla.mozilla.org/1752621
   // user_pref("network.http.spdy.enabled", false);
   // user_pref("network.http.spdy.enabled.deps", false);
   // user_pref("network.http.spdy.enabled.http2", false);
   // user_pref("network.http.spdy.websockets", false); // [FF65+]
// FF101
// 9211: Behavior when sending HTML message
   // (0=Ask, 1=Send as plain text, 2=Send as HTML anyway,
   // 3=Include both plain text and HTML message bodies in message)
   // Email that is HTML should also have plaintext multipart for plain text users.
   // [1] https://drewdevault.com/2016/04/11/Please-use-text-plain-for-emails.html
   // [-] https://bugzilla.mozilla.org/1727493
user_pref("mail.default_html_action", 1);
// 9213: Downgrade email to plaintext by default
   // [-] https://bugzilla.mozilla.org/1727493
user_pref("mailnews.sendformat.auto_downgrade", true);
// FF102
   // 0901: set when Thunderbird should prompt for the primary password
   // 0=once per session (default), 1=every time it's needed, 2=after n minutes (0902)
   // [-] https://bugzilla.mozilla.org/1767099
user_pref("security.ask_for_password", 2);
   // 0902: set how long in minutes Thunderbird should remember the primary password (0901)
   // [-] https://bugzilla.mozilla.org/1767099
user_pref("security.password_lifetime", 5); // [DEFAULT: 30]
   // 6007: enforce Local Storage Next Generation (LSNG) [FF65+]
   // [-] https://bugzilla.mozilla.org/1764696
user_pref("dom.storage.next_gen", true); // [DEFAULT: true FF92+]
// ***/

/* END: internal custom pref to test for syntax errors ***/
user_pref("_user.js.parrot", "SUCCESS: No no he's not dead, he's, he's restin'!");
