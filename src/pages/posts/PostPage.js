import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Comment from "../comments/Comment";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });
  
    useEffect (() => {
      const handleMount = async () => {
        try {
          const [{data: post}, {data: comments}] = 
          await Promise.all([
            axiosReq.get(`/posts/${id}`),
            axiosReq.get(`/comments/?post=${id}`),
          ])
          setPost({results: [post]});
          setComments(comments);
        } catch(err){
          console.log(err);
        }
      }
  
      handleMount();
    }, [id]);

  return (
    <Row className="h-100">
      <Col className="my-auto p-0 p-md-2" md={6}>
        <p>Popular profiles for mobile</p>
        <Container  className={`${appStyles.Content} p-4 `}> 
          <Post {...post.results[0]} setPosts={setPost} postPage/>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll 
                children={comments.results.map(comment => (
                  <Comment 
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
