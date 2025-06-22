export interface Blog {
    _id?: String,
    userId: String,
    username?: String,
    text: String,
    title: String,
    name: String,
    createdAt: String,
    updatedAt: String,
    parentBlogId?: String,
    parentUsername?: String
}

export interface BlogPost {
    text: String,
    title: String,
}