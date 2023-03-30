<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (!empty($_POST)) {

//Load Composer's autoloader
    require $_SERVER["DOCUMENT_ROOT"] . '/phpmailer/src/Exception.php';
    require $_SERVER["DOCUMENT_ROOT"] . '/phpmailer/src/PHPMailer.php';
    require $_SERVER["DOCUMENT_ROOT"] . '/phpmailer/src/SMTP.php';


    $mail = new PHPMailer(true);                               // Passing `true` enables exceptions
    $mail->CharSet = 'UTF-8';
//Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mail.hosting.reg.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'info@texnoaudit.ru';                 // SMTP username
    $mail->Password = '1Z2s6B3m';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                             // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

//Recipients
    $mail->setFrom('info@texnoaudit.ru', 'info@texnoaudit.ru');
    $mail->addAddress('hudson88@yandex.ru', 'hudson88@yandex.ru');     // Add a recipient
    $mail->addAddress('olegv@med-pred.ru', 'olegv@med-pred.ru');     // Add a recipient

//Attachments
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

//Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $_POST['subject'];
    $message = '';
    foreach ($_POST as $key => $item) {
        if ($key != 'subject') {
            $message .= $key . ' - ' . $item . '<br>';
        }
    }
    $mail->Body = $message;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
}