import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchPost, deletePost } from "../api/posts";
import type { Post } from "../types/post";
import { CATEGORY_LABEL_MAP } from "../components/CategorySelect";

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPost(Number(id));
        setPost(data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ??
            "게시글을 불러오는 중 오류가 발생했어."
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!post) return;
    const ok = window.confirm("정말로 이 게시글을 삭제할까?");
    if (!ok) return;
    try {
      await deletePost(post.id);
      navigate("/");
    } catch (err: any) {
      alert(
        err?.response?.data?.message ??
          "게시글 삭제 중 오류가 발생했어."
      );
    }
  };

  if (loading) {
    return (
      <div className="card">
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <p className="error-text">{error}</p>
        <button className="btn" onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="card">
        <p>게시글을 찾을 수 없어.</p>
        <button className="btn" onClick={() => navigate("/")}>
          목록으로
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header row-between">
        <div>
          <p className="badge">
            {CATEGORY_LABEL_MAP[post.category]}
          </p>
          <h1>{post.title}</h1>
          <p className="meta-text">
            작성일:{" "}
            {new Date(post.createdAt).toLocaleString("ko-KR")} / 수정일:{" "}
            {new Date(post.updatedAt).toLocaleString("ko-KR")}
          </p>
        </div>
        <div className="column-gap">
          <button
            className="btn"
            onClick={() => navigate("/")}
          >
            목록
          </button>
          <Link
            to={`/posts/${post.id}/edit`}
            className="btn primary"
          >
            수정
          </Link>
          <button className="btn danger" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <div className="card-body">
        <pre className="content-box">{post.content}</pre>
      </div>
    </div>
  );
};

export default PostDetail;
