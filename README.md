# outfitMatcher
COMP 4601 Final Project. Recommend outfits based on previous selections. Uses association rules. 

Components 
- crawler (Eclipse Java project)
  - crawls the web for image urls of clothing 
  - set up:
 0. Start MongoDB with terminal command 'mongod'
 1. Run BasicCrawlerController.java as Java application
- application (server and front end)
  - Includes website to pick clothing on and server that serves site 
  - set up:
 0. Start MongoDB with terminal command 'mongod'
 1. npm install
 2. for f in seed/*.js; do node "$f"; done
 3. npm start
 4. <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>
 5. admin@admin.com / admin
