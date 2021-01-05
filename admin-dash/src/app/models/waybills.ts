export interface IWaybill{
    qoute_id: string,
    cust_name: string,
    surname: string,
    cellphone: string,
    email_addr: string,
    company_name: string,
    receiver_name: string,
    receiver_phone: string,
    receiver_email: string,
    receiver_company: string,
    signed_by: string,
    signed_on: string,
    signature: string,
    destination_address: string,
    pickup_address: string,
    temp_destination: string,
    date_created: string,
    date_modified: string,
    modified_by: string,
    collection_branch: string,
    destination_branch: string,
    pickup_postal_code: number,
    service_type: string,
    receival_method: string,
    final_price: number,
    vat_price: number,
    mincharge_price: number,
    per_kg_price: number,
    fuel_price: number,
    insurance_price: number,
    security_price: number,
    after_hrs_price: number,
    weekend_price: number,
    outlaying_price: number,
    general_surcharge: number,
    embassy_charge: number,
    chainstore_price: number,
    total_weight: number,
    total_volumetric_weight: number,
    branch: string,
    status: number,
    note: string,
    driver_id: string,
    cust_login_id: string,
    delivery_status: string,
    payment_status: string,
    delivery_note: string,
    admin_weight: number,
    admin_height: number,
    admin_width: number,
    admin_length: number,
    admin_note: string
}