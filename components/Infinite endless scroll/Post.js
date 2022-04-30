
import { collection, doc, endAt, getDoc, getDocs, limit, orderBy, query,startAfter,startAt, where } from "firebase/firestore";
import { db } from "../../firebase";



export default {
    
    
    GetFirstBatch :async function () {

    const postsRef = collection(db, "posts")
    const q = query(postsRef, orderBy("Date","desc"), limit(6));
    
    const querySnapshot = await getDocs(q);

    var posts = [];
    querySnapshot.forEach((doc) => {

      posts.push(doc.data())

    });

    var postss=[];
    for (const Post of posts) {



      // console.log(Post);
      const citiesRef = collection(db, "users");
      const q2 = query(citiesRef, where("username", "==", Post.ProfileOfPoster));
      const querySnapshot2 = await getDocs(q2);
  
      const FetchedPP = [];
      querySnapshot2.forEach((doc1) => {
        FetchedPP.push((doc1.data().PhotoURL).replace("s96","s200"));
  
      });
      const FinalPost = { ...Post, ...{ PhotoURL: FetchedPP[0].replace("s96","s200") } };
      // console.log(FinalPost)
      postss.push(FinalPost);
    }

    return (postss)
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
  var postss=[];
  for (const Post of posts) {



    // console.log(Post);
    const citiesRef = collection(db, "users");
    const q2 = query(citiesRef, where("username", "==", Post.ProfileOfPoster));
    const querySnapshot2 = await getDocs(q2);

    const FetchedPP = [];
    querySnapshot2.forEach((doc1) => {
      FetchedPP.push((doc1.data().PhotoURL).replace("s96","s200"));

    });
    const FinalPost = { ...Post, ...{ PhotoURL: FetchedPP[0].replace("s96","s200") } };
    // console.log(FinalPost)
    postss.push(FinalPost);
  }

  return (postss)
}
,

GetFirstBatchOfBookmarks : async function  (desiredBookmarks) {
  var posts = [];


  const GetBookmarks = async ()=>{
    if (desiredBookmarks.length == 0){
      return (posts)
    }
    for (let i = 0; i< desiredBookmarks.length ; i++){
    
      const docRef = doc(db, "posts", desiredBookmarks[i]);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()){
        posts.push(docSnap.data())
      }
    // console.log(docSnap.data())
      

    }
    var postss=[];
    for (const Post of posts) {



      // console.log(Post);
      const citiesRef = collection(db, "users");
      const q2 = query(citiesRef, where("username", "==", Post.ProfileOfPoster));
      const querySnapshot2 = await getDocs(q2);
  
      const FetchedPP = [];
      querySnapshot2.forEach((doc1) => {
        FetchedPP.push((doc1.data().PhotoURL).replace("s96","s200"));
  
      });
      const FinalPost = { ...Post, ...{ PhotoURL: FetchedPP[0].replace("s96","s200") } };
      // console.log(FinalPost)
      postss.push(FinalPost);
    }

    return (postss)

  }
  




return(await GetBookmarks())




  
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
  var postss=[];
  for (const Post of posts) {



    // console.log(Post);
    const citiesRef = collection(db, "users");
    const q2 = query(citiesRef, where("username", "==", Post.ProfileOfPoster));
    const querySnapshot2 = await getDocs(q2);

    const FetchedPP = [];
    querySnapshot2.forEach((doc1) => {
      FetchedPP.push((doc1.data().PhotoURL).replace("s96","s200"));

    });
    const FinalPost = { ...Post, ...{ PhotoURL: FetchedPP[0].replace("s96","s200") } };
    // console.log(FinalPost)
    postss.push(FinalPost);
  }

  return (postss)
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
var postss=[];
    for (const Post of posts) {



      // console.log(Post);
      const citiesRef = collection(db, "users");
      const q2 = query(citiesRef, where("username", "==", Post.ProfileOfPoster));
      const querySnapshot2 = await getDocs(q2);
  
      const FetchedPP = [];
      querySnapshot2.forEach((doc1) => {
        FetchedPP.push((doc1.data().PhotoURL).replace("s96","s200"));
  
      });
      const FinalPost = { ...Post, ...{ PhotoURL: FetchedPP[0].replace("s96","s200") } };
      // console.log(FinalPost)
      postss.push(FinalPost);
    }

    return (postss)
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
