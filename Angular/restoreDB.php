<?php
include './Connet.php';
$dbHost     = 'localhost';
        $dbUsername = 'root';
        $dbPassword = '';
        $dbName     = 'bdcontrol';
        //$filePath   = 'C:/xampp/htdocs/Control/Angular/bdcontrol.sql';
    // Connect & select the database
    $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
echo'<title>Restore & backup para windows y linux</title>'; 
if (!isset ($_FILES["ficheroDeCopia"])) 
{ 
$contenidoDeFormulario="<form action='restoreDB.php' method='post' enctype='multipart/form-data' name='formularioDeRestauracion'"; 
$contenidoDeFormulario.="id='formularioDeRestauracion'>\n"; 
$contenidoDeFormulario.="<table width='360' border='0' align='center' class='normal' cellspacing='7'>\n"; 
$contenidoDeFormulario.="<tr>\n"; 
$contenidoDeFormulario.="<td colspan='4' align=center>Indique el origen del archivo de copia: </td>\n"; 
$contenidoDeFormulario.="</tr>\n"; 
$contenidoDeFormulario.="<td colspan='2' align=center><input type='file' name='ficheroDeCopia' id='ficheroDeCopia'"; 
$contenidoDeFormulario.="size='30'></td>\n"; 
$contenidoDeFormulario.="<tr>\n"; 
$contenidoDeFormulario.="<td colspan='3' align='center'><input name='envio' type='submit' "; 
$contenidoDeFormulario.="id='envio' value='[ Aceptar ]'></td>\n"; 
$contenidoDeFormulario.="</tr>\n"; 
$contenidoDeFormulario.="</tbody>\n"; 
$contenidoDeFormulario.="</table>\n"; 
$contenidoDeFormulario.="</form>\n"; 
echo ($contenidoDeFormulario); 
} 
 else  
 { 
 $archivoRecibido=$_FILES["ficheroDeCopia"]["tmp_name"]; 
 $destino="./ficheroParaRestaurar.sql"; 
     
if (!move_uploaded_file ($archivoRecibido, $destino)) 
{ 
$mensaje='EL proceso ha fallado'; 
echo $mensaje; 
} 


$restorePoint=SGBD::limpiarCadena($_POST['restorePoint']);
$sql=explode(";",file_get_contents($restorePoint));
$totalErrors=0;
set_time_limit (60);
//$con=mysqli_connect(SERVER, USER, PASS, BD);
$db->query("SET FOREIGN_KEY_CHECKS=0");
for($i = 0; $i < (count($sql)-1); $i++){
    if($con->query($sql[$i].";")){  }else{ $totalErrors++; }
}
$db->query("SET FOREIGN_KEY_CHECKS=1");
$db->close();
if($totalErrors<=0){
    echo "Restauración completada con éxito";
}else{
    echo "Ocurrio un error inesperado, no se pudo hacer la restauración completamente";
}



     
} 

/*
	//function restoreDatabaseTables(){
		$dbHost     = 'localhost';
		$dbUsername = 'root';
		$dbPassword = '';
		$dbName     = 'bdcontrol';
		$filePath   = 'C:/xampp/htdocs/Control/Angular/bdcontrol.sql';
    // Connect & select the database
    $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName); 

    // Temporary variable, used to store current query
    $templine = '';
    
    // Read in entire file
    $lines = file($filePath);
    
    $error = '';
    
    // Loop through each line
    foreach ($lines as $line){
        // Skip it if it's a comment
        if(substr($line, 0, 2) == '--' || $line == ''){
            continue;
        }
        
        // Add this line to the current segment
        $templine .= $line;
        
        // If it has a semicolon at the end, it's the end of the query
        if (substr(trim($line), -1, 1) == ';'){
            // Perform the query
            if(!$db->query($templine)){
                $error .= 'Error performing query "<b>' . $templine . '</b>": ' . $db->error . '<br /><br />';
            }
            
            // Reset temp variable to empty
            $templine = '';
        }
    }
    return !empty($error)?$error:true;
//}
*/

?>
