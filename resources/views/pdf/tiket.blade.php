<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tiket Komunitas Salihara</title>
    <style>
        /* General Reset */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            color: #000;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #000;
        }

        /* Header Section */
        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header img {
            width: 250px;
            display: block;
            margin: 0 auto 20px;
        }

        .header h1 {
            font-size: 1rem;
            margin: 0;
            font-weight: normal;
        }

        .header p {
            margin: 5px 0 0;
            font-size: 0.9rem;
            text-align: left;
        }

        /* Content Section */
        .content {
            margin-bottom: 20px;
        }

        .content h2 {
            font-size: 1.1rem;
            margin-bottom: 10px;
        }

        .info-group {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 0.9rem;
        }

        .info-group strong {
            font-weight: bold;
        }

        /* QR Code Section */
        .qr-section {
            text-align: center;
            margin: 30px 0;
        }

        .qr-section img {
            width: 150px;
            height: 150px;
            border: 1px solid #000;
        }

        .qr-section p {
            font-size: 0.9rem;
            margin: 10px 0 0;
        }

        /* Terms Section */
        .terms {
            margin-top: 20px;
        }

        .terms h3 {
            font-size: 1rem;
            margin-bottom: 10px;
        }

        .terms ul {
            padding-left: 20px;
            list-style: none;
        }

        .terms ul li {
            font-size: 0.9rem;
            margin-bottom: 5px;
            position: relative;
        }

        .terms ul li:before {
            content: "•";
            position: absolute;
            left: -15px;
            top: 0;
        }
        .qr-code {
            text-align: center;
            margin: 30px 0;
        }
        .qr-code img {
            width: 150px;
            border: 5px solid #2d2d2d;
            border-radius: 10px;
        }

        .qr-code p {
            margin-top: 10px;
            font-size: 1rem;
            font-weight: bold;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="{{ public_path('img/logo-tiket.png') }}" alt="Komunitas Salihara">
            <p>Halo <strong>John Doe</strong>,</p>
            <p>Terimakasih, proses pembelian tiket Anda sudah kami terima.</p>
        </div>

        <!-- Booking Info -->
        <div class="content">
            <h2>Informasi Pemesanan</h2>
            <div class="info-group">
                <span><strong>Nomor Pesanan:</strong></span>
                <span>xxxxxxxx</span>
            </div>
            <div class="info-group">
                <span><strong>Tanggal Pesanan:</strong></span>
                <span>13 Nov 2024 10:56</span>
            </div>
            <div class="info-group">
                <span><strong>Metode Pembayaran:</strong></span>
                <span>BCA VA</span>
            </div>
            <div class="info-group">
                <span><strong>Email:</strong></span>
                <span>john@mail.com</span>
            </div>
            <div class="info-group">
                <span><strong>Nomor WA:</strong></span>
                <span>0812152626</span>
            </div>
        </div>

        <!-- Ticket Info -->
        <div class="content">
            <h2>Pameran Common Sanctum</h2>
            <p>Tiket Early Bird</p>
            <p><em>Hari Senin dan libur nasional pameran ditutup.</em></p>
        </div>

        <!-- QR Code -->
        <div class="qr-section">
            <div class="qr-code">
                <img src="{{ $qrCode }}" alt="QR Code">
                <p>CMS202403</p>
            </div>

            <p>Scan QR untuk akses tiket Anda</p>
        </div>

        <!-- Terms -->
        <div class="terms">
            <h3>SYARAT DAN KETENTUAN ACARA</h3>
            <ul>
                <li>Hadir satu jam sebelum acara dimulai.</li>
                <li>Salihara tidak menyediakan tempat parkir lain jika penuh.</li>
            </ul>
        </div>
    </div>
</body>
</html>
