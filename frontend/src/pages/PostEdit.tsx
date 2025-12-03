import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategorySelect from "../components/CategorySelect";
import { fetchPost, updatePost } from "../api/posts";
import type { Post, PostCategory } from "../types/post";

const PostEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [category, setCategory] = useState<PostCategory | undefined>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPost(Number(id));
        setPost(data);
        setCategory(data.category);
        setTitle(data.title);
        setContent(data.content);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ??
            "게시글을 불러오는 중 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setError("카테고리를 선택해주세요.");
      return;
    }
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    if (!id) return;

    setSubmitting(true);
    setError(null);
    try {
      const updated = await updatePost(Number(id), {
        category,
        title: title.trim(),
        content: content.trim()
      });
      navigate(`/posts/${updated.id}`);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "게시글 수정 중 오류가 발생했습니다."
      );
    } finally {
      setSubmitting(false);
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
        <p>게시글을 찾을 수 없습니다.</p>
        <button className="btn" onClick={() => navigate("/")}>
          목록으로
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h1>게시글 수정</h1>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">
            카테고리
            <CategorySelect
              value={category}
              onChange={setCategory}
            />
          </label>
          <label className="form-label">
            제목
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
          </label>
          <label className="form-label">
            내용
            <textarea
              className="input textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              rows={10}
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <div className="row-gap">
            <button
              type="button"
              className="btn"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="btn primary"
              disabled={submitting}
            >
              {submitting ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEdit;
