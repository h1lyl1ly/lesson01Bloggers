
export let bloggers = [
    {id: 1, name: 'About JS - 01', youtubeUrl: 'https://trello.com/'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'https://trello.com/'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'https://trello.com/'},
    {id: 4, name: 'About JS - 04', youtubeUrl: 'https://trello.com/'},
    {id: 5, name: 'About JS - 05', youtubeUrl: 'https://trello.com/'}
]

export const bloggersRepository = {
    allBloggers() {
        return bloggers
    },
    getBloggerById(id: number) {
        let bloggerById = bloggers.find(blogger => blogger.id === id)
        return bloggerById
    },
    createBlogger(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },
    deleteBlogger(id: number) {
        const blogger = bloggers.find((blogger) => blogger.id === id)
        if (!blogger) return false
        bloggers = bloggers.filter((blogger) => blogger.id !== id)
        return true
    },
    updateBlogger(id: number, name: string, youtubeUrl: string) {
        const blogger = bloggers.find(blogger => blogger.id === id)
        if (blogger) {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return true
        } else {
            return false
        }
    // },
    // deleteAllData() {
    //     function empty() {
    //         bloggers = [];
    //     }   empty()
    }
}
