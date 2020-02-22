## Update 22-02##

* Bug of clicking on video play icon - ("first attempt failed") - fixed.
* Transcript component is getting input change [currentTranscriptObj]  - only ones there is a snippets at the exact curret player location (7 times total at 1 minute).
* Transcript component is now showing all chat history and combine user snippents if needed according to spec demands.

# ChorusPlayer

## build with latest angular cli (9.00)

## running the app##
start app by running "npm run start", then visit (e.g) =>
http://localhost:4200/?id=4d79041e-f25f-421d-9e5f-3462459b9934

## app design

 1. Video item component is the main container for the entire app.
 2. Video-item hold transcript component and player component.
 3. The player component can be quite flexible, custom controllers can be easily added.
 4. Player elements  are injected threw ng-content tags. Transcripts component is getting the exact relevant snippetObj at the relevant moment (.1 for accurence). In order to find both at the  video location and the transcript "cross points" (the location of movie where there is also need to show snippet).
 5. Layout is grid and flex based.
 6. No external libraries

*Important remark!* 
 Under the current given id, the transcript is seems like "not connected" with the mp4 given files (by client request).it seems like differents conversation (speaking totally different conversation)*HOWEVER*  the video mechanizem is not effected and work as expected.

## utils for work 

1.design - https://static.chorus.ai/angular-project-design/index.html [imgae : https://static.chorus.ai/images/chorus-logo.svg ]
 http://localhost:4200/?id=4d79041e-f25f-421d-9e5f-3462459b9934 

3.  clipId - 4d79041e-f25f-421d-9e5f-3462459b9934
4. Transcript - https://static.chorus.ai/api/4d79041e-f25f-421d-9e5f-3462459b9934.json 

        [ ## time property is for sorting only ##]
        [Cust #EE6EEF | Rep #00A7D1]

5. Source - https://static.chorus.ai/api/4d79041e-f25f-421d-9e5f-3462459b9934.mp4

