const http = require("http");
const allowMachine = [
  "260a8d0750ffd32555fb494efa92765c",
  "678c150901b0c34da09056633c36d62d1",
];

const registerUser = [
  {
    username: "admin",
    password: "123456",
  },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });

  if (req.method === "GET") {
    const request_path = (req.url ?? "").split("?")[0];
    switch (request_path) {
      case "/check_machine":
        try {
          const urlParts = new URL(req.url, `http://${req.headers.host}`);
          const queryParams = urlParts.searchParams;

          // Example: Get the value of the 'param' query parameter
          const paramValue = queryParams.get("mac_id");

          // Handle the GET request logic here
          const result = allowMachine.includes(paramValue);

          res.end(JSON.stringify({ result: result ? "success" : "fail" }));
        } catch (error) {
          console.log(error);
          res.write("404");
          res.end();
        }

        break;
      case "/register_machine":
        try {
          const urlParts = new URL(req.url, `http://${req.headers.host}`);
          const queryParams = urlParts.searchParams;

          // Example: Get the value of the 'param' query parameter
          const paramValue = queryParams.get("mac_id");

          // Handle the GET request logic here
          const result = allowMachine.includes(paramValue);
          console.log(paramValue);
          res.end(JSON.stringify({ result: result ? "success" : "fail" }));
        } catch (error) {
          console.log(error);
          res.write("404");
          res.end();
        }

        break;

      default:
        res.write("404");
        res.end();
    }
    return;
  }
  if (req.method === "POST") {
    let data = "";
    switch (req.url) {
      case "/register_user":
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          // Parse the data as JSON (assuming it is JSON)

          try {
            const postData = JSON.parse(data);

            // Example: Get the value of the 'param' property in the JSON data
            const { username, password } = postData;

            const registerSuccess = !registerUser.some(
              (info) => info.username === username
            );

            res.end(
              JSON.stringify({
                result: registerSuccess ? "success" : "fail",
                message: registerSuccess ? "注册成功" : "用户已存在",
              })
            );
          } catch (error) {
            res.write("404");
            res.end();
          }
        });

        break;

      case "/login":
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          // Parse the data as JSON (assuming it is JSON)

          try {
            const postData = JSON.parse(data);

            // Example: Get the value of the 'param' property in the JSON data
            const { username, password } = postData;

            const loginSuccess = registerUser.some(
              (info) => info.username === username && info.password === password
            );

            res.end(
              JSON.stringify({ result: loginSuccess ? "success" : "fail" })
            );
          } catch (error) {
            res.write("404");
            res.end();
          }
        });

        break;

      default:
        res.write("404");
        res.end();
    }
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
