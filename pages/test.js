import React, {useState, useEffect, useRef} from "react"
import Post from "../components/Infinite endless scroll/Post";



export default function App () {
    const [posts, setPosts] = useState([]);
    const [nextPosts_loading, setNextPostsLoading] = useState(false);
    const [lastKey, setLastKey] = useState("");

             
    
    
    const listInnerRef = useRef();


const GetMorePosts = async() => {
    const NewBatch =await Post.GetMorePosts(lastKey)
    if (NewBatch.length != 0){
    setPosts(posts.concat(NewBatch))
    setLastKey(NewBatch[NewBatch.length-1].Date)
    }
    else{
        console.log("ur up to date")
    }

}


 const onScroll = () => {
                if (listInnerRef.current) {
                  const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
                  if (scrollTop + clientHeight === scrollHeight) {
                    console.log("reached bottom");
                    GetMorePosts()

                  }
                }
              };





    useEffect(async() => {
        const FirstPosts =await Post.GetFirstBatch();
        console.log(FirstPosts)
        setPosts(FirstPosts)
        setLastKey(FirstPosts[FirstPosts.length-1].Date)

    },[])

    return(
  
      
    



            
             
            

                <div>
                  <div
                    onScroll={onScroll}
                    ref={listInnerRef}
                    style={{ height:"400px", overflowY: "auto" }}
                  >
                      {posts.map((post) => 
                        <div >
                            <h1>{post.NameOfPoster}</h1>
                            <p>{post.Text}</p>
                            </div>
                            )}
                  </div>
                </div>
              );
            }
            


