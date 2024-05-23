import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw7qe3n801p307w13cjg99ku/master",
  cache: new InMemoryCache(),
});

export const getCourseList = async (level) => {
  const GET_COURSE_LIST =
    gql`
    query CourseList {
      courses(where: { level: ` +
    level +
    ` }) {
        id
        name
        level
        tags
        time
        author
        banner {
          url
        }
        chapters {
          id
        }
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: GET_COURSE_LIST,
    });
    return data.courses;
  } catch (error) {
    console.error("Error fetching course list:", error);
    return [];
  }
};

// import { request, gql } from "graphql-request";
// const MASTER_URL =
//   "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw7qe3n801p307w13cjg99ku/master";

// export const getCourseList = async () => {
//   const query = gql`
//     query CourseList {
//       courses(where: { level: Basis }) {
//         id
//         name
//         level
//         tags
//         time
//         author
//         banner {
//           url
//         }
//         chapters {
//           id
//         }
//       }
//     }
//   `;
//   const result = await request(MASTER_URL, query);
//   return result;
// };
