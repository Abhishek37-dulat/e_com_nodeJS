import PaytmChecksum from "../paytm/PaytmChecksum.js";
import { paytmParams, paytmMerchantkey } from "../index.js";
import formidable from "formidable";
import https from "https";

export const addPaymentGateway = async (req, res) => {
  const paytmCheckSum = await PaytmChecksum.generateSignature(
    paytmParams,
    paytmMerchantkey
  );
  try {
    let params = {
      ...paytmParams,
      CHECKSUMHASH: paytmCheckSum,
    };
    console.log(params);

    res.status(200).json(params);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const paytmResponse = (req, res) => {
  console.log(":::", req.body);
  const form = new formidable.IncomingForm();
  let paytmCheckSum = req.body.CHECKSUMHASH;

  delete req.body.CHECKSUMHASH;
  let isVerifySignature = PaytmChecksum.verifySignature(
    req.body,
    paytmMerchantkey,
    paytmCheckSum
  );

  if (isVerifySignature) {
    let paytmParams = {};
    paytmParams["MID"] = req.body.MID;
    paytmParams["ORDERID"] = req.body.ORDERID;

    PaytmChecksum.generateSignature(paytmParams, paytmMerchantkey).then(
      function (checksum) {
        paytmParams["CHECKSUMHASH"] = checksum;
        console.log(paytmParams);

        let post_data = JSON.stringify(paytmParams);

        let options = {
          hostname: "securegw.paytm.in",
          port: 443,
          path: "/order/status",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };
        let ress = "";
        let post_req = https.req(options, function (post_res) {
          post_res.on("data", function (chunk) {
            ress += chunk;
          });

          post_res.on("end", function () {
            let result = JSON.parse(ress);
            res.redirect("http://localhost:3000/");
          });
        });
        post_req.write(post_data);
        post_req.end();
      }
    );
    console.log("hello5");
  } else {
    console.log("Checksum mismatched");
  }
};
