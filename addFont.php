<?php 
if(!isset($_POST["name"]) ||!isset($_POST["address"]) ||!isset($_POST["notes"])  ){
	echo "no"."<br/>";
	echo $_POST["name"]."<br/>";
	echo $_POST["address"]."<br/>";
	echo $_POST["notes"]."<br/>";
}else{
	addFont();

}
function addFont(){
	try{
	require("config.php");
	$sql = "INSERT INTO `FontNotes` (`FontName`,`WebAddress`,`Notes`) VALUES (:FontName, :WebAddress, :FontNotes )";


	$stmt = $db->prepare($sql);

	$stmt->bindParam(':FontName', $_POST["name"]);
	$stmt->bindParam(':WebAddress', $_POST["address"]);
	$stmt->bindParam(':FontNotes', $_POST["notes"]);

	$stmt->execute();
	$retval['message'] = 'success';
}catch(PDOException $e){
	$retval['message'] = 'error';
	$retval['data'] = $err->getMessage();
	
}
echo json_encode($retval);
}


?>