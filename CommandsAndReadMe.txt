Commands:

-npx create-next-app workops_frontend --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
-Steps to Create/initialize Git Repo:
	1)git config --global user.name {username}  OR git config --local user.name {username}
	2)git config --global user.email {email} OR 
 git config --local user.email {email}
	3)git init
        4)Create Repo on github account
	5)git remote add origin https://github.com/Sunil-1998/workops_frontend.git
If while Cloning/Pushing you are getting error of 'Repository not Found',then Open Control Panel from the Start menu.
Select User Accounts.
Select the "Credential Manager".
Click on "Manage Windows Credentials".
Delete any credentials related to Git or GitHub.
Once you deleted all then try to clone again.

<<<<<<< HEAD
Extra:- To change origin ,git remote set-url origin newRepoUrl ,where newRepoUrl=https://github.com/{userName}/{repoName}.git
=======
Extra:- To change origin ,git remote set-url origin newRepoUrl ,where newRepoUrl=https://github.com/{userName}/{repoName}.git

-To run the project: npm start

-npm install @material-ui/core
-npm install axios 
-Now to use bootstrap :- npm install react-bootstrap

then either do : npm install bootstrap and import it in index.js like import 'bootstrap/dist/css/bootstrap.min.css';   
	OR 
in index.htm that will be inside public folder,paste this command
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>

Also make sure you dont put className that collides with bootstarp class like for eg you shlould not use className="container" coz its already defined class in bootstrap so if you name it like this then all styling specified in cointainer class of bootstrap will be implemented on your element.So prevent using such names when you are using bootstarp in your project.

-To install react router:- 'npm install react-router-dom'

-npm install react-redux redux
>>>>>>> 9400c89e37a742bcb49daeedaf9595461db773ee
