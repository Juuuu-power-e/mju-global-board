package kr.mju.globalboard.service;

import kr.mju.globalboard.domain.Post;
import kr.mju.globalboard.domain.PostCategory;
import kr.mju.globalboard.dto.PostRequestDto;
import kr.mju.globalboard.dto.PostResponseDto;
import kr.mju.globalboard.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    public List<PostResponseDto> getPosts(String category) {
        List<Post> posts;
        if (category == null || category.isBlank()) {
            posts = postRepository.findAllByOrderByCreatedAtDesc();
        } else {
            PostCategory cat;
            try {
                cat = PostCategory.valueOf(category);
            } catch (IllegalArgumentException e) {
                cat = PostCategory.fromKorean(category);
            }
            posts = postRepository.findAllByCategoryOrderByCreatedAtDesc(cat);
        }
        return posts.stream().map(PostResponseDto::new).toList();
    }

    public PostResponseDto getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없음. id=" + id));
        return new PostResponseDto(post);
    }

    @Transactional
    public PostResponseDto createPost(PostRequestDto requestDto) {
        PostCategory category = requestDto.toCategoryEnum();
        Post post = new Post(category, requestDto.getTitle(), requestDto.getContent());
        Post saved = postRepository.save(post);
        return new PostResponseDto(saved);
    }

    @Transactional
    public PostResponseDto updatePost(Long id, PostRequestDto requestDto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없음. id=" + id));
        PostCategory category = requestDto.toCategoryEnum();
        post.update(category, requestDto.getTitle(), requestDto.getContent());
        return new PostResponseDto(post);
    }

    @Transactional
    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new IllegalArgumentException("게시글을 찾을 수 없음. id=" + id);
        }
        postRepository.deleteById(id);
    }
}
