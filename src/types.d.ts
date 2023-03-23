type Message = {
    channelId : number, 
    timestamp : number, 
    author : string, 
    content : MessageContent
}

type MessageContent = {
    Text?: string,
    Image?: string
}