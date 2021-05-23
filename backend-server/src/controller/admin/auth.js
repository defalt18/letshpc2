const User = require("../../models/user");
const jwt = require("jsonwebtoken"); //for user token
const bcrypt = require("bcrypt"); //for password hashing

exports.getAllUser = (req, res) => {
    User.find({}).exec((err, users) => {
        if (err)
            return res.status(400).json({
                message: "Some things went wrong",
            });
        return res.status(200).json({
            message: "All user fetched",
            users: users,
        });
    });
};

exports.signUp = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (err, user) => {
        if (user)
            return res.status(400).json({
                message: "Admin already exists",
            });

        const { firstName, lastName, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const _user = new User({
            firstName,
            lastName,
            email,
            hashPassword,
            userName: email.split("@")[0],
            role: "admin",
        });

        _user.save((error, data) => {
            if (error) {
                return res
                    .status(400)
                    .json({ message: "Something went wrong", error: error });
            }

            if (data) {
                return res.status(201).json({
                    message: "Admin successfully created",
                    user: data,
                });
            }
        });
    });
};

exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        if (user) {
            if (user.authenticate(req.body.password) && user.role === "admin") {
                //  send token for authorization
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );

                const { _id, firstName, lastName, email, role, userName } =
                    user;
                res.cookie("token", token, { expiresIn: "1d" });
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, userName },
                });
            } else {
                return res.status(400).json({ message: "Invalid Password" });
            }
        } else {
            return res.status(400).json({ message: "something went wrong" });
        }
    });
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout successfully..." });
};
