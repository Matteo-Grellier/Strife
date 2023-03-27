type Message = {
    channel_id : number, 
    timestamp : number, 
    author : string, 
    content : MessageContent
}

type MessageContent = {
    Text?: string,
    Image?: string
}

type Channel = {
    name: string;
    img: string;
    id: number;
    creator: string;
    users: string[];
}