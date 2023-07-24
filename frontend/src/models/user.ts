export interface User {
    email:string, 
    roles :string
}
export enum Role {
    ADMIN = "Admin",
    USER = "User",
  }

export enum Type {
    ALLPOSTS = "ALLPOSTS",
    MYPOSTS = "MYPOSTS",
    TOBEAPPROVED = "TOBEAPPROVED"
}

