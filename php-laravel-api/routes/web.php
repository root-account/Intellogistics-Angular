<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


// $router->post('/login',['middleware' => 'auth', 'uses' => 'UsersController@authenticate']);

// Login Admin
$router->post('/login','UsersController@authenticate');
$router->post('/newadmin','UsersController@register_admin');

// Login Customers
$router->post('/login-customer','CustomersController@authenticate');
$router->post('/new-customer','CustomersController@register_customer');

// Qoutes
$router->get('/qoutes', 'QoutesController@listQoutes');
$router->get('/transactions', 'QoutesController@getTransactions');
$router->get('/single-qoute/{waybill}', 'QoutesController@getSingleQuote');
$router->post('/newqoute', ['uses' => 'QoutesController@insertQoute']);
$router->put('/updateqoute/{waybill}', ['uses' => 'QoutesController@updateQoute']);
$router->delete('/deleteqoute/{id}', 'QoutesController@deleteQoute');
$router->get('/usertransactions/{userid}', 'QoutesController@getUserTransactions');
$router->get('/userqoutes/{userid}', 'QoutesController@UserListQoutes');
$router->get('/track-waybill/{waybill}', 'QoutesController@TrackWaybill');


// RATES
$router->get('/get-services','RatesController@get_services');
$router->get('/get-rates','RatesController@get_all_rates');
$router->get('/add-service','RatesController@insertRatesData');
$router->get('/calculate-rate/{service_id}','RatesController@calculate_rate');
$router->get('/calculate-all-rates/{service_id}','RatesController@calculate_each_rate');

// SERVICE PROVIDERS
$router->get('/service-provider','ServiceProvidersController@get_service_provider');
$router->get('/supplier-services','RatesController@get_provider_services');

// INVOICES
$router->get('/get-invoices','InvoicesController@get_all_invoices');
$router->get('/get-customer-invoices/{customer_id}','InvoicesController@get_customer_invoices');
$router->post('/add-invoice','InvoicesController@insertInvoicesData');
$router->delete('/delete-invoice/{waybill_no}','InvoicesController@delete_invoice');

// Calculations
$router->post('/calculated', 'CalculateController@calculateRate');

// Packages
$router->get('/allpackages', 'PackagesController@listPackages');
$router->post('/addpackage', 'PackagesController@insertPackage');


// BRANCHES
$router->get('/get-branches','BranchesController@get_all_branches');
$router->get('/add-branch','BranchesController@insertBranchesData');


// Drivers
$router->post('/logindriver', 'DriversController@authenticate');
$router->get('/get_drivers', 'DriversController@get_drivers');
$router->get('/single-driver/{driver_id}', 'DriversController@getSingleDriver');
$router->post('/register_driver', 'DriversController@register_driver');
$router->get('/driverqoutes/{driver_id}', 'DriversController@getDriverQuotes');
$router->get('/get-driver-data/{driver_id}','DriversController@get_driver_data');

$router->put('/newdriver','DriversController@create_driver_pass');
$router->put('/update-driver-profile/{driver_id}','DriversController@update_driver_profile');
$router->put('/update-driver-password/{driver_id}','DriversController@update_driver_password');

// Emails
$router->post('/sendreminder', 'QoutesController@sendReminder');
$router->post('/sendcustom', 'QoutesController@sendCustom');
$router->post('/sendupdate', 'QoutesController@sendUpdate');


// GENERAL Users
$router->post('/userlogin','CustomersController@authenticate');
$router->post('/newuser','CustomersController@register_user');
$router->get('/getuserdata/{user_id}','CustomersController@get_single_user');
$router->get('/get_all_users','CustomersController@list_all_users');
$router->put('/updateprofile/{user_id}','CustomersController@update_profile');
$router->put('/updatepassword/{user_id}','CustomersController@update_password');
$router->put('/update-user-billing/{user_id}','CustomersController@update_billing');
$router->get('/get-user-billing/{user_id}','CustomersController@get_user_billing');



// Package TrackingController
$router->post('/post-tacking-data','TrackingController@insertTrackingData');
$router->get('/track/{waybill_no}','TrackingController@get_grouped_tracks');
$router->get('/drivers-tracks/{driver_id}','TrackingController@get_driver_tracks');

// Tests
// $router->post('/test_email', 'QoutesController@test_emails');
$router->get('/sendemail', 'PackagesController@sendEmail');
