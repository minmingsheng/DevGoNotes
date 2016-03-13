<?php 
	loadFont();
	function loadFont(){
		try{
			$sql = "SELECT `FontName`, `WebAddress`, `Notes`FROM `FontNotes`";

			require("config.php");

			$stmt = $db->query($sql);
			

			$retval['message'] = 'success';
			$retval['data'] = $Fontdata = $stmt->fetchAll( PDO::FETCH_ASSOC );
		}catch(PDOException $e){
			$retval['message'] = 'error';
			$retval['data'] =  $e->getMessage();
		}     
		echo json_encode($retval);
	}
 ?>
