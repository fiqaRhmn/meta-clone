import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher(
    {
        appId: process.env.VUE_APP_PUSHER_APP_ID!,
        key: process.env.VUE_APP_PUSHER_KEY!,
        secret: process.env.VUE_APP_PUSHER_SECRET!,
        cluster: process.env.VUE_APP_PUSHER_CLUSTER!,
        encrypted: true
    }
);

export const clientPusher = new ClientPusher('370e9323de6986cf988f', {
    cluster: 'ap1'
})