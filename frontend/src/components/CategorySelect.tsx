import React from "react";
import type { PostCategory } from "../types/post";

export const CATEGORY_LABEL_MAP: Record<PostCategory, string> = {
  NOTICE: "공지",
  KOREAN_CENTER: "한국어교육센터",
  EXCHANGE_OFFICE: "교류부서",
  UNDERGRAD_OFFICE: "학부부서",
  ADMISSION_OFFICE: "입학부서"
};

interface Props {
  value?: PostCategory;
  onChange: (value: PostCategory | undefined) => void;
  includeAllOption?: boolean;
}

const CategorySelect: React.FC<Props> = ({
  value,
  onChange,
  includeAllOption = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    if (includeAllOption && v === "") {
      onChange(undefined);
    } else {
      onChange(v as PostCategory);
    }
  };

  return (
    <select
      className="input"
      value={value ?? ""}
      onChange={handleChange}
    >
      {includeAllOption && <option value="">전체</option>}
      {Object.entries(CATEGORY_LABEL_MAP).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
