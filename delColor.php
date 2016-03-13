<?php 
	if(isset($_POST["ColorCode"])){
		delColor();
	}else{
		echo "no";
	}
	function delColor(){

		try {
			require("config.php");
			$sql = "DELETE FROM `ColorNotes` WHERE `ColorCode` = :ColorCode";
			$statement = $db->prepare( $sql );
			$statement->bindParam( ':ColorCode', $_POST['ColorCode'] );
			$statement->execute();
			$retval['message'] = 'success';
		} catch( PDOException $err ) {
			$retval['message'] = 'error';
			$retval['data'] = $err->getMessage();
		}

		echo json_encode($retval);
	}
 ?>