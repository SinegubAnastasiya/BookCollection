interface iBook {
    readonly id?: number;
    title?: string;
    author?: string;
    publicationDate?: any;
    genres?: string;
}

interface iUser {
  readonly id?: number;
  username?: string;
  password?: string;
  email?: string;
}
  
export { iBook, iUser };