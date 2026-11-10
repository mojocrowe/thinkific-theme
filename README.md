# Mojo Thinkific theme

This Thinkific Liquid theme follows the design system observed on
[mojocrowe.com](https://mojocrowe.com/) and its
[For You page](https://mojocrowe.com/individuals) on 9 November 2026.

## Design reference

- Avantt 600, sentence-case main headings: 36px desktop; 28px mobile section headings and 32px mobile banners. Uppercase Avantt 700 for buttons and small labels.
- PP Neue Montreal 400 body text, with 20px introductory copy and 16px interface copy.
- Black and white, light grey `#F1F1F1`, and electric blue `#2828D6`.
- Flat buttons with 5px corners, borderless rounded course cards, translucent white navigation, and a black footer.
- Visible keyboard focus, wrapping button labels, and reduced-motion support.

The bundled font files are used locally, with `font-display: swap`. The fallback logo is rendered black; an uploaded custom logo retains its original colours.

## Source and installation

`styles/mojo_design_system.scss.liquid` is the final brand layer, imported after the base theme and existing platform customisations. `manifest.json` supplies matching defaults and the Mojo preset. The final layer also applies core typography, button and card styling to sites with previously saved settings.

Upload `dist/thinkific-theme.zip` through Thinkific's custom theme import workflow. The archive contains only `.version`, `manifest.json`, `assets`, `layouts`, `pages`, `sections`, `snippets`, and `styles`, with no enclosing folder. It does not contain the local preview or development documentation. Importing or applying the theme has not been performed here.

Thinkific Site Builder still controls page content, images, section order, background selections, and section-specific colour overrides. Existing saved section settings are not migrated by changing manifest defaults. Choose the new palette in those sections where needed. Hero photography/video and the marketing site's page composition are content choices, not automatically substituted into learning pages.

Existing B2B/SSO, enrolment, checkout, account forms, navigation behaviour, and learning integrations are retained. The course-player navigation and certificate-panel visibility customisations are retained. Third-party learning dashboards receive scoped typography and card rules; platform-owned markup may need further adjustment after inspection.

## Verification

- Rendered the full style import tree with LiquidJS 10.21.0, then compiled with Dart Sass 1.80.7 and Bourbon 4.3.4.
- Fixed pre-existing Sass variable scope and mixed-unit `calc()` issues encountered by the full compilation.
- Inspected a representative local component fixture at desktop and 390px mobile widths, using the actual product-card Liquid snippet and compiled theme CSS. Checked overflow, button sizing, input sizing, and checkbox operation.
- Checked JSON parsing, preset/default consistency, font asset references, archive contents, and Git whitespace errors.

`dist/preview/index.html`, `theme.css`, and `desktop.jpg` are local review artifacts with sample content. The fixture is not a complete Thinkific renderer and does not exercise authentication, checkout, live course data, or third-party dashboard rendering. A final read-only check on a Thinkific site is recommended. No sandbox credentials were needed to modify or package the local theme; a sandbox URL and access would allow that final inspection without editing its theme.

## Thinkific verification after upload

Signed in with the supplied test account and inspected the live sign-in flow, program dashboard, profile form, certificates page, mobile menu, Unlocking Perspective journey, and Mojo Foundations journey. The Foundations journey and profile layout fit a 390px viewport without horizontal overflow. No profile settings or theme settings were changed on the site.

Version 1.0.126 adds local fixes based on that inspection:

- Apply the heading scale to account, password-reset and collection headings even when the site retains the previous heavy font settings.
- Ensure the more specific base navigation rule does not override the intended bold navigation weight.
- Render the logo white in the dark mobile menu.
- Apply the flat grey card treatment to the observed third-party program-card wrappers.

The revised stylesheet compiled successfully and its heading, navigation, logo and card rules were checked in the local browser fixture. These latest fixes have not yet been uploaded to Thinkific.

Opening Unlocking Perspective's first module successfully launched Thinkific's separate SCORM player. The embedded lesson has its own styling, outside this Liquid theme's scope; updating its typography requires editing and republishing the SCORM content. Lesson completion and checkout were not tested.

## Dashboard and pathway surfaces — version 1.0.127

The dashboard and Kapow pathways now share a light-grey `#F1F1F1` canvas and white cards with subtle `#DDDDDD` borders, 10px corners and no drop shadows. Dashboard card content has one consistent padding layer. The program overview uses a compact two-column layout on desktop and a stacked layout on mobile. Module cards share the same padding, heading scale and image corners; text module links use the same blue button styling as the theme. Progress accents use brand blue and the program label uses mint.

`styles/mojo_learning.scss.liquid` contains these integration rules. The plugin injects generated section-ID styles after the theme, including important utility rules. These overrides use the stable `#main-content` wrapper, plugin class names and narrowly scoped important declarations, avoiding generated section IDs. Saved section colours no longer make dashboard cards disappear into their page background.

Checked the uploaded dashboard and pathway elements, then rendered local read-only copies of their markup with the captured plugin CSS loading after the new theme CSS. Verified grey canvas/white card contrast, borders, shadow removal, blue module buttons, and layouts at desktop, 768px tablet and 390px mobile widths. No horizontal overflow was observed. These local fixtures do not run plugin scripts, so they verify presentation and cascade rather than runtime progress behaviour. No theme or program settings were changed on Thinkific. Version 1.0.127 needs to be uploaded to apply these changes.

## Configurable learning backgrounds

Under theme settings → Colors → Background, **Dashboard page** controls the dashboard canvas and its banner backgrounds. **Program page** controls the learning-pathway canvas and banner backdrop. Both default to `#F1F1F1`. White card surfaces remain unchanged. Existing sites without saved values for these new settings fall back to the same grey until a colour is chosen. The scoped plugin overrides now consume these settings instead of fixed background colours.

## Theme-level audit changes — version 1.0.130

This version supersedes the earlier border and mint-colour choices described in the history above. No SCORM player or lesson content changes are included.

- Dashboard layout uses three columns on desktop, two from 768–1023px and one below 768px. Scoped CSS overrides the plugin's Bootstrap column widths without modifying the plugin itself. Filtering, pagination, access conditions and existing links remain owned by the plugin.
- **Colors → Background → Dashboard heading area** defaults to white, independently of **Dashboard page** and **Program page**. The heading area's spacing is reduced.
- Dashboard and pathway cards have no borders or hover shadows. Dashboard titles remain black on hover and focus. Keyboard focus outlines remain visible on links. Cards show full descriptions with aligned **View program** actions.
- Pathway badges use neutral grey and progress accents use blue. Module buttons use blue with black hover states. The theme no longer supplies mint hover colours, and the tertiary default palette is neutral grey.
- Program overviews offer **Start program** only when the plugin reports zero completed modules; otherwise they offer **View modules**, linking to the module list. A resume position is not inferred. No duration or completion data is fabricated.
- `assets/learning-experience.js` enhances asynchronously rendered cards and pathways, labels thumbnail links, numbers module links, and removes the existing B2C suffix. It replaces the previous one-shot accessibility/title scripts in the theme include.
- Mobile account pages have a section selector above their forms. Mobile menus support Escape, focus wrapping, background inertness and a 44px toggle.
- Sign-in uses username/current-password autofill hints and a Show/Hide password control. Password recovery has a descriptive submit label and document title.
- **Learner support** settings configure a help link in the footer. Certificate and order-history empty states offer additional context. The portal entry page uses clear learning-portal copy and removes the blurred background graphic.

Verification: full Liquid/Sass compilation; parsing of modified templates with Thinkific-only tags excluded; JavaScript syntax and DOM interaction checks; local browser checks using the captured plugin markup and CSS at desktop, 768px tablet and 390px mobile widths. At 768px the cards measured about 336px each; mobile used one column, and desktop used three. Checked white heading/grey canvas, zero card borders, unchanged black title text on focus, neutral/blue program accents, readable overview actions, mobile menu Escape and the account selector. No horizontal overflow was observed in these fixtures. Runtime filtering/pagination and real enrolment/progress state still require a check after upload to Thinkific. Local fixtures use a stand-in for Thinkific's existing menu toggle and do not run the plugin's scripts.

## Responsive verification and uppercase titles — version 1.0.131

Checked the uploaded v1.0.130 theme on learn.mojocrowe.com at 1280px desktop, 768px tablet and 390px mobile. Dashboard columns resolved to three, two and one respectively, with no horizontal overflow. Cards remained borderless, actions aligned, and the white heading area stayed distinct from the grey page. Both programs exposed valid Start program destinations and neutral/blue accents. Checked pathway responsiveness, mobile menu Escape, account-selector navigation to Certificates, sign-in, password visibility and autofill hints. No configuration or profile changes were made on the sandbox.

This local update adds CSS uppercase styling to dashboard card titles, standard theme card names, pathway module-card titles and the pathway program heading. Stored titles and descriptive link labels retain their original text. Full stylesheet compilation passed. The local captured-markup preview confirmed uppercase styling and wrapping at 768px and 390px without horizontal overflow. Upload v1.0.131 to apply the title styling; it is not yet present on the sandbox.

Remaining considerations: the three-column desktop grid leaves one spare column when only two programs are enrolled; an adaptive two-card presentation is optional. Real progress, completed/locked module states and certificate issuance still require test data beyond the account's current zero-completion state. SCORM changes remain deferred.

## Card buttons and landing restoration — version 1.0.132

Dashboard View program buttons, pathway module buttons, the pathway overview action and primary buttons inside standard cards now use black backgrounds with white text and blue hover/focus states, matching the marketing card-button treatment. Other primary buttons retain their existing styling.

Restored `sections/mojo_landing_cta.liquid` byte-for-byte from the original repository version: the original heading and signed-in/signed-out CTA copy are retained. Removed the later home-page override that hid the blurred Mojo background image and changed the landing layout. The unchanged base home stylesheet supplies the original image and layout again. Full theme compilation and JavaScript syntax checks passed. No sandbox edits were performed; upload this version to apply the changes.

## Verified marketing button states and program title — version 1.0.133

Read the current marketing site's button CSS from its loaded stylesheets on `/individuals`. The black variant's hover/active background is `#707070` with white text. The primary blue variant's hover/active background is `#D1E7FF` with `#2828D6` text. The theme now uses these colours for the shared variants, dashboard and pathway card CTAs, standard card CTAs and the more-specific header CTA rule. Removed the previously added colour transition to match the marketing buttons' immediate state changes. Keyboard focus outlines are retained, with the same state colours applied on focus.

The pathway program heading is now Avantt weight 700 on all breakpoints. Uppercase styling remains in place.

Checked the uploaded v1.0.132 sandbox at 1280px desktop, 768px tablet and 390px mobile: the original landing image and copy are restored, dashboard/pathway CTA defaults are black with white text, and no horizontal overflow was observed. The hover mismatch was confirmed against the marketing CSS. The v1.0.133 local preview returned computed focus colours (shared with hover rules) of `rgb(112,112,112)`/white for black buttons and `rgb(209,231,255)`/`rgb(40,40,214)` for blue buttons; the program heading computed to weight 700, including mobile. Full stylesheet compilation and archive checks passed. Upload v1.0.133 to apply the hover and font-weight corrections; these latest corrections are not yet on the sandbox.

## Pathway overview action removed — version 1.0.134

Removed the theme-added Start program / View modules action from pathway overviews, including its creation logic and unused styles/anchor setup. Original per-module links and the dashboard View program buttons remain. Includes v1.0.133's verified marketing hover colours and weight-700 uppercase pathway program title. No SCORM changes.

## Program overview alignment — version 1.0.135

Removed the program badge completely, including its empty wrapper spacing. Removed the heading row's Bootstrap horizontal gutters so the program title aligns with the description while preserving the card's outer padding. The CSS hides the badge before the dynamic enhancement removes it from the DOM. Weight 700 and uppercase titles are retained.

## Dashboard-only card actions — version 1.0.136

Restricted the View program card enhancement to the exact `/enrollments` pathname (also accepting `/enrollments/`, query strings and fragments). Shared cards on collection, custom and other pages no longer receive these injected buttons. Pathway and account enhancements remain independent of this route guard.

## Consistent navigation height — version 1.0.137

Measured the marketing site's navigation at about 51.9px on desktop and 54px on mobile. The theme now uses a 52px header minimum above 768px and 54px at or below 768px. The inner container and wrapper share matching minimum heights (allowing for the header's 1px bottom border), with zero vertical padding and centred contents. This prevents signed-out links and signed-in avatars from producing different bar heights while retaining a minimum rather than clipping oversized content.

Full stylesheet compilation passed. Local browser fixtures with signed-in and signed-out header contents both measured 52px at 1280px, 54px at 768px and 54px at 390px. Upload v1.0.137 to apply the change.
