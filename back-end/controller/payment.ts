import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const Payment = async (req: Request, res: Response) => {
  const id = req.params.id;

  const mode = process.env.MODE;

  const website_url =
    mode === "development"
      ? "http://localhost:5173/profile/your-booking"
      : "https://city-hostel-zeta.vercel.app/";

  const return_url =
    mode === "development"
      ? "http://localhost:5173/profile/your-booking"
      : "https://city-hostel-zeta.vercel.app/";

  try {
    const data = JSON.stringify({
      return_url: return_url,
      website_url: website_url,
      amount: parseInt(id) * 10,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "Prabek Bir Bajracharya",
        email: "bazprabek@gmail.com",
        phone: "9861289596",
      },
      amount_breakdown: [
        {
          label: "Mark Price",
          amount: parseInt(id) * 10,
        },
      ],
    });
    var request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key 1d181ca95c2e4d11a67f15c6d5ea39e7`,
      },
      body: data,
    };
    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      request
    );
    const result = await response.text();
    const resultObject = JSON.parse(result);
    console.log(result);
    if (result) {
      res.send({ url: resultObject.payment_url });
    }
  } catch (err) {
    console.log(err);
  }
};
