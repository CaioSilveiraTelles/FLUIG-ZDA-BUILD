function getUser(user){
	filter = new java.util.HashMap();
    filter.put("colleaguePK.colleagueId",user);
	usuario = getDatasetValues('colleague',filter);
    return usuario.get(0).get("login");
}