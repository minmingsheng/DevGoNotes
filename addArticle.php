<?php 
if(!isset($_POST["name"]) || !isset($_POST["text"])){
	echo "no";
}else{
	addFont();
}
function addFont(){
	try{
	require("config.php");
	$sql = "INSERT INTO `Article`(`ArticleName`, `Texts`) VALUES (:name, :text)";
	$stmt = $db->prepare($sql);
	$stmt->bindParam(':name', $_POST["name"]);
	$stmt->bindParam(':text', $_POST["text"]);
	$stmt->execute();
	$retval['message'] = 'success';
}catch(PDOException $e){
	$retval['message'] = 'error';
	$retval['data'] = $e->getMessage();
}
echo json_encode($retval);
}
?>