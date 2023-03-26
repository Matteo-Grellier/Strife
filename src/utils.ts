export const getIsToday = (someDate: Date) => {
    const today = new Date()

    return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
    )
}

export const getIsYesterday = (someDate: Date) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    
    return (
        someDate.getDate() == yesterday.getDate() &&
        someDate.getMonth() == yesterday.getMonth() &&
        someDate.getFullYear() == yesterday.getFullYear()
    )
}