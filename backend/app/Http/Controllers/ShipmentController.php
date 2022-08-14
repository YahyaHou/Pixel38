<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Shipment;

use Illuminate\Support\Facades\Auth;

use App\Models\User;

use Illuminate\Support\Facades\Validator;

class ShipmentController extends Controller
{



    // Function to get all user Shipments
    public function index()
    {
        // Checking the authenticated User
        if (Auth::check()){
            $user_id = Auth::user()->id;
            // getting shipments that belongs to authenticated user with its data
            $shipments = Shipment::where('user_id',$user_id)->with('users')->get();
            // checking if shipments exists
            if($shipments){
            return response()->json([
                'status' => 200,
                'data' => $shipments,
            ]);
            }
            return response()->json([
                'status'=>401,
                'data'=>Null
            ]);
        }
        else{
        return response()->json([
            'status'=>403,
            'message'=>"Not Authorized"
            ]);
        }

    }
    // end of get all user shipments function
    

    // Function to get One shipment
    public function get($id)
    {
        if(Auth::check()){
            // Finding the shipment By Id
        $shipment = Shipment::find($id);
        // Checking if shipment exist 
        if ($shipment) {
            return response()->json([
                'status' => 200,
                'data' => $shipment,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Shipment ID Found',
            ]);
        }
    }
    else
    {
        return response()->json([
            'status' => 403,
            'message' => 'Not Authorized',
        ]);
    }
    }
    // end of get one user shipments function


    // Function to add new SHipment
    public function store(Request $request)
    {

        if (Auth::check()){
            // Validating the inputs from user 
            $validator = Validator::make($request->all(), [
            'shipment_origin' => 'required|string',
            'destination' => 'required|string',
            'route' => 'required|string',
        ]);
        // Checking if validation fails 
        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ]);
        }
        
            $user_id = Auth::user()->id;
            // Creating Shipment for a specific and authenticated User
            $shipment = Shipment::create($request->all()+['user_id'=> $user_id]);
            // Saving the shipment in the data base after the request is done
            $shipment->save();
            return response()->json([
                'status' => 201,
                'message' => 'Shipment Added Successfully',
                'data' => $shipment,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>403,
                'message'=>"Not Authorized"
            ]);
        }
    }
         // end of Add new user shipments function


    // Function to edit the shipment Added
    public function update(Request $request, $id)
    {
        if (Auth::check()){
        
        $validator = Validator::make($request->all(), [
            'shipment_origin' => 'string',
            'destination' => 'string',
            'route' => 'string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ]);
        } else {
            // First find the shipment after validation is passed
            $shipment = Shipment::find($id);
            if ($shipment) {
                // if we can find it we will update the specific field or every field
                $user_id = Auth::user()->id;
                
                $shipment->update($request->all());
                
                $shipment->save();
                // getting the shipments after updating them
                $shipment = Shipment::where('user_id',$user_id)->get();
                
                return response()->json([
                    'status' => 201,
                    'message' => 'Shipment Updated Successfully',
                    'data' => $shipment,
                ]);
            } 
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Shipment ID Found',
                ]);
            }
        }
        }
        else
        {
            return response()->json([
                'status'=>403,
                'message'=>"Not Authorized"
            ]);
        }
    }    
     // end of edit user shipments function
    

    // Delete / Cancel The Shipment
    public function destroy($id)
    {
        if (Auth::check()){
        // First we find the shipment by id
        $shipment = Shipment::find($id);
        // if it's exist
        if ($shipment) {
            // Deleteing the shipment after finding it
            $shipment->delete();
            $user_id = Auth::user()->id;
            $shipments = Shipment::where('user_id',$user_id)->get();
            return response()->json([
                'status' => 200,
                'message' => 'Shipment Deleted Successfully',
                'data' => $shipments

            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Shipment ID Found',
            ]);
        }
        }
        else
        {
            return response()->json([
                'status'=>403,
                'message'=>'Not Authorized'
            ]);
        }
    }
    // end of deleting user shipments function

}
