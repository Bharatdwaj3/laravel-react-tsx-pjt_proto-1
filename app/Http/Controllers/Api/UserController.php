<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index(){
        return UserResource::collection(User::query()->orderBy('id','desc')->paginate(10));
    }
    public function store(StoreUSerRequest $request){
        $data=$request->validated();
        $data['password']=bycrypt($data['password']);
        $user=User::create($data);

        return response(new USerResposne($user),201);
    }
    public function show (USer $user){
        return new USerResource($user);
    }

    public function update(UpdateUserRequest $request, USer $user){
        $data=$request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }
     public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }
}
