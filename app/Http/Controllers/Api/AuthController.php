<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(signupRequest $request){
        $data = $request->validated();
        $user=User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bycrypt($data['password']),
        ]);
        $token=$user->createToken('main')->plainTextToken;
        return response(compact('user','troken'));
    }
    public function login(LoginRequest $request){
        $credentials=$request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message'=>'Provided email or password is incorrect'
            ],422);
        }
        $user=Auth::user();
        $token=$user->createToken('main')->plainTextToken;
        return response(compact('user','token'));
    }
    public function logout(Request $request){
        $user=$request->user();
        $user=$currentAccessToken()->delete();
        return response('',204);
    }
}
