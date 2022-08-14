<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Validator;

use App\Models\User;

use Illuminate\Support\Facades\Auth;

use JWTAuth;

use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller

{
    // * Login Function that allow user login to our System

    public function login(Request $request){
        // making request only for email and password
        $credentials = $request->only('email', 'password');
        try {
        // we are checking if there is not token after attempting credentials with JWTAuth middleware
        if (! $token = JWTAuth::attempt($credentials)) {
                           return response()->json(['error' => 'invalid_credentials'], 400);
                           }
                   } catch (JWTException $e) {
                       return response()->json(['error' => 'could_not_create_token'], 500);
                   }
                   // here we adding the token to the response after logged in
                   return response()->json(compact('token'));
              }
        
           // * Register Function that allow a user to register for an account

           public function register(Request $request){
           // First we are validating the requests with validator 
            $validator = Validator::make($request->all(), [
           
                'first_name'=>'required|string|max:100',
                'address'=>'required|string|max:100',
                'phone_number'=>'required|string|max:100',
                'email' => 'required|string|email|max:255|unique:users',   
                'password' => 'required|string|min:6']);

                // checking if validation fails
                if($validator->fails()){

                    return response()->json($validator->errors()->toJson(), 400);}
                    // if everything is okay we will create user 
                    $user = User::create([

                        'email' => $request->get('email'),
                        'first_name' => $request->get('first_name'),
                        'address' => $request->get('address'),
                        'phone_number' => $request->get('phone_number'),
                        /* here we are hashing password with laravel built in
                        function in order to not store password plain text
                        */'
                        password' => Hash::make($request->get('password')),]);

                        /*here in token variable hold the instance of JWT tymon auth jwtSubject 
                        function that are included in user Model
                        */
                        $token = JWTAuth::fromUser($user);
                        // returning the response with user data plus token created
                    return response()->json(compact('user','token'),201);}


                
                // ? Getting Authenticated user info from Auth built in laravel function
                public function userInfo(){
                    $user = Auth::user();
                    return response()->json([
                        'status'=>200,
                        'data'=>$user,
                    ]);
                }
                
                // * Logout function 
                public function logout(){
                    Auth::logout();
                    return response()->json([
                        'status'=>200,
                        'message'=>"Logged Out Successfully"
                    ]);
                }
        
}
