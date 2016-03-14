<?php 
if(!isset($_POST["todo"]) || !isset($_POST["time"])){
	echo "no";
}else{
	addFont();
}
function addFont(){
	try{
	require("config.php");
	$sql = "INSERT INTO `todolist` (`todo`,`time`) VALUES (:todo, :time )";
	$stmt = $db->prepare($sql);
	$stmt->bindParam(':todo', $_POST["todo"]);
	$stmt->bindParam(':time', $_POST["time"]);
	$stmt->execute();
	$retval['message'] = 'success';
}catch(PDOException $e){
	$retval['message'] = 'error';
	$retval['data'] = $e->getMessage();
}
echo json_encode($retval);
}
?>