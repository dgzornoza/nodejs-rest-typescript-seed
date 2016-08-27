/// <reference path="../../typings/index.d.ts" />
var express = require('express');
var app = express();
app.get('/notes', function (req, res) {
    res.json({ notes: "This is your notebook. Edit this to start saving your notes!" });
});
app.listen(3000);

//# sourceMappingURL=main.js.map
