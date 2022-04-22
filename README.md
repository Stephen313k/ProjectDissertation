
<p align="center">
<h1 align="center">Quizzer
 </h1>

## Description

| Header | Description |
| --- | --- |
| `Author` | Stephen Kelly (G00361283) |
| `Course` | Software Development GA_KSOAG_H08 Y4  |
| `Module` | Applied Project and Minor Dissertation  |
| `Supervisor` | Dr Joseph Corr  |
| `Program` | Quizzer  |

## Project Context  
This project is aimed for those who love to learn and interact with another. Take fun quizzes, or send each other messages in customizable servers.

## Project  Features  
 - Users  can create an account  / Log into account. 
 - Users can join servers, invite people to servers
 - Users can create servers
 - Users can send messages, upload images
 - Users can take quizzes, review answers
 - Server admin can kick members

## Repository Overview

- quizzer : Contains all code for project developed ("quizzer/frontend" contains react development code)
- screencast-pdf : Dissertation in PDF form, and updated screencast video with audio (original video from a few days ago had no audio, i placed it in "original screencast no audio" for documentation my project was working at said time)
- README.md : The file you are viewing
- Requirements.txt: I have created a requirements "requirements.txt" file that contains all project dependencies for easy installation.

## Developmemt  Enviroment 

| Number | Software |
| --- | --- |
| 1 | Operating System - Windows 10  |
| 2 | Coding Enviroment- Visual Studio Code |
| 3 | Technologies - Python-Django, React, PostgreSql

__________________________________________________
## Before compiling
To compile this project you must have Python installed link below to install:
https://docs.djangoproject.com/en/1.8/howto/windows/

This project will not compile unless you have postgresql database installed on your pc. To bypass this and view the project with the basic SQLlite database 
go to 
1. (path:/projectdissertation/quizzer/quizzer/settings.py)
comment out from line 123 - 131 (disabling postgresql database)
2. and uncomment from line 119-122 (enabling sqllite database)
3. save files
___________________________________________________

## Compiling
1.Clone project from github
2.Open "Project Dissertation" in Visual Studio Code.
3.Open intergrated terminal and enter folder "quizzer" run: (cd quizzer)
5.Run following command: (path:/projectdissertation/quizzer: "pip install requirements")
6.Run following command: (path:/projectdissertation/quizzer: "python manage.py runserver")
7.Forward to "frontend" folder: (cd frontend)
7.Run following command: (path:/projectdissertation/quizzer/frontend: "npm run dev")
8.Open browser go to 127.0.0.1:8000
_____________________________________________________
## Running 
Depending on the broswer version you are on there could be a cors-header issue with fetching the quiz api (taking a quiz function) from a 3rd party website. This issue can be caused by the quality of the API created as it is a free to use one.

If the quiz function is not working you can install an extension on your browser.

Link for chrome extension: 
https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai

Link for firefox extension: 
https://addons.mozilla.org/en-US/firefox/addon/cross-domain-cors/

1. Install extension
2. Open the extention in the same browser
3. Ensure the button is enabled
3. In "Apply URL" text field paste in: https://opentdb.com/api.php
4. Click save
5. Refresh or go to 127.0.0.1:8000

