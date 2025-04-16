function registerUserForChat(email) {
    let authKey = "4768e4bc22a09b8c619dd82be1cf3a04b95cfcd7";
    var UID = email;
    var name = "Name";

    var user = new CometChat.User(UID);

    user.setName(name);

    CometChat.createUser(user, authKey).then(
        (user) => {
            console.log("user created", user);
        },
        (error) => {
            console.log("error", error);
        }
    );
}

function loginUserToCometChat(UID) {
    var UID = UID;
    var authKey = "4768e4bc22a09b8c619dd82be1cf3a04b95cfcd7";

    CometChat.getLoggedinUser().then(
        (user) => {
            if (!user) {
                CometChat.login(UID, authKey).then(
                    (user) => {
                        console.log("Login Successful:", { user });
                    },
                    (error) => {
                        console.log("Login failed with exception:", { error });
                    }
                );
            }
        },
        (error) => {
            console.log("Some Error Occured", { error });
        }
    );
}

