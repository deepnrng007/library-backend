const graphl = require("graphql");
const _ = require("lodash");
const Book = require("./models/book");
const Author = require("./models/author");
const Users = require("./models/Users");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphl;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphl.GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return Author.findById(parent.authorID);
      },
    },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: graphl.GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorID: parent.id });
      },
    },
  }),
});
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: graphl.GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    date_of_birth: { type: GraphQLString },
    country: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from DB/other source
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return Users.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID,
        });
        return book.save();
      },
    },
    addUser: {
      type: UserType,
      args: {
        id: { type: graphl.GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        date_of_birth: { type: GraphQLString },
        country: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new Users({
          id: args.id,
          first_name: args.first_name,
          last_name: args.last_name,
          age: args.age,
          email: args.email,
          date_of_birth: args.date_of_birth,
          country: args.country,
          phone: args.phone,
        });
        return user.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
