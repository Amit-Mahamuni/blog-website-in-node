const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.listen(3000, function () {
    console.log("sever started on port 3000");
});

const cont = {
    "home": "Home Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" +
        "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
        "and scrambled it to make a type specimen book. It has survived not only five centuries, but also the" +
        "leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s" +
        "with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop" +
        "publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    "about": " About Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" +
        "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
        "and scrambled it to make a type specimen book. It has survived not only five centuries, but also the" +
        "leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s" +
        "with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop" +
        "publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    "contact": " contact Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" +
        "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
        "and scrambled it to make a type specimen book. It has survived not only five centuries, but also the" +
        "leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s" +
        "with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop" +
        "publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
}

const Allpost = [
    {
        "title": "1St Blog",
        "content": "1St Blog Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" +
            "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
            "and scrambled it to make a type specimen book. It has survived not only five centuries, but also the" +
            "publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        "title": "2nd Blog",
        "content": "2nd Blog Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" +
            "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
            "and scrambled it to make a type specimen book. It has survived not only five centuries, but also the" +
            "publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        "title": "3rd Blog",
        "content": "3rd Blog Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" +
            "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
            "and scrambled it to make a type specimen book. It has survived not only five centuries, but also the" +
            "publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    }
]


app.get("/", function (req, res) {
    res.render("home", { pageCtn: cont.home, pagetitle: "Home", Allpost: Allpost });
});

app.get("/about", function (req, res) {
    res.render("home", { pageCtn: cont.about, pagetitle: "About", Allpost: Allpost });
});

app.get("/contact", function (req, res) {
    res.render("home", { pageCtn: cont.contact, pagetitle: "Contact", Allpost: Allpost });
});

app.get("/addpost", function (req, res) {
    res.render("addpost", { Allpost: Allpost });
});

app.post("/addpost", function (req, res) {

    let newpost = {
        "title": req.body.ptitle,
        "content": req.body.pcont
    }

    Allpost.push(newpost);

    res.render("addpost", { Allpost: Allpost });
});

app.get("/post/:posttile", function (req, res) {

    let reqTitle = (req.params.posttile).split(" ").join("-").toLowerCase().trim();
    let foundFlg = true;

    for (var i = 0; i < Allpost.length; i++) {

        if (reqTitle === (Allpost[i]["title"]).split(" ").join("-").toLowerCase().trim()) {
            res.render("post", { post: Allpost[i] });
            foundFlg = true;
            break;
        } else {
            foundFlg = false;
        }
    }

    if (foundFlg === false) {
        res.redirect("/notfound");
    }
});

app.get("/notfound", function (req, res) {

    const notfnd = {
        title : "Not Found",
        content: "Page you requesting is not found.",
    }

    res.render("post", { post: notfnd });
});