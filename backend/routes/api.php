<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/release',function (){
    // TODO:さすがにもう少し整える必要がある

    $APIKEY = env('PRTIMES_APIKEY');

    $companylist_base_url = 'https://hackathon.stg-prtimes.net/api/companies';

    $client = new GuzzleHttp\Client();
    $res = $client->request('GET',$companylist_base_url,[
        'headers' => array(
            'Accept' => 'application/json',
            'Authorization' => 'Bearer '. $APIKEY
        )
    ]);

    $companylist = json_decode($res->getBody(),true);

    $result = array();

    foreach ($companylist as $company){
        $address = $company['address'];

        $coordinate_reference_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'.urlencode($address).'.json';

        $mapbox_api_key = env('MAPBOX_APIKEY');


        $res = $client->request('GET',$coordinate_reference_url,[
            'query'=> array(
                'access_token'=>$mapbox_api_key
            )
        ]);

        $address_reference_origin = json_decode($res->getBody(),true);

        /*dd();
        dd($address_reference_origin);*/

        // とりあえず一致度の高い先頭のみを使用する
        try{
            $coordinate = $address_reference_origin['features'][0]['geometry']['coordinates'];
        }catch (Exception $exception){
            continue;
        }

        $company['coordinate'] = $coordinate;

        $result[] = $company;
    }

    return $result;
});
