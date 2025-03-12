// Copyright (c) 2025 MyDesign99 LLC

// ----------------------------------------------------------------
//		IMPORTS
// ----------------------------------------------------------------
const Url	  = require('node:url');
const MD99Auth= require ('./sdk/src/md99-auth/md99-auth');
const Data	  = require ('./data');

// ----------------------------------------------------------------
//		CONSTANTS
// ----------------------------------------------------------------
const publicKey = "";
const secretKey = "";
const assetName = "radial-demo";

// ----------------------------------------------------------------
//		EXPORTABLES
// ----------------------------------------------------------------
exports.singleImageFromGet = singleImageFromGet;
exports.personalImageFromGet = personalImageFromGet;
exports.studentArrayFromGet = studentArrayFromGet;

exports.singleImageFromPost = singleImageFromPost;
exports.personalImageFromPost = personalImageFromPost;
exports.studentArrayFromPost = studentArrayFromPost;

exports.isUrlMatch = isUrlMatch;
exports.getLastParam = getLastParam;

// ----------------------------------------------------------------
//		TOP-LEVEL ENTRY POINTS
// ----------------------------------------------------------------

function singleImageFromGet (value, urlCallback)			// callback format (url)
{
	MD99Auth.getMD99AuthToken (publicKey, secretKey, 
		function (success, token, errMsg) {
			if (! success) {
				console.log (errMsg);
				urlCallback (MD99Auth.errorImageURL ());
				return;
			}
			const url = MD99Auth.createImageURL (publicKey, token, value, assetName);
			urlCallback (url);
			return;
		}
	);
}


function personalImageFromGet (userName, urlCallback)			// callback format (url)
{
	const localValue = Data.getPersonalScore (userName);
	
	MD99Auth.getMD99AuthToken (publicKey, secretKey, 
		function (success, token, errMsg) {
			if (! success) {
				console.log (errMsg);
				urlCallback (MD99Auth.errorImageURL ());
				return;
			}
			const url = MD99Auth.createImageURL (publicKey, token, localValue, assetName);
			urlCallback (url);
			return;
		}
	);
}


function studentArrayFromGet (studentID, urlCallback)			// callback format (imageArrays)
{
	MD99Auth.getMD99AuthToken (publicKey, secretKey, 
		function (success, token, errMsg) {
			if (! success) {
				console.log (errMsg);
				urlCallback (MD99Auth.errorImageURL ());
				return;
			}
			const fullAr  = studentImages (studentID, publicKey, token, assetName);
			urlCallback (fullAr);
			return;
		}
	);
}


function singleImageFromPost (postParams, urlCallback)			// callback format (url)
{
	postObj = processPostParams (postParams);
	const missingParam = findMissingParam (postObj, ["value", "asset_name"]);
	if (missingParam != null) {
		console.log (missingParam);
		urlCallback (MD99Auth.errorImageURL ());
		return;
	}

	MD99Auth.getMD99AuthToken (publicKey, secretKey, 
		function (success, token, errMsg) {
			if (! success) {
				console.log (errMsg);
				urlCallback (MD99Auth.errorImageURL ());
				return;
			}
			const url = MD99Auth.createImageURL (publicKey, token, postObj.value, postObj.asset_name);
			urlCallback (url);
			return;
		}
	);
}


function personalImageFromPost (postParams, urlCallback)			// callback format (url)
{
	postObj = processPostParams (postParams);
	const missingParam = findMissingParam (postObj, ["user_name"]);
	if (missingParam != null) {
		console.log (missingParam);
		urlCallback (MD99Auth.errorImageURL ());
		return;
	}

	const localValue = Data.getPersonalScore (postObj['user_name']);
	
	MD99Auth.getMD99AuthToken (publicKey, secretKey, 
		function (success, token, errMsg) {
			if (! success) {
				console.log (errMsg);
				urlCallback (MD99Auth.errorImageURL ());
				return;
			}
			const url = MD99Auth.createImageURL (publicKey, token, localValue, assetName);
			urlCallback (url);
			return;
		}
	);
}


function studentArrayFromPost (postParams, urlCallback)			// callback format (imageArrays)
{
	postObj = processPostParams (postParams);
	const missingParam = findMissingParam (postObj, ["student_id"]);
	if (missingParam != null) {
		console.log (missingParam);
		urlCallback (MD99Auth.errorImageURL ());
		return;
	}

	MD99Auth.getMD99AuthToken (publicKey, secretKey, 
		function (success, token, errMsg) {
			if (! success) {
				console.log (errMsg);
				urlCallback (MD99Auth.errorImageURL ());
				return;
			}
			const fullAr  = studentImages (postObj ['student_id'], publicKey, token, assetName);
			urlCallback (fullAr);
			return;
		}
	);
}

// ----------------------------------------------------------------

function studentImages (studentID, publicKey, token, assetName)
{
	const allScores = Data.getStudentScores (studentID);
	
	var imgAr = {};
	for (let courseTag in allScores) {
		const oneScore   = allScores[courseTag];
		const imgUrl     = MD99Auth.createImageURL (publicKey, token, oneScore, assetName);
		const courseName = Data.getCourseName (courseTag);
		
		imgAr[courseName] = imgUrl;
	}

	return {"name": Data.getStudentName (studentID), "images": imgAr};
}


function courseScoreArray (publicKey, token, tag, score, courseName)
{
	var assetName = "unknown";
	switch (tag) {
		case "sp1":
		case "hist1":
		case "eng1":
		case "calc1":
		case "chem1":
		case "phys1":
			assetName = "Student Score";
			break;

		case "sp2":
		case "hist2":
		case "eng2":
		case "calc2":
		case "chem2":
		case "phys2":
			assetName = "Bar Percent";
			break;
	}

	const url = MD99Auth.createImageURL (publicKey, token, score, assetName);
	return {img_id: tag, score: score, url: url, course_name: courseName};
}


// ----------------------------------------------------------------
//		UTILITIES
// ----------------------------------------------------------------

function processPostParams (postParams)
{
	const decodedData = decodeURIComponent (postParams);
	
	var postObj = {dummy_param: 123};
	try {
		postObj = JSON.parse (decodedData);
	}
	catch (err) {
	}
	return postObj;
}


function findMissingParam (inputObj, paramNameAr)
{
	for (var i1 = 0; i1 < paramNameAr.length; i1++) {
		const paramName = paramNameAr[i1];
   	if (! inputObj.hasOwnProperty (paramName)) {
			return ("Missing param: " + paramName);
		}
	}
   return null;
}


function isUrlMatch (request, myPath)
{
	const pathOnly = Url.parse (request.url).pathname;
	
	var path1 = pathOnly.toLowerCase();
	var path2 = myPath.toLowerCase();
	
	path1 = stripBegEndSlash (path1);
	path2 = stripBegEndSlash (path2);

	if (path1 == path2)
		return true;
	
	reqAsArray  = path1.split('/').filter(segment => segment !== '');
	targAsArray = path2.split('/').filter(segment => segment !== '');
	
	if (reqAsArray.length != targAsArray.length)
		return false;
	
	for (let i1 = 0; i1 < reqAsArray.length; i1++) {
		if (reqAsArray[i1] != targAsArray[i1]) {
			if (targAsArray[i1] == "*int"  ||  targAsArray[i1] == "*text") {
				continue;
			}
			return false;
		}
	}
	return true;
}


function getLastParam (request)
{
	var pathAsString = Url.parse (request.url).pathname;
	
	pathAsString = pathAsString.toLowerCase();
	
	pathAsString = stripBegEndSlash (pathAsString);
	asArray  = pathAsString.split('/').filter(segment => segment !== '');
	
	if (asArray.length == 0)
		return "0";
	
	return asArray[asArray.length - 1];
}


function stripBegEndSlash (srcStr)
{
	if (srcStr.substr (0,1) == "/") {
		srcStr = srcStr.substr (1);
	}
	if (srcStr.substr (srcStr.length - 1) == "/") {
		srcStr = srcStr.substr (0, srcStr.length - 1);
	}
	return srcStr;
}


