<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=> 'required|min:5',
            'email'=> 'required|email|unique:users',
            'password'=>'required',
        ]);

        // This will return validator errors

        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors()
            ],400);
        }

        // Now save user info in database
        $user = new User();
        $user->name = $request->name;
        $user->email =  $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'status'=>200,
            'message' => 'User registerd successfully'
        ],200);
    }

    public function  authenticate(Request $request){

        $validator = Validator::make($request->all(),[
            'email'=> 'required|email',
            'password'=>'required',
        ]);

        // This will return validator errors
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors()
            ],400);
        }

        // Now check user credentials
        $user = User::where('email',$request->email)->first();

        if(!$user || !Hash::check($request->password,$user->password)){
            return response()->json([
                'status'=>401,
                'message' => 'Invalid email or password'
            ],401);
        }

        // Generate token for user
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status'=>200,
            'message' => 'Login successful',
            'token' => $token
        ],200);
    }
    
}
