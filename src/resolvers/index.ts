import axios from "axios";

const resolvers = {
    Query: {
        hello: ()=>{
            return "Hey There, I am graphql Server"
        }
    }
};

export default resolvers;
