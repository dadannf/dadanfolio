<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    $to = "dadannuhf@gmail.com";
    $headers = "From: $email";

    $full_message = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $subject, $full_message, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "Failed to send the message. Please try again.";
    }
}
?>