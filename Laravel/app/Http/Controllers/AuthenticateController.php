<?php
namespace App\Http\Controllers;
use App\User;
use App\Alumno;
use App\Docente;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Exceptions\JWTException;
use Cache;

class AuthenticateController extends Controller
{
    public function authenticate(Request $request)
    {

        $existeBase = true;
        $isAdmin = $request->input('admin');
        $credentials = $request->only('email','password');

        try{
             $user_auxin= User::where('email', $request->email)->first();
         }catch(\PDOException $e){
                $existeBase = false;       
         }
        
         
         //print_r($user_auxin);
        

        if($isAdmin && !$existeBase){

            if (Cache::has('admin')) {
                
                $value = Cache::get('admin');

                 try {
             
                        $customClaims = ['rol' => $value->rol_id];
                        if (! $token = JWTAuth::fromUser($value, $customClaims)) {
                            return response()->json(['error' => 'invalid_credentials'], 401);
                        }
                    }catch (JWTException $e) {
                        return response()->json(['error' => 'could_not_create_token'], 500);
                    }

                      return response()->json(compact('token'));
       
                
            }else{
             $ad = User::where('email', 'rosario@hotmail.com')->first();
             
             Cache::forever('admin', $ad);

            }

        }else{

           
            $token="";
            $user_auxin= User::where('email', $request->email)->first();
             try {
             
             $customClaims = ['rol' => $user_auxin->rol_id];
                if (! $token = JWTAuth::attempt($credentials, $customClaims)) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            }catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }
       
        
        if($user_auxin){
            $student = Alumno::where('curp', $user_auxin->curp)->first();
           
            if($user_auxin->rol_id === 3){
                
                if($student->estatus === 1){

                     return response()->json(compact('token'));
                }

               
            }else{

                if($user_auxin->rol_id === 2){
                    $docente = Docente::where('idDocente', $user_auxin->id_user)->first();
                      

                        if($docente->estatus === 1){
                            return response()->json(compact('token'));
                        }

                }else{

                     return response()->json(compact('token'));
                }
                
            }
        }


        }
       
        
       
            
    }
        
    public function getAuthenticatedUser()
        {

            try{

                try {
                        if (! $user = JWTAuth::parseToken()->authenticate()) {
                            print_r($user);
                            return response()->json(['user_not_found'], 404);
                        }
                    } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                        return response()->json(['token_expired'], $e->getStatusCode());
                    } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                        return response()->json(['token_invalid'], $e->getStatusCode());
                    } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
                        return response()->json(['token_absent'], $e->getStatusCode());
                    }
                    return response()->json(compact('user'));


            }catch(\PDOException $e){
                 
                 if (Cache::has('admin')) {
                    $user = Cache::get('admin');
                    return response()->json(compact('user'));
                }
            }
            
        }
}