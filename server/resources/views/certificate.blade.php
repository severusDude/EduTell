<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Completion Certificate</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .certificate-container {
            text-align: center;
            padding: 50px;
            border: 5px solid #4CAF50;
            width: 80%;
            margin: 0 auto;
        }
        h1 {
            color: #4CAF50;
            font-size: 36px;
        }
        .course-name {
            font-size: 28px;
            color: #333;
            margin: 20px 0;
        }
        .user-name {
            font-size: 24px;
            font-weight: bold;
            color: #555;
        }
        .date {
            font-size: 18px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <h1>Certificate of Completion</h1>
        <p class="course-name">This is to certify that</p>
        <p class="user-name">{{ $user->name }}</p>
        <p class="course-name">has completed the course</p>
        <p class="course-name">{{ $course->title }}</p>
        <p class="date">Completed on: {{ $completion_date }}</p>
    </div>
</body>
</html>
