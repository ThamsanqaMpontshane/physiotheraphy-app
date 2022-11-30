import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import physioApp from "./physio-app.js";
import flash from "express-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import physioRoutes from "./routes/routes.js"


import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const pgp = pgPromise({});

const connectionString =
    process.env.DATABASE_URL || "postgresql://codex:pg123@localhost:5432/physio_app";

const config = {
    connectionString,
};

if (process.env.NODE_ENV === "production") {
    config.ssl = {
        rejectUnauthorized: false,
    };
}

const db = pgp(config);
const physio = physioApp(db);
const Routers = physioRoutes(physio, db);


app.use(
    session({
        secret: "admin",
        resave: false,
        saveUninitialized: true,
        cookie: {
            sameSite: "strict",
        },
    })
);

app.use(flash());

app.engine(
    "handlebars",
    exphbs.engine({
        defaultLayout: "main",
    })
);
app.set("views", join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(express.static("public"));

app.get("/", Routers.home);
app.get("/signin", Routers.loginGet);
app.get("/signup", Routers.signupGet);
app.post("/signup", Routers.signupPost);
app.post("/signin", Routers.loginPost);
app.get("/machine", Routers.machineScreen);

app.listen(process.env.PORT || 3000, function () {
    console.log("App started on port", this.address().port);
});


