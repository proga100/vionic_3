export class Settings {

    // static store_url: string = "http://samarth.cloudapp.net";
    // static consumer_key: string = "ck_d6c5feec9ea1c407d2f91661c5137c6e3e48ae3b";
    // static consumer_secret: string = "cs_de8e6cf03a5afd10491dfb1756415ac5a0169ae8";

     static store_url: string = "https://www.cisupplystore.com/newvm";
 //  static store_url: string = "http://localhost/virtuemart/v3212";
    static consumer_key: string = "ck_ef3bd2f8c132ee1119ac9e605149236e09be7381";
    static consumer_secret: string = "cs_10c9a6be970fe201900cfdd6cd5f7f50826fc373";
//    static jbackend_api_key: string = "V0WOMGI4VFD7L5BLDFT2";
   static jbackend_api_key: string = "S2REW6JTDK1TJBGCTJ7F";
    static enable_grid_layout_home = true;
    static enable_grid_layout_category = true;

    static bacs_enabled: boolean = true;
    static cod_enabled: boolean = true;
    static cheque_enabled: boolean = false;

    static razorpay_enabled: boolean = true;
    static razorpay_key: string = "rzp_test_Ni9H4q0IBlfKLQ";

    static paypal_enabled: boolean = true;
    static paypal_sandbox_key: string = "AYkkS2ObeSpaObaCqA3bybQjRNRMKOw_2vNSha7gmxESpG4l4AhEyMfYwuzrUFKSbWGhCsN-Vhtl5FOG";
    static paypal_production_key: string = "";
    static paypal_env: string[] = ["PayPalEnvironmentNoNetwork", "PayPalEnvironmentSandbox", "PayPalEnvironmentProduction"];
    static paypal_env_enabled: number = 1;

    static direction: string = "ltr";

    static facebook_login: boolean = true; //if true, requires cordova-plugin-facebook4 to be installed

    static currency_symbol = "$";

    static onesignal_enabled = true;
    static onesignal_appId = "415f5a58-2c79-48fa-92b1-6e0d23886af0";
    static google_project_number = "542459717948";

    static payumoney_enabled = true;
    static payumoney_live = false; // Set this to true for live, false for testing
    static payumoney_header = Settings.payumoney_live ? "LIz3RsACcO5xUmEH6r/jRUWTTrfo6hCrFTZBGiLpXWB8=" : "KpNTiy57L6OFjS2D3TqPod8+6nfGmRVwVMi5t9jR4NU="; //This is live header and test header. Replace these with valid auth headers from your payumoney merchant account
    static payumoney_url = Settings.payumoney_live ? "https://www.payumoney.com" : "https://test.payumoney.com";

    static firebase_get_slider_images = false;

}