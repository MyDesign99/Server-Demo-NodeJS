// Copyright (c) 2025 MyDesign99 LLC

const http			= require ('http');
const Controller	= require ('./controller');

const port     = 3000;

const getPath1  = 'get/imageurl/*INT';
const getPath2  = 'get/customer/*TEXT';
const getPath3  = 'student/images/*INT';
const postPath1 = 'api/get/imageurl';
const postPath2 = 'api/personal/imageurl';
const postPath3 = 'api/student/images';

// -----------------------------------------------------------

var server = http.createServer (function (request, response) 
{
	if (request.method == 'GET') {
		var matchFound = false;
		
		if (Controller.isUrlMatch (request, getPath1)) {
			matchFound = true;
			const value = Controller.getLastParam (request);
			
			Controller.singleImageFromGet (value, 
				function (url) {
					sendPlainHtml (response, url);
				}
			);
		}

		if (Controller.isUrlMatch (request, getPath2)) {
			matchFound = true;
			const userName = Controller.getLastParam (request);

			Controller.personalImageFromGet (userName, 
				function (url) {
					sendPlainHtml (response, url);
				});
		}

		if (Controller.isUrlMatch (request, getPath3)) {
			matchFound = true;
			const studentID = Controller.getLastParam (request);

			Controller.studentArrayFromGet (studentID, 
				function (urlArray) {
					sendArrayAsPlainHtml (response, urlArray);
				});
		}
		
		if (! matchFound) {
			sendPlainHtml (response, "Unknown GET request");
		}
	}
	
	if (request.method == 'POST') {
		var postBody = "";
		request.on ('data', function(data) {
			postBody += data;
		})
		
		request.on ('end', function() {
			if (Controller.isUrlMatch (request, postPath1)) {
				Controller.singleImageFromPost (postBody, 
					function (url) {
						sendPlainHtml (response, url);
					});
			}

			if (Controller.isUrlMatch (request, postPath2)) {
				Controller.personalImageFromPost (postBody, 
					function (url) {
						sendPlainHtml (response, url);
					});
			}

			if (Controller.isUrlMatch (request, postPath3)) {
				Controller.studentArrayFromPost (postBody, 
					function (urlArray) {
						sendArrayAsPlainHtml (response, urlArray);
					});
			}
		});
	} 
});


function sendPlainHtml (responseObj, theText)
{ 
	responseObj.writeHead (200, {"Content-Type": "text/plain"});
   responseObj.end (theText);
}

function sendArrayAsPlainHtml (responseObj, theArray)
{ 
	const theText = JSON.stringify (theArray);
	sendPlainHtml (responseObj, theText);
}

// -----------------------------------------------------
// -----------------------------------------------------

server.listen (port);
console.log ("MD99-http Server Demo is listening on port " + port);
