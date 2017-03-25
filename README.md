**Gulp Template**
-----------------
This is a gulp template which I am currently using for web development.

**Feature**
- Minify javascript, css and images
- Deploy to Github page

**Install**
1. Install node.js
2. Install gulp packages
```
 npm install
```

(Option) Install gulp packages manually
```
sudo npm install gulp gulp-clean gulp-connect gulp-watch gulp-minify-css gulp-concat gulp-uglify gulp-imagemin gulp-livereload gulp-sourcemaps gulp-notify gulp-gh-pages --save-dev
```

**Folder Structure**
- Source : /src
- Destination : /server

**Usage**
- Run  (Access development web via http://locahost:8080)
```
npm start
```

- Build
```
npm build
```
- Deploy to Github Page
```
npm deploy
```

**License**

http://ccjeng.mit-license.org
