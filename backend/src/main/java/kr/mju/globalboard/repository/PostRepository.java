package kr.mju.globalboard.repository;

import kr.mju.globalboard.domain.Post;
import kr.mju.globalboard.domain.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByCategoryOrderByCreatedAtDesc(PostCategory category);

    List<Post> findAllByOrderByCreatedAtDesc();
}
