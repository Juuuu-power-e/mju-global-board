import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategorySelect from "../components/CategorySelect";
import { createPost } from "../api/posts";
import type { PostCategory } from "../types/post";

const PostCreate: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<PostCategory | undefined>(
    "NOTICE"
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    setSubmitting(true);
    setError(null);
    try {
      const created = await createPost({
        category,
        title: title.trim(),
        content: content.trim()
      });
      navigate(`/posts/${created.id}`);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "게시글 생성 중 오류가 발생했습니다."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1>새 게시글 작성</h1>
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

export default PostCreate;
