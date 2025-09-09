package org.projectmanagement.repository;

import org.projectmanagement.model.dto.comment.CommentReadDto;
import org.projectmanagement.model.dto.comment.CommentResponseDto;
import org.projectmanagement.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommentRepository  extends JpaRepository<Comment, Integer> {

    @Query("SELECT c FROM Comment c WHERE c.task_id.task_id = :task_id ORDER BY c.created_at DESC")
    List<Comment> findAllByTask_id(Integer task_id);

    @Query("SELECT c FROM Comment c WHERE c.comment_id = :comment_id")
    Comment getCommentById(Integer comment_id);

    @Modifying
    @Transactional
    @Query("UPDATE Comment c SET c.content = :content, c.is_edited = true WHERE c.comment_id = :comment_id" )
    void updateCommentContent(Integer comment_id, String content);
}
