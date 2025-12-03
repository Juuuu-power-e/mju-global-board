package kr.mju.globalboard.dto;

import kr.mju.globalboard.domain.PostCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostRequestDto {

    // 클라이언트는 ENUM 이름(NOTICE 등)이나 한글("공지") 중 하나를 보낼 수 있게 허용하자.
    private String category;
    private String title;
    private String content;

    public PostCategory toCategoryEnum() {
        try {
            return PostCategory.valueOf(category);
        } catch (IllegalArgumentException e) {
            return PostCategory.fromKorean(category);
        }
    }
}
