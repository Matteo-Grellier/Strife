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