<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Response;

class GruposRequest extends Request
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
            
            'nombre'=>'required|regex:/[A-Za-z]{1}$/',
            'grado'=>'required',
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
