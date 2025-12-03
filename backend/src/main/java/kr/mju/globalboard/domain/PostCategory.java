package kr.mju.globalboard.domain;

public enum PostCategory {
    NOTICE,           // 공지
    KOREAN_CENTER,    // 한국어교육센터
    EXCHANGE_OFFICE,  // 교류부서
    UNDERGRAD_OFFICE, // 학부부서
    ADMISSION_OFFICE; // 입학부서

    public static PostCategory fromKorean(String korean) {
        if (korean == null) return null;
        return switch (korean.trim()) {
            case "공지" -> NOTICE;
            case "한국어교육센터" -> KOREAN_CENTER;
            case "교류부서" -> EXCHANGE_OFFICE;
            case "학부부서" -> UNDERGRAD_OFFICE;
            case "입학부서" -> ADMISSION_OFFICE;
            default -> throw new IllegalArgumentException("지원하지 않는 글머리: " + korean);
        };
    }
}
