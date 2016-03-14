<?php 
	if(isset($_POST["todo"])){
		delColor();
	}else{
		echo "no";
	}
	function delColor(){

		try {
			require("config.php");
			$sql = "DELETE FROM `todolist` WHERE `todo` = :todo";
			$statement = $db->prepare( $sql );
			$statement->bindParam( ':todo', $_POST['todo'] );
			$statement->execute();
			$retval['message'] = 'success';
		} catch( PDOException $err ) {
			$retval['message'] = 'error';
			$retval['data'] = $err->getMessage();
		}

		echo json_encode($retval);
	}
 ?>