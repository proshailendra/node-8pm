var expresss = require("express"),
path = require("path");

var router = expresss.Router();

router.get('/receipt', function (req, res) {
var obj = req.session.receipt;
if (obj != null) {
    var str = '<link href="node_modules/bootstrap/dist/css/bootstrap.css" rel="stylesheet">' + '<div class="container">' + '  <h1>Payment Receipt</h1>' + '  <table class="table table-bordered">' + '      <tr>' + '          <th>Name</th>' + '          <td>' + obj.name + '</td>' + '      </tr>' + '      <tr>' + '          <th>Email</th>' + '          <td>' + obj.email + '</td>' + '      </tr>' + '      <tr>' + '          <th>Transaction Id</th>' + '          <td>' + obj.transactionId + '</td>' + '      </tr>' + '      <tr>' + '          <th>Amount (Rs.)</th>' + '          <td>' + obj.amount + '</td>' + '      </tr>' + '      <tr>' + '          <th>Status</th>' + '          <td>' + obj.status + '</td>' + '      </tr>' + '  </table>' + '<p><a href="/">Go to Home</a></p>' + '</div>';
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end(str);
} else {
    res.end("Payment Failed");
}
}).get("*", (req, res) => { //angular route
res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;