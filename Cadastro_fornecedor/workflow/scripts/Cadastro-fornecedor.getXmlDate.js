function getXmlDate(stringDate){
	var xmlGregorian = "";
	var date = new java.util.Date();
	
	if(stringDate != ""){
		stringDate = stringDate.split("/");
		date.setDate(stringDate[0]);
		date.setMonth(Number(stringDate[1])-1);
		date.setYear(Number(stringDate[2])-1900);
	}	
	
	var calendar = new java.util.GregorianCalendar();
	calendar.setTime(date); 
	xmlGregorian = javax.xml.datatype.DatatypeFactory.newInstance().newXMLGregorianCalendar(calendar);

	
	return xmlGregorian;
}