<?php  
	if(isset($_POST['color'])){
		addColor();
		// echo "ye";
	}else{
		echo "no";
	}
	function addColor(){
		   try{
				require("config.php");
			    $sql="INSERT INTO `ColorNotes` (`ColorCode`) VALUES (:colorCode)";
			    $stmt = $db->prepare($sql);
			    $stmt->bindParam(':colorCode', $_POST['color']);
			    $stmt->execute();
			  	$retval['message'] = 'success';
		   }catch(PDOException $e){
			   	$retval['message'] = 'error';
			   	$retval['data'] = $err->getMessage();
		   }
		   echo json_encode($retval);
	}
	   
?>