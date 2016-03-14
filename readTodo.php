<?php 
    try{
        $sql = "SELECT `todo`, `time`FROM `todolist`";
        require("config.php");                                    
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll( PDO::FETCH_ASSOC );
        $retval["message"] ="success";
        $retval["data"] = $data;
    }catch(PDOException $e){
        $retval["message"] ="success";
        $retval["message"] =$e->getMessage();
    }     
    echo json_encode($retval);
 ?>