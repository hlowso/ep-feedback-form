# Setup
1. `git init & npm init`
2. `npm i --save typescript browserify tsify mithril ejs`
3. Include `-p [ tsify --project tsconfig.json ]` in your browserify command line options to build typescript files
4. Follow [these instructions](https://docs.netlify.com/forms/setup/#work-with-javascript-rendered-forms) to set up your dynamically rendered form with Netlify
5. Add `name="FIELD[]"` as an attribute to both the hidden form in your html file and the generated form in your javascript. Replace `FIELD` with the name of the field in your form