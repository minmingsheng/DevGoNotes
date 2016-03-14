<?php
header('Content-Type:application/json');
try {
	 require("config.php");      
	$sql = "UPDATE `todolist` SET `todo` = :todo, `time` = :time WHERE `todo` = :todot";
	$statement = $db->prepare( $sql );
	$statement->bindParam( ':todo', $_POST['todo'] );
	$statement->bindParam( ':time', $_POST['time'] );
	$statement->bindParam( ':todot', $_POST['todot'] );
	$statement->execute();
	$retval['message'] = 'success';

} catch( PDOException $err ) {
	$retval['message'] = 'error';
	$retval['data'] = $err->getMessage();
}

echo json_encode( $retval );


