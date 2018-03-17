<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;
use Illuminate\Support\Facades\Response;

class MailController extends Controller
{
     public function basic_email($email){


    	$user= User::where('email',$email)->first();
    	
		$beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
		
    	$beautymail->send('enviar', ['user' => $user], function($message) use ($user){
        $message
			->from('sgerosariocastellanos@gmail.com')
			->to($user->email, $user->nombre.' '.$user->apPaterno)
			->subject($user->nombre.', Bienvenido(a) al sistema');
    	});

    	 return Response::json(['response' => 'Enviado al correo'],200);

    }
}
