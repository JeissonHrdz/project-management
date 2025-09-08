package org.projectmanagement.repository;

import org.projectmanagement.model.dto.comment.CommentReadDto;
import org.projectmanagement.model.dto.comment.CommentResponseDto;
import org.projectmanagement.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository  extends JpaRepository<Comment, Integer> {

    @Query("SELECT c FROM Comment c WHERE c.task_id.task_id = :task_id ORDER BY c.created_at DESC")
    List<Comment> findAllByTask_id(Integer task_id);

    @Query("SELECT c FROM Comment c WHERE c.comment_id = :comment_id")
    Comment getCommentById(Integer comment_id);
}
