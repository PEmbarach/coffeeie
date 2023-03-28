import { rest } from "msw";

const baseURL = 'https://drf-api-coffeeie.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            "pk": 3,
            "username": "Gui",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 3,
            "profile_image": "https://res.cloudinary.com/dmxmjvlud/image/upload/v1/media/../IMG_0038_lm65ne"
            }));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
]
