
import { collection, doc, endAt, getDoc, getDocs, limit, orderBy, query,startAfter,startAt, where } from "firebase/firestore";
import { db } from "../../firebase";



export default {
    
    
    GetFirstBatch :async function () {
    const postsRef = collection(db, "posts")
    const q = query(postsRef, orderBy("Date","desc"), limit(6));
    
    const querySnapshot = await getDocs(q);

    var posts = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
      posts.push(doc.data())

    });
    // console.log(posts)
    return (posts)
}
,

GetMorePosts :async function (key) {
  const postsRef = collection(db, "posts")
  const q = query(postsRef, orderBy("Date","desc"), startAfter(key), limit(6));
  
  const querySnapshot = await getDocs(q);

  var posts = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
    posts.push(doc.data())

  });
  return (posts)
}
,

GetFirstBatchOfBookmarks : async function  (desiredBookmarks) {
  var posts = [];
  
  await desiredBookmarks.forEach( (bookmark)=>{
    console.log("reached Post fiucntipms")

    const docRef = doc(db, "posts", bookmark);
const docSnap =  getDoc(docRef);
console.log(docSnap.data())
posts.push(docSnap.data())
  })


  // console.log(posts)
  return (posts)
}
,

GetMorePostsOfBookmarks :async function (key,desiredBookmarks) {
const postsRef = collection(db, "posts")
const q = query(postsRef,where("ID","in",desiredBookmarks), orderBy("Date","desc"), startAfter(key), limit(6));

const querySnapshot = await getDocs(q);

var posts = [];

querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
  posts.push(doc.data())

});
return (posts)
}

,
GetFirstBatchOfProfile :async function (desiredProfile) {
  const postsRef = collection(db, "posts")
  const q = query(postsRef,where("ProfileOfPoster","==",desiredProfile), orderBy("Date","desc"), limit(6));
  
  const querySnapshot = await getDocs(q);

  var posts = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
    posts.push(doc.data())

  });
  // console.log(posts)
  return (posts)
}
,

GetMorePostsOfProfile :async function (key,desiredProfile) {
const postsRef = collection(db, "posts")
const q = query(postsRef,where("ProfileOfPoster","==",desiredProfile), orderBy("Date","desc"), startAfter(key), limit(6));

const querySnapshot = await getDocs(q);

var posts = [];

querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
  posts.push(doc.data())

});
return (posts)
}
}






// export default {
//   /**
//    * this function will be fired when the app is first time run,
//    * and it will fetch first 5 posts, here i retrieve them in desc order,
//    * until show last added post first.
//    */
//   postsFirstBatch: async function () {
//     try {
//       const data = await db
//         .collection("posts")
//         .orderBy("createdAt", "desc")
//         .limit(5)
//         .get();

//       let posts = [];
//       let lastKey = "";
//       data.forEach((doc) => {
//         posts.push({
//           postId: doc.id,
//           postContent: doc.data().Text
//         });
//         lastKey = doc.data().createdAt;
//       });

//       return { posts, lastKey };
//     } catch (e) {
//       console.log(e);
//     }
//   },

//   /**
//    * this function will be fired each time the user click on 'More Posts' button,
//    * it receive key of last post in previous batch, then fetch next 5 posts
//    * starting after last fetched post.  
//    */
//   postsNextBatch: async (key) => {
//     try {
//       const data = await db
//         .collection("posts")
//         .orderBy("createdAt", "desc")
//         .startAfter(key), limit(6)
//         .limit(5)
//         .get();

//       let posts = [];
//       let lastKey = "";
//       data.forEach((doc) => {
//         posts.push({
//           postId: doc.id,
//           postContent: doc.data().Text
//         });
//         lastKey = doc.data().createdAt;
//       });
//       return { posts, lastKey };
//     } catch (e) {
//       console.log(e);
//     }
//   }
// };
