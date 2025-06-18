export interface Blog {
    _id?: String,
    username?: String,
    text: String,
    title: String,
    name: String,
    createdAt: String,
    updatedAt: String
}

export interface BlogPost {
    text: String,
    title: String,
}