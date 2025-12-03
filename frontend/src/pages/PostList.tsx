import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts, deletePost } from "../api/posts";
import type { Post, PostCategory } from "../types/post";
import CategorySelect, { CATEGORY_LABEL_MAP } from "../components/CategorySelect";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    PostCategory | undefined
  >(undefined);

  const loadPosts = async (category?: PostCategory) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts(category);
      setPosts(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "게시글 목록을 불러오는 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(selectedCategory);
  }, [selectedCategory]);

  const handleDelete = async (id: number) => {
    const ok = window.confirm("정말로 이 게시글을 삭제할까요?");
    if (!ok) return;
    try {
      await deletePost(id);
      await loadPosts(selectedCategory);
    } catch (err: any) {
      alert(
        err?.response?.data?.message ??
          "게시글 삭제 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className="card">
      <div className="card-header row-between">
        <h1>게시글 목록</h1>
        <div className="row-gap">
          <CategorySelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            includeAllOption
          />
          <Link to="/posts/new" className="btn primary">
            새 글 작성
          </Link>
        </div>
      </div>

      {loading && <p>불러오는 중...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && posts.length === 0 && (
        <p>등록된 게시글이 없습니다.</p>
      )}

      {!loading && posts.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>ID</th>
              <th style={{ width: "140px" }}>카테고리</th>
              <th>제목</th>
              <th style={{ width: "180px" }}>작성일</th>
              <th style={{ width: "180px" }}>액션</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{CATEGORY_LABEL_MAP[post.category]}</td>
                <td>
                  <Link to={`/posts/${post.id}`} className="link">
                    {post.title}
                  </Link>
                </td>
                <td>
                  {new Date(post.createdAt).toLocaleString("ko-KR")}
                </td>
                <td>
                  <div className="row-gap">
                    <Link
                      to={`/posts/${post.id}`}
                      className="btn small"
                    >
                      상세
                    </Link>
                    <Link
                      to={`/posts/${post.id}/edit`}
                      className="btn small"
                    >
                      수정
                    </Link>
                    <button
                      className="btn small danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostList;
