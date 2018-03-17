<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Response;

class DocenteRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
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
            'rfc' => 'required|regex:/[A-Za-z0-9\s]{12,13}$/',
            'nombres' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚÑ\s]{4,20}$/',
            'apPaterno' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚÑ\s]{4,20}$/',
            'apMaterno' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚÑ\s]{4,20}$/',
            'numTel' => 'required|regex:/[0-9]{7,10}$/',
            'email' => 'required',
            'password'=> 'required|regex:/[A-Za-z0123456789\!\@\#\-\_\&\*\+\.]{8,20}$/',
            'colonia' => 'required',
            'calle' => 'required',
            'alergias' => 'required|regex:/[A-Za-záéíóúñÁÉÍÓÚ\s]{4,50}$/',
            

            //
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
