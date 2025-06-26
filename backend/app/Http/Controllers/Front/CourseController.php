<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(){

    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'title' =>'required|min:5'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ]);
        }

        $course = new Course();
        $course->title = $request->input('title');
        $course->status = 0;
        $course->user_id = $request->user()->id;
        $course->save();

        return response()->json([
            'status' => 200,
            'message' => 'Course created successfully',
        ],200);
    }
}
