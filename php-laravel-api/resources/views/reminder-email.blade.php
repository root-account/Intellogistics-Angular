<div style="max-width: 712px !important;
    background: #f3f3f3;
    margin: auto;
    padding: 2em;">

<img width="150" src="https://pharrage.com/wp-content/uploads/2020/07/Intellogistics-1-e1610203485535.png" alt="">
<h3 style="font-family:'arial',sans-serif; color: #84bc51;">Intellogistics Courier Software.</h3>
<h4 style="font-family:'arial',sans-serif;">PAYMENT REMINDER</h4>
<h5 style="font-family:'arial',sans-serif;">Tracking Number | {{ $qoutes->qoute_id }}</h5>
<p>You still have an outstanding payment on your quotation for parcel delivery with Intellogistics Courier</p>
<table style="min-width: 27em; text-align: left; padding: 10px; background: #f9f9f9; font-family:'arial',sans-serif;color: #777471;">
		<tr>
			<th>Waybill / Reference</th>
			<td style="font-size:15px;">: <b>{{ $qoutes->qoute_id }}</b></td>
		</tr>
		<tr>
			<th>Amount</th>
			<td style="font-size:15px;">: <b>R{{ $qoutes->final_price }}</b></td>
		</tr>
		<tr>
			<th>Service</th>
			<td>: {{ $qoutes->service_type }}</td>
		</tr>
		<tr>
			<th>Receival Method</th>
			<td>: {{ $qoutes->receival_method }}</td>
		</tr>
    <tr>
			<th>{{ $qoutes->receival_method }} Address</th>
			<td>: {{ $qoutes->pickup_address }}</td>
		</tr>
		<tr>
			<th>Destination Address</th>
			<td>: {{ $qoutes->destination_address }}</td>
		</tr>

</table>

<hr style="margin: 2em 0em;border-color: #edc948;border-style: dashed;" />
<h2 style="font-family:'arial',sans-serif; color: #a583ca;">PAYMENT</h2>
<h4 style="font-family:'arial',sans-serif;">EFT DETAILS</h4>
<p style="font-family:'arial',sans-serif;">Parcels will only be collected after payment reflects in our bank.</p>
<table style="min-width: 27em; text-align: left; padding: 10px; background: #f9f9f9; font-family:'arial',sans-serif;color: #777471;">
		<tr>
			<th>Name</th>
			<td>: Company PTY LTD</td>
		</tr>
		<tr>
			<th>Acc Number</th>
			<td>: 00000000000</td>
		</tr>
		<tr>
			<th>Bank</th>
			<td>: First National Bank</td>
		</tr>
		<tr>
			<th>Branch</th>
			<td>: OR Tambo</td>
		</tr>
		<tr>
			<th>Branch Code</th>
			<td>: 0000000</td>
		</tr>
    <tr>
			<th>Payment Ref</th>
			<td>: <b>{{ $qoutes->qoute_id }}</b></td>
		</tr>
    <tr>
			<th>Amount </th>
			<td style="font-size:15px;">: <b>R{{ $qoutes->final_price }}</b></td>
		</tr>

</table>

<p>
  <i>Please note that this system is only for <strong>DEMO PURPOSES ONLY</strong>, there will be no parcel collection or payment taking place.</i>
</p>

</div>
