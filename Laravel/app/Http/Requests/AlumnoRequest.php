<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Response;

class AlumnoRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bools
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //'curp' => 'required',
            'nombres' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚÑ\s]{4,20}$/',
            'apPaterno' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚÑ\s]{4,20}$/',
            'apMaterno' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚÑ\s]{4,20}$/',
            'colonia' => 'required',
            'calle' => 'required',
            'alergias' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚ\s]{4,50}$/',
            'nombreTutor' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚ\s]{4,50}$/',
            'numTel' => 'required|regex:/[0-9]{7,10}$/',
            'email' => 'required',
            'password'=> 'required|regex:/[A-Za-z0123456789\!\@\#\-\_\&\*\+\.]{8,20}$/',
            'edad'=>'required',

        ];
    }

    public function messages(){
        return [

       
       
        ];
    }

     public function response(array $errors)
    {

        return Response::json($errors, 400);
    }
}
