import mercadopago from "mercadopago";

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token:
    "APP_USR-4540055402768581-042609-666937a8e759b4f19fd0e1e554e91dfb-73401770",
});

const handler = (req, res) => {
  if (req.method === "POST") {
    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        },
      ],
      back_urls: {
        success: "http://localhost:3000/feedback",
        failure: "http://localhost:3000/feedback",
        pending: "http://localhost:3000/feedback",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.status(200).json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({
          error: error.message,
        });
      });
  } else {
    res.status(404).send("Not Found");
  }
};

export default handler;
