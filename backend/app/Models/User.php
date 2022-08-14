<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Notifications\Notifiable;

use Laravel\Sanctum\HasApiTokens;

use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
     /* Here we used protected because it's a scope to make the variable or function to be visible in all
   classes that extend curren class which mean it is availble for its class and the one that extend it.
    ! we used fillable to specify that these columns in the table which is customers are allowed to be inserted  
    */ 
    protected $fillable = ['first_name','address','phone_number','email','password'];


    // ! Implementing the relation between the customer and his shipments the function is public in order to access it
    // ? we used hasMany that's because a user can have one or many shipments (1 to many);

    public function shipments(){
    
    return $this->hasMany(Shipment::class);
  
  }

  // JWT Functions

  public function getJWTIdentifier(){
    
    return $this->getKey();

  }
  
  public function getJWTCustomClaims(){
  
    return [];
  
  }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
