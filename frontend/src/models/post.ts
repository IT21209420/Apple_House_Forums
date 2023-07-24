export interface Post {
    _id:string,
    title : string,
    text? : string,
    feedback?:string
    approved : boolean,
    comments : string[],
    createdAt :string,
    updatedAt :string

}