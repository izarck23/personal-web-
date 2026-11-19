AUTHENTICATION SCREENS TEMPLATE — ISAAC, KENYA
HTML + CSS + vanilla JavaScript. No framework, npm or build step.

FILES
  index.html              Sign in (Google/Facebook buttons, remember me, show password)
  signup.html             Create account (strength meter, confirm password, terms)
  reset.html              Password reset request
  assets/css/styles.css   All styling. Colours and font at the top in :root
  assets/js/app.js        Validation, show/hide password, integration points
  assets/images/background.jpg   Background photo (replace with your own)

OPEN / TEST
  1. Extract the ZIP into its own folder.
  2. Double-click index.html, or run a local server:
     VS Code: "Live Server" extension -> Open with Live Server
     Termux:  pkg install python ; cd /path/to/folder ; python -m http.server 8000
     Acode:   open the folder and use the built-in preview
     Then visit http://localhost:8000

CUSTOMISE
  - Brand name: search for "workspace" in the three HTML files.
  - Colours: edit --brand, --ink, etc. in assets/css/styles.css.
  - Photo: replace assets/images/background.jpg (keep the same name) or edit the url() in .visual.
  - Layout: desktop = photo + form, tablet (<960px) = photo banner on top, mobile (<600px) = form only.

CONNECT A REAL BACKEND (required before publishing)
  These screens are a UI. They do not create accounts, sign users in, store passwords or send email.
  Open assets/js/app.js and edit:
    submitToBackend(formType, data)  -> call your auth API (Firebase Auth, Supabase, Auth0, your server)
    socialLogin(provider)            -> start Google / Facebook OAuth with that provider's SDK.
  Google: create an OAuth client in Google Cloud Console. Facebook: create an app at developers.facebook.com.
  Never store real passwords in HTML, localStorage or cookies.

LICENSE: see LICENSE.txt.
