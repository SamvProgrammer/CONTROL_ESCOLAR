<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Correo;
//require 'vendor/autoload.php';

class Correo extends Model
{
    public function checkEmail($correo, $user){
        $tabla=DB::select('SELECT users.rol_id AS rol, users.nombre, users.email FROM users WHERE users.email = ? AND users.rol_id = ?', [$correo, $user]);
        return $tabla;
    }
 
    public function comprobarEstadoEmailUsuario($identificador, $pass){
        $salida = '';
        $tabla = DB::select('SELECT users.id, users.password FROM users WHERE users.email = ' ."'$identificador'" .' AND users.estado=1');
        for ($i = 0; $i < count($tabla); $i++) {
            if(Hash::check($pass, $tabla[$i]->password)){
                $salida = $tabla[$i]->id;
            }
        }
        return $salida;
	}

	function decifrarClave($datos){
		$clave_cifrada = $datos[0]->clave_random;
		return $clave_normal;
	}

	public function getTokenToChangePassword($email, $user){
		$token = hash("sha512",$email .Time());
		$existe=DB::select('SELECT * FROM token_password WHERE token_password.correo = ? AND token_password.user = ?', [$email, $user]);
        if(!$existe){
                DB::insert('INSERT INTO token_password (user, correo, token) VALUES (?, ?, ?)', [$user, $email, $token]);
            }else{
                DB::update('UPDATE token_password SET token_password.token = ? WHERE token_password.correo = ? AND token_password.user = ?', [$token, $email, $user]);
            }
        
            $tabla=DB::select('SELECT token_password.token FROM token_password WHERE token_password.correo = ? AND token_password.user = ?', [$email, $user]);
        return $tabla;
	}

	public function comprobarTokenPassword($token){
		$tabla=DB::select('SELECT * FROM token_password WHERE token_password.token = ' ."'$token'");
		return $tabla;
	}
 
	public function changePassword($user, $correo, $newpassword){
    		$nom_tabla;
        $esRepetida = 0;
        switch ($user) {
            case 1:
                $nom_tabla = 'docente';
                $existe = DB::select('SELECT docente.password FROM docente WHERE docente.email = ? AND docente.estatus= 1', [$correo]);
                for ($i = 0; $i < count($existe); $i++) {
                  if(Hash::check($newpassword, $existe[$i]->password)){
                      $esRepetida = 1;
                  }
                }
                break;
            case 2:
                $nom_tabla = 'docente';
                $existe = DB::select('SELECT docente.password FROM docente WHERE docente.email = ? AND docente.estatus= 1', [$correo]);
                for ($i = 0; $i < count($existe); $i++) {
                  if(Hash::check($newpassword, $existe[$i]->password)){
                      $esRepetida = 1;
                  }
                }
                break;
            
            case 3:
                $nom_tabla = 'alumno';
                break;
        }
        if($esRepetida == 0){
          $newpassword = Hash::make($newpassword);
          DB::update('UPDATE ' .$nom_tabla .' SET password = ' ."'$newpassword'" .' WHERE email = ? AND idRol = ?', [$correo, $user]);

          DB::update('UPDATE users SET password = ' ."'$newpassword'" .' WHERE email = ? AND rol_id = ?', [$correo, $user]);

          $salida = array((object) array('nombres' => $nom_tabla, 'email'=> $correo));
        }else{
          $salida = 'contraseña repetida';
        }
        return $salida;
	} 

    function sendEmailwithBody($name, $correo, $tipo, $mensaje){
        $url = 'http://localhost/Control/Angular/';
        $cuerpo_inicio = 
              '<!DOCTYPE html>
              <html>
                 <head>
                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                 </head>
                 <body>
                    <div style="background-color: white">
                       <table>
                          <tr>
                             <td style="background-color: white; padding: 0">
                                
                             </td>
                          </tr>
                          
                          <tr>
                             <td style="background-color: white">
                                <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                                  <h2 align="center">SISTEMA DE CONTROL ESCOLAR ESC. PRIM. ROSARIO CASTELLANOS</h2>
                                   <h3 style="color: #e67e22; margin: 0px 10px 15px -30px"> Hola estimado(a) ' .$name .'</h3>';

            $cuerpo_fin = 
                '<p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">ROSARIO CASTELLANOS</p>
                                 </div>
                              </div>
                           </td>
                        </tr>
                     </table>
                  </div>
               </body>
            </html>';

        switch($tipo){ 
            case 'sendTokentoEmail': 
                $cuerpo_mensaje_token = 
                    '<p style="margin: 10px 100px 10px 10px; font-size: 15px justify">
                        <strong>solicitud de cambio de contraseña para:</strong>
                     </p>
                     <ul style="margin: 10px 100px 10px 10px; font-size: 20px justify">
                        <ol>Usuario: ' .$correo .'</ol>
                     </ul>
                     <p style="margin: 10px 100px 10px 10px; font-size: 15px justify"><strong>
                        copia la siguiente cadena de caracteres y regresa al sistema para comprobarlo.
                        </strong>
                     </p>
                     <br>
                     <div style="width: 100%; text-align: center">
                        <label>CADENA: </label>
                        <br>
                        <br>
                        <div style="width: 100%; text-align: center">
                          <textarea rows="4" cols="50">' .$mensaje .'</textarea>  
                        </div>';
                $cuerpo = $cuerpo_inicio .$cuerpo_mensaje_token .$cuerpo_fin;
                return Correo::sendEmail($name, $correo, $cuerpo, 'solicitud de contraseña');
            break;
            case 'sendNewPasswordtoEmail':
                $cuerpo_mensaje_newPassword = 
                    '<p style="margin: 10px 100px 10px 10px; font-size: 15px justify">
                        <strong>Mediante este correo, le notificamos que el  </strong>
                     </p>
                     <ul style="margin: 10px 100px 10px 10px; font-size: 20px justify">
                        <ol>Usuario: ' .$correo .'</ol>
                     </ul>
                     <p style="margin: 10px 100px 10px 10px; font-size: 15px justify"><strong>
                        ha cambiado la contraseña por la siguiente: </strong></p>
                     <br>
                     <div style="width: 100%; text-align: center">
                        <label>Contraseña:</label>
                        <br>
                        <br>
                        <h3><strong>' .$mensaje .'</strong></h3>
                        <br>'; 
                $cuerpo = $cuerpo_inicio .$cuerpo_mensaje_newPassword .$cuerpo_fin;
                return Correo::sendEmail($name, $correo, $cuerpo, 'nueva contraseña');
            break;
            
        }   
    }
    function sendEmail($name, $correo, $cuerpo, $asunto){
      $mail = new PHPMailer(true);
      try { 
            $cuenta = 'sgerosariocastellanos@gmail.com';
            $contra = '11161107';
            //Server settings
            $mail->isSMTP();//Habilitar SMTP
            //$mail->SMTPDebug = 4;
            $mail->Host = 'smtp.gmail.com';//Definir el host
            $mail->SMTPAuth = true;//Habilitar Autenticacion
            $mail->Username = $cuenta;//Correo/Username del que envia
            $mail->Password = $contra;//Password del correo del que envia
            $mail->SMTPSecure = 'ssl';//Definir el tipo de seguridad, para gmail es ssl
            $mail->Port = 465;//Definir el puerto, para gmail es el 465
            
            //$mail->Port = 587;

            //Configuracion del Destinatario
            $mail->setFrom($cuenta, 'SGERosarioCastellanos');
            $mail->addAddress($correo, $name);          // El segundo parametro es Opcionall
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');

            //Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

            //Contenido del cuerpo del correo
            $mail->isHTML(true);
            $mail->Subject = $asunto;
            
            //$mail->Body = file_get_contents('paginas/correo/cuerpoRestorePassword.html');
            $mail->Body = $cuerpo;
            //$mail->AltBody = file_get_contents('paginas/correo/
            //cuerpoRestorePassword.html');
            $mail->AltBody = $cuerpo;
            $mail->smtpConnect(
                array(
                    "ssl" => array(
                        "verify_peer" => false,
                        "verify_peer_name" => false,
                        "allow_self_signed" => true
                    )
                )
            );
            $mail->send();
            $salida = array((object) array('mensaje' => 'El correo ha sido enviado'));
        } catch (Exception $e) {
            $salida = array((object) array('mensaje' => "El correo no se pudo enviar -> " .$mail->ErrorInfo));
        }
        return $salida;
    }

}
