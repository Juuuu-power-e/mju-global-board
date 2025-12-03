package kr.mju.globalboard.controller;

import kr.mju.globalboard.dto.PostRequestDto;
import kr.mju.globalboard.dto.PostResponseDto;
import kr.mju.globalboard.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 게시글 목록 조회 (카테고리 필터 optional)
    @GetMapping
    public List<PostResponseDto> getPosts(@RequestParam(required = false) String category) {
        return postService.getPosts(category);
    }

    // 게시글 단건 조회
    @GetMapping("/{id}")
    public PostResponseDto getPost(@PathVariable Long id) {
        return postService.getPost(id);
    }

    // 게시글 작성
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponseDto createPost(@RequestBody PostRequestDto requestDto) {
        return postService.createPost(requestDto);
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public PostResponseDto updatePost(@PathVariable Long id,
                                      @RequestBody PostRequestDto requestDto) {
        return postService.updatePost(id, requestDto);
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}
