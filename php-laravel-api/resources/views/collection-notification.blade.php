<div style="max-width: 712px !important;
    background: #f3f3f3;
    margin: auto;
    padding: 2em;">

<img width="150" src="https://pharrage.com/wp-content/uploads/2020/07/Intellogistics-1-e1610203485535.png" alt="">
<h3 style="font-family:'arial',sans-serif; color: #84bc51;">Intellogistics Courier Software.</h3>
<h4 style="font-family:'arial',sans-serif;">COLLECTION REQUEST</h4>
<h5 style="font-family:'arial',sans-serif;">Tracking Number | {{ $qoutes->qoute_id }}</h5>

<p style="">There is a new collection request from <b>{{ $qoutes->cust_name }} {{ $qoutes->surname }}</b>.</p>

<p>Click <a href="https://intellogistics.co.za/app/admin-dash/login.php">on this link</a> to login and manage waybill. </p>

  <table style="min-width: 27em;background-color: #1c345d;border: 1px dashed #fff;padding: 13px;font-family: &quot;arial&quot;, sans-serif;color: #fff;padding-bottom: 0;">
  	<tr>
  		<td><b>Service type</b></td>
  		<td><h4>: {{ $qoutes->service_type }} </h4></td>
  	</tr>
  	<tr>
  		<td><b>Minimum Charge</b></td>
  		<td>: R{{ $qoutes->mincharge_price }}</td>
  	</tr>
  	<tr>
  		<td><b>Per KG Charge</b></td>
  		<td>: R{{ $qoutes->per_kg_price }}</td>
  	</tr>
  	<tr>
  		<td><b>Fuel Surcharge</b></td>
  		<td>: R{{ $qoutes->fuel_price }}</td>
  	</tr>
  	<tr>
  		<td><b>15% VAT</b></td>
  		<td>: R{{ $qoutes->vat_price }}</td>
  	</tr>
    <tr>
  		<td><h3>TOTAL</h3></td>
  		<td><h2>: R{{ $qoutes->final_price }}</h2></td>
  	</tr>
  </table>


<br/>
<!-- <h4 style="font-family:'arial',sans-serif;">DETAILS</h4> -->
<table style="min-width: 100%;background-color: #ffffff;padding: 13px;font-family: &quot;arial&quot;, sans-serif;color: #777471;padding-bottom: 0;">
	<tr>
		<td><b>Waybill No</b></td>
		<td>: {{ $qoutes->qoute_id }}</td>
	</tr>
	<tr>
		<td><b>Contact Person</b></td>
		<td>: {{ $qoutes->cust_name }} {{ $qoutes->surname }}</td>
	</tr>
	<tr>
		<td><b>Cellphone</b></td>
		<td>: {{ $qoutes->cellphone }}</td>
	</tr>
	<tr>
		<td><b>Pickup at</b></td>
		<td>: {{ $qoutes->pickup_address }}</td>
	</tr>
	<tr>
		<td><b>Deliver to</b></td>
		<td>: {{ $qoutes->destination_address }}</td>
	</tr>
  <tr>
		<td><b>Total Parcel Weight</b></td>
		<td>: {{ $qoutes->admin_weight }} KG</td>
	</tr>
	<tr>
		<td><b>Total Parcel Height</b></td>
		<td>: {{ $qoutes->admin_height }} CM</td>
	</tr>
  <tr>
		<td><b>Total Parcel Length</b></td>
		<td>: {{ $qoutes->admin_length }} CM</td>
	</tr>
	<tr>
		<td><b>Total Parcel Width</b></td>
		<td>: {{ $qoutes->admin_width }} CM</td>
	</tr>
</table>


<p>
  <i>Please note that this system is only for <strong>DEMO PURPOSES ONLY</strong>, there will be no parcel collection or payment taking place.</i>
</p>

</div>
