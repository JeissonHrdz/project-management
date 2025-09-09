package org.projectmanagement.service;

import org.projectmanagement.model.dto.comment.CommentCreateDto;
import org.projectmanagement.model.dto.comment.CommentReadDto;
import org.projectmanagement.model.dto.comment.CommentResponseDto;
import org.projectmanagement.model.dto.comment.CommentUpdateDto;

import java.util.List;

public interface CommentService {

    public CommentResponseDto createComment(CommentCreateDto commentCreateDto);
    public CommentResponseDto updateComment(CommentUpdateDto commentUpdateDto);
    List<CommentReadDto> getAllCommentsByTask( Integer task_id);
    CommentReadDto getCommentById(Integer comment_id);
    CommentReadDto getCommentByUserId(String user_id);
    void deleteComment(Integer comment_id);
}
