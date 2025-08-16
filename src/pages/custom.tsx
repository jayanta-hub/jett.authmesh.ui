
const Custom = () => {
    return (
        <div dangerouslySetInnerHTML={{
            __html: `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Details Form</title>
    <style>
        * {
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #f5f5f5;
        }

        .card-form {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 350px;
        }

        .card-form h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        .input-group {
            margin-bottom: 15px;
        }

        .input-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .input-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }

        .input-group input:focus {
            border-color: #007bff;
            outline: none;
        }

        .error {
            color: red;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }

        .submit-btn {
            width: 100%;
            background: #007bff;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        .submit-btn:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>

    <form class="card-form" id="cardForm">
        <h2>Enter Card Details</h2>

        <div class="input-group">
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
            <p class="error" id="cardNumberError">Invalid card number (16 digits required)</p>
        </div>

        <div class="input-group">
            <label for="cardHolder">Cardholder Name</label>
            <input type="text" id="cardHolder" placeholder="John Doe">
            <p class="error" id="cardHolderError">Only letters and spaces allowed</p>
        </div>

        <div class="input-group">
            <label for="expiryDate">Expiry Date (MM/YY)</label>
            <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
            <p class="error" id="expiryDateError">Invalid expiry date</p>
        </div>

        <div class="input-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" placeholder="123" maxlength="3">
            <p class="error" id="cvvError">Invalid CVV (3 digits)</p>
        </div>

        <button type="submit" class="submit-btn">Submit</button>
    </form>

    <script>
        document.getElementById('cardForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            const cardNumber = document.getElementById('cardNumber');
            const cardNumberError = document.getElementById('cardNumberError');
            const cardHolder = document.getElementById('cardHolder');
            const cardHolderError = document.getElementById('cardHolderError');
            const expiryDate = document.getElementById('expiryDate');
            const expiryDateError = document.getElementById('expiryDateError');
            const cvv = document.getElementById('cvv');
            const cvvError = document.getElementById('cvvError');

            // Card Number Validation
            const cardNumberValue = cardNumber.value.replace(/\s/g, '');
            if (!/^\d{16}$/.test(cardNumberValue)) {
                cardNumberError.style.display = 'block';
                isValid = false;
            } else {
                cardNumberError.style.display = 'none';
            }

            // Cardholder Name Validation
            if (!/^[a-zA-Z\s]+$/.test(cardHolder.value) || cardHolder.value.trim() === '') {
                cardHolderError.style.display = 'block';
                isValid = false;
            } else {
                cardHolderError.style.display = 'none';
            }

            // Expiry Date Validation (MM/YY)
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.value)) {
                expiryDateError.style.display = 'block';
                isValid = false;
            } else {
                expiryDateError.style.display = 'none';
            }

            // CVV Validation
            if (!/^\d{3,4}$/.test(cvv.value)) {
                cvvError.style.display = 'block';
                isValid = false;
            } else {
                cvvError.style.display = 'none';
            }

            // If valid, submit the form
            if (isValid) {
                alert('Card details submitted successfully!');
            }
        });

        // Auto-format Card Number Input (adds spaces after every 4 digits)
        document.getElementById('cardNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            value = value.replace(/(.{4})/g, '$1 ').trim(); // Add spaces
            e.target.value = value;
        });

        // Auto-format Expiry Date Input
        document.getElementById('expiryDate').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    </script>

</body>
</html>

      ` }} />
    )
}

export default Custom