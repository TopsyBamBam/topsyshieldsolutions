<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);
    $time = filter_input(INPUT_POST, 'time', FILTER_SANITIZE_STRING);
    $service = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    $errors = [];
    
    if (empty($name)) $errors[] = "Name is required";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format";
    if (empty($phone)) $errors[] = "Phone number is required";
    if (empty($date)) $errors[] = "Date is required";
    if (empty($time)) $errors[] = "Time is required";

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(["errors" => $errors]);
        exit;
    }

    $to = "temitope@topsyshieldsolutions.ng"; 
    $subject = "New Appointment Request";
    $emailBody = "
        Name: $name\n
        Email: $email\n
        Phone: $phone\n
        Preferred Date: $date\n
        Preferred Time: $time\n
        Service Type: $service\n
        Message: $message
    ";

    $headers = "From: $email";
    if (mail($to, $subject, $emailBody, $headers)) {
        echo json_encode(["message" => "Appointment submitted successfully! We will contact you shortly."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to send the appointment request. Please try again later."]);
    }
} else {
    http_response_code(405);
    echo "Method not allowed";
}
?>