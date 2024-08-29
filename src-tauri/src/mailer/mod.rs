use lettre::message::header::ContentType;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};

// pub fn send_smtp() -> anyhow::Result<()> {
//     let email = Message::builder()
//         .from("NoBody <nobody@domain.tld>".parse().unwrap())
//         .reply_to("Yuin <yuin@domain.tld>".parse().unwrap())
//         .to("Hei <hei@domain.tld>".parse().unwrap())
//         .subject("Happy new year")
//         .body(String::from("Be happy!"))
//         .unwrap();

//     let creds = Credentials::new(
//         "mikoto.okada721@gmail".to_owned(),
//         "smtp_password".to_owned(),
//     );

//     // Open a remote connection to gmail
//     let mailer = SmtpTransport::relay("smtp.gmail.com")
//         .unwrap()
//         .credentials(creds)
//         .build();

//     // Send the email
//     mailer.send(&email).expect("Failed sen mail.")
// }
