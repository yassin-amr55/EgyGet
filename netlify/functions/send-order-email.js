const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const order = JSON.parse(event.body);

  // Configure transporter (example for Gmail, use env vars for real projects)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yassin5amr55@gmail.com',
      pass: 'zvva fjdl yqvp bbt'
    }
  });

  const mailOptions = {
    from: 'yassin5amr55@gmail.com',
    to: 'yassin5amr55@gmail.com',
    subject: `New Order from ${order.customerInfo.name}`,
    text: JSON.stringify(order, null, 2)
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};