<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Response;

class MateriaRequest extends Request
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
            'nombre'=>'required',
            'grado'=>'required',
            'horas'=>'required|regex:/[0-9]{1}$/',
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
