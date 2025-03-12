// Copyright (c) 2025 MyDesign99 LLC

// ----------------------------------------------------------------
//		EXPORTABLES
// ----------------------------------------------------------------
exports.getPersonalScore = getPersonalScore;
exports.getStudentScores = getStudentScores;
exports.getCourseName = getCourseName;
exports.getStudentName = getStudentName;

// ----------------------------------------------------------------

function getPersonalScore (userName)
{
   switch (userName.toLowerCase()) {
      case "betty" :
         return 95;
      case "billy" :
         return 50;
      case "john" :
         return 75;
      case "frank" :
         return 90;
      case "karen" :
         return 72;
   }

   return 0;
}

// ----------------------------------------------------------------

function getStudentName (studentID)
{
	switch (studentID.toString()) {
		case "1" :	return "Megan Blair";
		case "2" :	return "Conner Hendrix";
		case "3" :	return "Charlie Gordon";
		case "4" :	return "Taylor Wise";
		case "5" :	return "Ramona Benson";
		case "6" :	return "Desmond Liu";
		case "7" :	return "Kate Herrera";
		case "8" :	return "River Shepherd";
		case "9" :	return "Katalina Bass";
		case "10" :	return "Landen Mata";
		case "11" :	return "Lillie Boyle";
		case "12" :	return "Robin Garrett";
		case "13" :	return "Tessa Duarte";
		case "14" :	return "Scout Hanson";
		case "15" :	return "Jimmy Delgado";
		case "16" :	return "Alani Farmer";
		case "17" :	return "Cara Simon";
		case "18" :	return "Sadie Miller";
		case "19" :	return "Benjamin Bullock";
		case "20" :	return "Winnie Thomas";
	}
	return "Unknown";
}

	
function getStudentScores (studentID)
{
	switch (studentID.toString()) {
		case "1" :
			return {sp: 90, hist: 91, eng: 92, calc: 87, chem: 88, phys: 89};
		case "2" :
			return {sp: 94, hist: 95, eng: 94, calc: 94, chem: 95, phys: 94};
		case "3" :
			return {sp: 80, hist: 75, eng: 69, calc: 62, chem: 71, phys: 65};
		case "4" :
			return {sp: 99, hist: 99, eng: 99, calc: 99, chem: 99, phys: 99};
		case "5" :
			return {sp: 40, hist: 45, eng: 49, calc: 32, chem: 31, phys: 35};
		case "6" :
			return {sp: 88, hist: 87, eng: 88, calc: 92, chem: 91, phys: 92};
		case "7" :
			return {sp: 77, hist: 77, eng: 77, calc: 78, chem: 78, phys: 78};
		case "8" :
			return {sp: 80, hist: 75, eng: 69, calc: 62, chem: 71, phys: 65};
		case "9" :
			return {sp: 72, hist: 69, eng: 70, calc: 39, chem: 42, phys: 38};
		case "10" :
			return {sp: 90, hist: 92, eng: 93, calc: 85, chem: 88, phys: 82};
		case "11" :
			return {sp: 78, hist: 76, eng: 74, calc: 71, chem: 74, phys: 69};
		case "12" :
			return {sp: 80, hist: 77, eng: 75, calc: 99, chem: 94, phys: 96};
		case "13" :
			return {sp: 99, hist: 94, eng: 96, calc: 71, chem: 73, phys: 68};
		case "14" :
			return {sp: 66, hist: 55, eng: 53, calc: 48, chem: 48, phys: 44};
		case "15" :
			return {sp: 77, hist: 88, eng: 85, calc: 91, chem: 85, phys: 82};
		case "16" :
			return {sp: 68, hist: 69, eng: 68, calc: 65, chem: 64, phys: 65};
		case "17" :
			return {sp: 88, hist: 87, eng: 85, calc: 92, chem: 93, phys: 90};
		case "18" :
			return {sp: 62, hist: 65, eng: 66, calc: 68, chem: 69, phys: 66};
		case "19" :
			return {sp: 92, hist: 75, eng: 74, calc: 71, chem: 92, phys: 73};
		case "20" :
			return {sp: 99, hist: 98, eng: 97, calc: 81, chem: 82, phys: 80};
	}
	return {sp:0, hist: 0, eng: 0, calc:0, chem:0, phys:0};
}


function getCourseName (tag)
{
	switch (tag) {
		case "sp":
			return "Spanish 3";
		case "hist":
			return "AP US Hist";
		case "eng":
			return "AP Literature";
		case "calc":
			return "AP Calc A";
		case "chem":
			return "AP Chemistry";
		case "phys":
			return "Physics 1";
	}
	return "Unknown Course";
}
