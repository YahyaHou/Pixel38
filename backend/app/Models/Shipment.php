<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;
    
    protected $fillable = ['shipment_origin','destination','route','user_id'];


    // ? in this function we are implementing the relation between user and shimpents which is many to one 
    // * or we can say it's many shipments belongs to 1 user

    public function users(){
         return $this->belongsTo(User::class,'user_id');
        // return $this->belongsTo(User::class);
    }

}
