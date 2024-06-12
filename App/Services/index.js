import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";

/**
 * Creates an ApolloClient instance with the provided configuration.
 * This client is used to make GraphQL queries and mutations to the specified API endpoint.
 *
 * @param {string} uri - The GraphQL API endpoint URL.
 * @param {InMemoryCache} cache - The cache implementation to use.
 * @param {object} headers - The headers to include in the GraphQL requests.
 * @returns {ApolloClient} - The configured ApolloClient instance.
 */

const client = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw7qe3n801p307w13cjg99ku/master",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTc4MzE0MDYsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2x3N3FlM244MDFwMzA3dzEzY2pnOTlrdS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiNTU2YjBhMDctZTBhNi00MjIxLTgxODQtZmM2NGZjMDM3YmFiIiwianRpIjoiY2x4NXNnc2ZxMGliaDA2dzJkOGU5NHBociJ9.UrpuEi4357gNRv23pE2uMg0wQfraeQE6j6zJNKSV_tU8fkWFCsPkPBGUqRhNAi1BwgvI4yltcZ_RGvLEAP_oNl0az2WwfqXwaxugs9x9mybBeIXhL_f_asaCfkCIiabyYgAcJJGZjOpv9X22KvOaFKzzBUOGPAEustSf_EU_Fwh847Ze9NOMxfTGOtoiBqtqZDgvTDIp2dclYqvmoYPJsEw-rRUKX-Auz72a-5TR2D2nnB9Ew103u7JVMPg9A7TSCfTAZ_5if36LL3p7ByawKIBPYN0XmlPr4M2pON7kTAja39LIZQBBx3Dr1sd19oQUkLbj1plyqK7Th3xJDRZYVIli4SRDLk7zSeNyFDyMduqxDzuuwtXBFLI8mmduREjakmS-irmu7jxxpSK1JBRXHqiZToWA0nZLo3fh02ocHPs6okUaM5ewIzBnmVQCm5iiPTgiRf4SEVnrh5d2GFmBRPrqjmxvHzQv6U97RwXMRLa7sDsGCbZyDnRvTGUWkOsaWs627Wm7hXittrcrGyaX5Bo6BsMeTzXpnRlmYE3IV-2EgjD6wrsnSrlP6YnUBFxjD6ku32xWrwX-Jg6eYodN1O9R5vVjFNbSvuVZWtJ928Iiv59JIdM6A-d1_O0upZgyAG7p7VER_R8XIufQdKek7Ugmo6eKpej2g61TCbAoFU0`,
  },
});
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const resetApolloCache = async () => {
  try {
    await client.resetStore(); // Reset de cache en herlaad de gegevens
    console.log("Apollo cache is gereset");
  } catch (error) {
    console.error("Error bij het resetten van de Apollo cache:", error);
  }
};

export const getCourseList = async (level) => {
  await delay(1000);
  const GET_COURSE_LIST = gql`
    query CourseList {
      courses(where: { level: ${level} }) {
    id
    name
    level
    tags
    time
    author
    banner {
      url
    }
    authorName
    description {
      markdown
    }
    chapters {
      content {
        heading
        description {
          markdown
          html
        }
        output {
          markdown
          html
        }
        videoUrl
        soundClip {
          id
          url
        }
      }
      id
      tile
    }
  }
}
  `;

  try {
    const { data } = await client.query({
      query: GET_COURSE_LIST,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    console.error("Error fetching course list:", error);
    return [];
  }
};

export const enrollCourse = async (courseId, userEmail) => {
  await delay(1000);
  const ENROLL_COURSE = gql`
    mutation {
      createUserConrolledCourse(
        data: { courseId: "${courseId}", userEmail: "${userEmail}", course: { connect: { id: "${courseId}" } } }
      ) {
        id
      }
      publishManyUserConrolledCoursesConnection(to: PUBLISHED) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: ENROLL_COURSE,
    });
    console.log("Mutatie response:", data);
    //await resetApolloCache();
    //enrollCourse();
    return data;
  } catch (error) {
    console.error(
      "Error enrolling user to course:",
      error.networkError || error
    );
    return [];
  }
};

export const getUserEnrolledCourse = async (courseId, userEmail) => {
  await delay(1000);
  const GET_USER_ENROLLED_COURSES = gql`
    query GetUserEnrolledCourse {
      userConrolledCourses(
        where: {
          courseId: "${courseId}"
          userEmail: "${userEmail}"
        }
      ) {
        id
        courseId
        completedChapter {
          chapterId
        }
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: GET_USER_ENROLLED_COURSES,
    });
    console.log("getUserEnrolledCourse response:", data);
    await resetApolloCache();
    return data;
  } catch (error) {
    console.error("Error :", error.networkError || error);
    return [];
  }
};

export const markChapterAsCompleted = async (
  chapterId,
  recordId,
  userEmail,
  points
) => {
  await delay(1000);
  const MARK_CHAPTER_AS_COMPLETED = gql`
    mutation {
      updateUserConrolledCourse(
        data: { completedChapter: { create: { data: { chapterId: "${chapterId}" } } } }
        where: { id: "${recordId}" }
      ) {
        id
      }
      publishManyUserConrolledCoursesConnection {
        edges {
          node {
            id
          }
        }
      }
       updateUserDetail(where: {email: "${userEmail}"}, 
      data: {point: ${points}}) {
        point
      }
      publishUserDetail(where: {email: "${userEmail}"}) {
        id
      } 
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: MARK_CHAPTER_AS_COMPLETED,
    });
    console.log("MARK_CHAPTER_AS_COMPLETED-Succes: ", data);
    return data;
  } catch (error) {
    console.error(
      "MARK_CHAPTER_AS_COMPLETED-Error",
      error.networkError || error
    );
    return [];
  }
};

export const createNewUser = async (userName, email, profileImageurl) => {
  await delay(1000);
  const CREATE_NEW_USER = gql`
    mutation {
      upsertUserDetail(
        upsert: {
          create: { email: "${email}", 
          point: 10, 
          profileImage: "${profileImageurl}", 
          userName: "${userName}" }
          update: { email: "${email}",
          profileImage: "${profileImageurl}",userName: "${userName}" }
        }
        where: { email: "${email}"}
      ) {
        id
      }
      publishUserDetail(where: { email: "${email}" }) {
        id
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: CREATE_NEW_USER,
    });
    console.log("CREATE_NEW_USER-Succes:", data);
    return data;
  } catch (error) {
    console.error("CREATE_NEW_USER-Error", error.networkError || error);
    return [];
  }
};

export const GetUserDetail = async (email) => {
  await delay(1000);
  await createNewUser();
  const GET_USER_DETAIL = gql`
    query {
      userDetail
      (where: { email: "${email}" }){
        point
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: GET_USER_DETAIL,
    });
    console.log("GET_USER_DETAIL-Succes:", data);
    return data;
  } catch (error) {
    console.error("GET_USER_DETAIL-Error :", error.networkError || error);
    return [];
  }
};

export const GetAllUsers = async () => {
  await delay(1000);
  const GET_ALL_USERS = gql`
    query {
      userDetails(orderBy: point_DESC) {
        id
        profileImage
        userName
        point
      }
    }
  `;
  try {
    const { data } = await client.query({
      query: GET_ALL_USERS,
    });
    console.log("GET_ALL_USERS-Succes:", data);
    return data;
  } catch (error) {
    console.error("GET_ALL_USERS-Error :", error.networkError || error);
    return [];
  }
};

export const GetAllProgressCourse = async (userEmail) => {
  await delay(2000);
  const GET_ALL_PROGRESS_COURSE = gql`
    query {
      userConrolledCourses(where: { userEmail: "${userEmail}" }) {
        completedChapter {
          chapterId
        }
        course {
          banner {
            url
          }
          chapters(where: {}) {
            id
            tile
            content {
              heading
              description {
                markdown
                html
              }
              output {
                markdown
                html
              }
            }
          }
          description {
            markdown
          }
          id
          level
          name
          time
        }
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: GET_ALL_PROGRESS_COURSE,
    });
    console.log("GET_ALL_PROGRESS_COURSE-Succes: ", data);
    return data;
  } catch (error) {
    console.error(
      "GET_ALL_PROGRESS_COURSE-Error :",
      error.networkError || error
    );

    return [];
  }
};
