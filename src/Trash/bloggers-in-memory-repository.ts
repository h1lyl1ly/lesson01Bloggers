export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
}


export let bloggers: BloggerType[] = [
    {id: 1, name: 'About JS - 01', youtubeUrl: 'https://trello.com/'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'https://trello.com/'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'https://trello.com/'},
    {id: 4, name: 'About JS - 04', youtubeUrl: 'https://trello.com/'},
    {id: 5, name: 'About JS - 05', youtubeUrl: 'https://trello.com/'}
]

export const bloggersRepository = {
    async allBloggers(): Promise<BloggerType[]> {
        return bloggers
    },
    async getBloggerById(id: number): Promise<BloggerType | null> {
        const blogger = bloggers.find(blogger => blogger.id === id)
        if (blogger) {
            return blogger
        } else {
            return null
        }
    },
    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },
    async deleteBlogger(id: number): Promise<boolean> {
        const blogger = bloggers.find((blogger) => blogger.id === id)
        if (!blogger) return false
        bloggers = bloggers.filter((blogger) => blogger.id !== id)
        return true
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const blogger = bloggers.find(blogger => blogger.id === id)
        if (blogger) {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return true
        } else {
            return false
        }
    }
}
